import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Layout from "../components/layout/Layout";
import PostCard from "../components/postcard/PostCard";
import LinkSpan from "../components/common/LinkSpan";
import { supabase } from "../utils/supabaseClient";
import { definitions } from "../types/supabase";
import { getPlaceholder } from "../lib/images";
import { getObjectUrl } from "../utils/supabase";

type Props = {
  posts: definitions["posts"][];
  domainUrl: string;
  coverPlaceholders: { [slug: string]: string };
};

const Home = ({ posts, domainUrl, coverPlaceholders }: Props): JSX.Element => (
  <>
    <NextSeo
      title="Blog"
      description="I rant universities and document thought process."
      canonical={`${domainUrl}`}
      openGraph={{
        title: "Blog | An Hoang",
        type: "website",
        url: domainUrl,
        description: "I rant universities and document thought process.",
        images: [
          {
            url: "https://res.cloudinary.com/an7/image/upload/v1624529585/banner_c88bc0724c.png",
            width: 1920,
            height: 1080,
            alt: "An Hoang",
          },
        ],
      }}
    />
    <Layout>
      <div className="nightwind-prevent nightwind-prevent-block bg-black px-[6vw] py-20 flex flex-col gap-6 md:items-center">
        <h1 className="text-3xl text-white font-bold text-center">Hello!</h1>
        <p className="text-gray-300 ">
          My blog rants about universities and document thought process.
          <br />
          <LinkSpan href="/about">Read more about me.</LinkSpan>
        </p>
      </div>

      <div className="bg-white dark:bg-[#121212] px-[4vw] py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            coverPlaceholder={coverPlaceholders[post.slug]}
          />
        ))}
      </div>
    </Layout>
  </>
);

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await supabase
    .from<definitions["posts"]>("posts")
    .select()
    .order("published_at", { ascending: false });

  if (data.length === 0) {
    return {
      // FIXME
      //  This notFound here does not make sense. If there's
      //  no posts available, it should shows empty. But this
      //  works for now.
      notFound: true,
    };
  }

  const domainUrl =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000";

  const coverPlaceholders = {};
  const placeholderPromises: Promise<void>[] = [];
  data.forEach((post) => {
    placeholderPromises.push(
      (async () => {
        coverPlaceholders[post.slug] = await getPlaceholder(
          getObjectUrl(post.cover)
        );
      })()
    );
  });
  await Promise.all(placeholderPromises);

  return {
    props: { posts: data, domainUrl, coverPlaceholders },
    revalidate: 60,
  };
};
