import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { BlogJsonLd, NextSeo } from "next-seo";
import { getPageDataBySlug, getPostDataBySlug } from "../lib/postAndPageApi";
import { PostOrPageData } from "../types/postOrPage";
import Layout from "../components/layout/Layout";
import PostOrPageContent from "../components/post-or-page/PostOrPageContent";
import { getTocMapping, TocMapping } from "../lib/tableOfContents";
import { supabase } from "../utils/supabaseClient";
import { definitions } from "../types/supabase";
import { getObjectUrl } from "../utils/supabase";
import { getDimensions } from "../lib/images";
import { escapeQuote } from "../utils/general";

type Props = {
  postOrPageData: PostOrPageData;
  domainUrl: string;
  tocMapping: TocMapping;
  cover?: { src: string; width: number; height: number };
};

const PostAndPage = ({
  postOrPageData,
  domainUrl,
  tocMapping,
  cover,
}: Props): JSX.Element => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { postOrPage } = postOrPageData;
  const excerpt = "excerpt" in postOrPage && escapeQuote(postOrPage.excerpt);

  const coverUrl =
    (cover ? cover.src : null) ||
    "https://res.cloudinary.com/an7/image/upload/v1624529585/banner_c88bc0724c.png";

  return (
    <>
      <NextSeo
        title={postOrPage.title}
        description={excerpt || "A blog by An Hoang."}
        canonical={`${domainUrl}`}
        openGraph={{
          title: `${postOrPage.title} | An Hoang`,
          type: "article",
          url: `${domainUrl}/${postOrPage.slug}`,
          description: excerpt || "A blog by An Hoang.",
          images: [
            {
              url: coverUrl,
              width: cover?.width || 1920,
              height: cover?.height || 1080,
              alt: "",
            },
          ],
          article: {
            publishedTime: postOrPage.published_at,
            modifiedTime: postOrPage.published_at, // TODO: update with modified_at in the future
            authors: ["https://hxann.com/about"],
          },
        }}
      />
      <BlogJsonLd
        url={`${domainUrl}/${postOrPage.slug}`}
        title={`${postOrPage.title} | An Hoang`}
        images={[coverUrl]}
        datePublished={postOrPage.published_at}
        dateModified={postOrPage.published_at}
        authorName={postOrPageData.author?.fullName || "An Hoang"}
        description={excerpt || "A blog by An Hoang."}
      />
      <Layout>
        <PostOrPageContent
          postOrPageData={postOrPageData}
          tocMapping={tocMapping}
        />
      </Layout>
    </>
  );
};

export default PostAndPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts } = await supabase
    .from<definitions["posts"]>("posts")
    .select();
  const { data: pages } = await supabase
    .from<definitions["pages"]>("pages")
    .select();

  const paths = [
    ...posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    ...pages.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
  ];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const domainUrl =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000";

  const { slug } = params;

  let postOrPageData = await getPostDataBySlug(slug as string);
  if (!postOrPageData) {
    postOrPageData = await getPageDataBySlug(slug as string);
  }

  if (!postOrPageData) {
    return {
      notFound: true,
    };
  }

  let cover = null;
  if ("cover" in postOrPageData.postOrPage) {
    const src = getObjectUrl(postOrPageData.postOrPage.cover);
    const size = await getDimensions(src);
    cover = {
      src,
      width: size.width,
      height: size.height,
    };
  }

  const tocMapping = getTocMapping(postOrPageData.toc);

  return {
    props: { postOrPageData, domainUrl, tocMapping, cover },
    revalidate: 30,
  };
};
