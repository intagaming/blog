import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {
  getAllPages,
  getAllPosts,
  getPageNodeBySlug,
  getPostNodeBySlug,
} from "../lib/postOrPage";
import Layout from "../components/layout";
import PostOrPageContent from "../components/postOrPageContent";

const PostOrPage = ({ postOrPage }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <PostOrPageContent postOrPage={postOrPage} />
    </Layout>
  );
};

PostOrPage.propTypes = {
  postOrPage: PropTypes.object,
};

export default PostOrPage;

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const pages = await getAllPages();

  let paths = [
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
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.slug;
  let postOrPage = await getPostNodeBySlug(slug);
  if (!postOrPage) {
    postOrPage = await getPageNodeBySlug(slug);
  }

  if (!postOrPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postOrPage },
  };
}
