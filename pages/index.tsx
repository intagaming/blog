import Link from "next/link";
import { getLatestPosts } from "../lib/strapi/postAndPageApi";
import { PostOrPage } from "../types/postOrPage";
import Layout from "../components/layout";
import PostCard from "../components/postcard";
import { GetStaticProps } from "next";

type Props = {
  posts: PostOrPage[];
};

const Home = ({ posts }: Props): JSX.Element => {
  return (
    <Layout>
      <div className="bg-black px-[6vw] py-20 flex flex-col gap-6 md:items-center">
        <span className="text-3xl text-white font-bold text-center">
          Hello!
        </span>
        <p className="text-gray-300 ">
          My blog rants about universities and document thought process.
          <br />
          <Link href="/about">
            <span className="text-blue-500 hover:bg-white/25 cursor-pointer underline">
              {" "}
              Read more about me.
            </span>
          </Link>
        </p>
      </div>
      <div className="px-[4vw] py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getLatestPosts();

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
    props: { posts },
    revalidate: 60,
  };
};
