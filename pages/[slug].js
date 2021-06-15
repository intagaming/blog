import React from "react";
import { useRouter } from "next/router";
import { getAllPosts, getPostHtmlBySlug } from "../lib/posts";
import Layout from "../components/layout";
import Image from "next/image";

export default function PostOrPage({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { html, data } = post;
  return (
    <Layout>
      <div className={"flex justify-center mt-20"}>
        <article className={"prose"}>
          <h1>{data.title}</h1>
          <Image
            src={data.thumbnail.url}
            alt={"post thumbnail"}
            width={data.thumbnail.dimensions.width}
            height={data.thumbnail.dimensions.height}
            layout={"responsive"}
          />
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();

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
  const post = getPostHtmlBySlug(ctx.params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
}
