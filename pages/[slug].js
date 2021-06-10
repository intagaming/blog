import React from "react";
import { useRouter } from "next/router";

export default function PostOrPage({ post } = props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  // const posts = await getPosts();
  const posts = [];

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  // const post = await getSinglePost(ctx.params.slug);
  const post = null;

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
}
