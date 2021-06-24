import React from "react";
import { useRouter } from "next/router";
import {
  getAllPages,
  getAllPosts,
  getPageDataBySlug,
  getPostDataBySlug,
} from "../lib/strapi/postAndPageApi";
import { PostOrPageData } from "../types/postOrPage";
import Layout from "../components/layout";
import PostOrPageContent from "../components/postOrPageContent";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo, BlogJsonLd } from "next-seo";
import { getPostExcerpt } from "../lib/postOrPage";
import { getTocMapping, TocMapping } from "../lib/tableOfContents";

type Props = {
  postOrPageData: PostOrPageData;
  domainUrl: string;
  tocMapping: TocMapping;
};

const PostAndPage = ({
  postOrPageData,
  domainUrl,
  tocMapping,
}: Props): JSX.Element => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { postOrPage } = postOrPageData;
  const excerpt = getPostExcerpt(postOrPage);

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
              url:
                postOrPage.cover?.url ||
                "https://res.cloudinary.com/an7/image/upload/v1624529585/banner_c88bc0724c.png",
              width: postOrPage.cover?.width || 1920,
              height: postOrPage.cover?.height || 1080,
              alt: postOrPage.cover?.alternativeText || "An Hoang",
            },
          ],
          article: {
            publishedTime: postOrPage.published_at,
            modifiedTime: postOrPage.updated_at,
            authors: ["https://hxann.com/about"],
          },
        }}
      />
      <BlogJsonLd
        url={`${domainUrl}/${postOrPage.slug}`}
        title={`${postOrPage.title} | An Hoang`}
        images={[
          postOrPage.cover?.url ||
            "https://res.cloudinary.com/an7/image/upload/v1624529585/banner_c88bc0724c.png",
        ]}
        datePublished={postOrPage.published_at}
        dateModified={postOrPage.updated_at}
        authorName={postOrPage.author?.fullName || "An Hoang"}
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
  const posts = await getAllPosts();
  const pages = await getAllPages();

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
  const domainUrl = process.env.DOMAIN_URL || "http://localhost:3000";

  const slug = params.slug;
  if (Array.isArray(slug)) return; // TypeScript sake

  let postOrPageData = await getPostDataBySlug(slug);
  if (!postOrPageData) {
    postOrPageData = await getPageDataBySlug(slug);
  }

  if (!postOrPageData) {
    return {
      notFound: true,
    };
  }

  const tocMapping = getTocMapping(postOrPageData.toc);

  return {
    props: { postOrPageData, domainUrl, tocMapping },
    revalidate: 30,
  };
};
