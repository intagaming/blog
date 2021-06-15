import React from "react";
import { useRouter } from "next/router";
import { getAllPosts, getPostNodeBySlug } from "../lib/posts";
import Layout from "../components/layout";
import Image from "next/image";
import rehype2react from "rehype-react";
import rehype from "rehype";

export default function PostOrPage({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { htmlNode, data } = post;
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
          <div>
            {rehype()
              .data("settings", { fragment: true })
              .use(rehype2react, {
                createElement: React.createElement,
                Fragment: React.Fragment,
                components: {
                  Image: (props) => (
                    <Image
                      {
                        ...props.node.properties // img tag attribute
                      }
                      {
                        ...props.node.imageDimensions // width and height
                      }
                    />
                  ),
                },
                passNode: true,
              })
              .stringify(htmlNode)}
          </div>
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
  const post = getPostNodeBySlug(ctx.params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
}
