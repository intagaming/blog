import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { getAllPosts, getPostNodeBySlug } from "../lib/posts";
import Layout from "../components/layout";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextImage from "../components/nextImage";
import Image from "next/image";

const PostOrPage = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { htmlNode, post: postJson } = post;
  return (
    <Layout>
      <div className={"flex justify-center mt-20"}>
        <article className={"prose"}>
          <h1>{postJson.title}</h1>
          <Image
            src={postJson.cover.url}
            alt={postJson.cover.alternativeText}
            width={postJson.cover.width}
            height={postJson.cover.height}
            layout={"responsive"}
          />
          <div>
            {rehype()
              .data("settings", { fragment: true })
              .use(rehype2react, {
                createElement: React.createElement,
                Fragment: React.Fragment,
                components: {
                  Image: NextImage,
                },
                passNode: true,
              })
              .stringify(htmlNode)}
          </div>
        </article>
      </div>
    </Layout>
  );
};

PostOrPage.propTypes = {
  post: PropTypes.object,
};

export default PostOrPage;

export async function getStaticPaths() {
  const posts = await getAllPosts();

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
  const post = await getPostNodeBySlug(ctx.params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
}
