import React from "react";
import PostCard from "../postcard/PostCard";
import { definitions } from "../../types/supabase";

interface Props {
  posts: definitions["posts"][];
  authors: { [authorId: string]: definitions["authors"] };
}

const Home = ({ posts, authors }: Props): JSX.Element => {
  return (
    <div>
      <h1>Hello</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} author={authors[post.user_id]} />
      ))}
    </div>
  );
};

export default Home;
