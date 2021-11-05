import { definitions } from "../types/supabase";
import PostCard from "../components/postcard/PostCard";

interface Props {
  posts: definitions["posts"][];
  authors: { [authorId: string]: definitions["authors"] };
}

const Home = ({ posts, authors }: Props) => (
  <div>
    <h1>Hello</h1>
    {posts.map((post) => (
      <PostCard key={post.id} post={post} author={authors[post.user_id]} />
    ))}
  </div>
);

export default Home;
