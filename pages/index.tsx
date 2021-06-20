import Link from "next/link";
import { getLatestPosts } from "../lib/strapi/postAndPageApi";
import { PostOrPage } from "../types/postOrPage";
import Layout from "../components/layout";
import PostCard from "../components/postcard";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";

type Props = {
  posts: PostOrPage[];
  domainUrl: string;
};

const Home = ({ posts, domainUrl }: Props): JSX.Element => {
  return (
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
              url: "https://res.cloudinary.com/an7/image/upload/v1624203392/banner_c88bc0724c.png",
              width: 1920,
              height: 1080,
              alt: "An Hoang",
            },
          ],
        }}
      />
      <Layout>
        <div className="bg-black px-[6vw] py-20 flex flex-col gap-6 md:items-center">
          <span className="text-3xl text-white font-bold text-center">
            Hello!
          </span>
          <p className="text-gray-300 ">
            My blog rants about universities and document thought process.
            <br />
            <Link href="/about">
              <a>
                <span className="text-blue-500 hover:bg-white/25 underline">
                  Read more about me.
                </span>
              </a>
            </Link>
          </p>
        </div>
        <div className="px-[4vw] py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getLatestPosts();
  const domainUrl = process.env.DOMAIN_URL || "http://localhost:3000";

  if (!posts) {
    return {
      // FIXME
      //  This notFound here does not make sense. If there's
      //  no posts available, it should shows empty. But this
      //  works for now.
      notFound: true,
    };
  }

  return {
    props: { posts, domainUrl },
    revalidate: 60,
  };
};
