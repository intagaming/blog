import { definitions } from "../types/supabase";
import { GetStaticProps } from "next";
import { supabase } from "../utils/supabaseClient";
import Home from "../components/pages/Home";
import { hackAuthorAvatarUrl, hackPostCoverUrl } from "../utils/supabase";
import { NextSeo } from "next-seo";
import { getPlaceholder } from "../lib/images";

interface Props {
  posts: definitions["posts"][];
  authors: { [authorId: string]: definitions["authors"] };
  domainUrl: string;
  blurDataURLs: { [postId: number]: string };
}

const HomePage = ({ posts, authors, domainUrl, blurDataURLs }: Props) => (
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
    <Home posts={posts} authors={authors} blurDataURLs={blurDataURLs} />
  </>
);

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data: postsData } = await supabase
    .from<definitions["posts"]>("posts")
    .select()
    .order("published_at", { ascending: false })
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

  const domainUrl =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000";

  const blurDataURLs = {};
  const placeholderPromises = [];
  posts.forEach((post) => {
    const promise = async () => {
      blurDataURLs[post.id] = await getPlaceholder(post.cover);
    };
    placeholderPromises.push(promise());
  });
  await Promise.all(placeholderPromises);

  return {
    props: {
      posts,
      authors,
      domainUrl,
      blurDataURLs,
    },
    revalidate: 5,
  };
};
