import { definitions } from "../types/supabase";
import { GetStaticProps } from "next";
import { supabase } from "../utils/supabaseClient";
import Home from "../components/pages/Home";
import { hackAuthorAvatarUrl, hackPostCoverUrl } from "../utils/supabase";

interface Props {
  posts: definitions["posts"][];
  authors: { [authorId: string]: definitions["authors"] };
}

const HomePage = ({ posts, authors }: Props) => (
  <Home posts={posts} authors={authors} />
);

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data: postsData } = await supabase
    .from<definitions["posts"]>("posts")
    .select()
    .range(0, 9);
  // TODO: remove the cover url hack
  const posts = postsData.map((postData) => hackPostCoverUrl(postData));

  const { data: authorsData } = await supabase
    .from<definitions["authors"]>("authors")
    .select();
  const authors = {};
  authorsData.forEach((authorData) => {
    // TODO: remove the avatar url hack
    authors[authorData.user_id] = hackAuthorAvatarUrl(authorData);
  });

  return {
    props: {
      posts,
      authors,
    },
    revalidate: 5,
  };
};
