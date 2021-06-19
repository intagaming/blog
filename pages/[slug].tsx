import React from "react";
import { useRouter } from "next/router";
import {
  getAllPages,
  getAllPosts,
  getPageWithHtmlNodeBySlug,
  getPostWithHtmlNodeBySlug,
} from "../lib/strapi/postAndPageApi";
import { PostOrPageWithNode } from "../types/postOrPage";
import Layout from "../components/layout";
import PostOrPageContent from "../components/postOrPageContent";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  postOrPageWithNode: PostOrPageWithNode;
};

const PostAndPage = ({ postOrPageWithNode }: Props): JSX.Element => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <PostOrPageContent postOrPageWithNode={postOrPageWithNode} />
    </Layout>
  );
};

export default PostAndPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const pages = await getAllPages();

  const paths = [
    ...posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    ...pages.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
  ];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug;
  if (Array.isArray(slug)) return; // TypeScript sake

  let postOrPageWithNode = await getPostWithHtmlNodeBySlug(slug);
  if (!postOrPageWithNode) {
    postOrPageWithNode = await getPageWithHtmlNodeBySlug(slug);
  }

  if (!postOrPageWithNode) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postOrPageWithNode },
    revalidate: 30,
  };
};
