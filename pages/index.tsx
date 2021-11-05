import { definitions } from "../types/supabase";
import { GetStaticProps } from "next";
import { supabase } from "../utils/supabaseClient";
import Home from "../components/pages/Home";

interface Props {
  posts: definitions["posts"][];
  authors: { [authorId: string]: definitions["authors"] };
}

const HomePage = ({ posts, authors }: Props) => (
  <Home posts={posts} authors={authors} />
);

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data: posts } = await supabase
    .from<definitions["posts"]>("posts")
    .select()
    .range(0, 9);
  const { data: authorsData } = await supabase
    .from<definitions["authors"]>("authors")
    .select();
  const authors = {};
  authorsData.forEach((authorData) => {
    authors[authorData.user_id] = authorData;
  });

  return {
    props: {
      posts,
      authors,
    },
    revalidate: 5,
  };
};
