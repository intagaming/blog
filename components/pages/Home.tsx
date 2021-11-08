import React from "react";
import PostCard from "../postcard/PostCard";
import { definitions } from "../../types/supabase";
import LinkSpan from "../common/LinkSpan";
import Layout from "../layout/Layout";

interface Props {
  posts: definitions["posts"][];
  authors: { [authorId: string]: definitions["authors"] };
  blurDataURLs: { [postId: number]: string };
}

const Home = ({ posts, authors, blurDataURLs }: Props): JSX.Element => {
  return (
    <Layout>
      <div className="bg-black px-[6vw] py-20 flex flex-col gap-6 md:items-center">
        <h1 className="text-3xl text-white font-bold text-center">Hello!</h1>
        <p className="text-gray-300 ">
          My blog rants about universities and document thought process.
          <br />
          <LinkSpan href="/about">Read more about me.</LinkSpan>
        </p>
      </div>
      <div className="bg-white dark:bg-surface-gray px-[4vw] py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            author={authors[post.user_id]}
            isLatestBlog={index === 0}
            blurDataURL={blurDataURLs[post.id] ?? undefined}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
