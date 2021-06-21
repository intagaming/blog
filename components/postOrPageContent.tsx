import Image from "next/image";
import React from "react";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextImage from "./nextImage";
import AuthorAndBrief from "./authorAndBrief";
import { PostOrPageWithNode } from "../types/postOrPage";
import { DiscussionEmbed } from "disqus-react";
import "highlight.js/styles/github-dark.css";

type Props = {
  postOrPageWithNode: PostOrPageWithNode;
  domainUrl: string; // For Disqus
};

const PostOrPageContent = ({
  postOrPageWithNode,
  domainUrl,
}: Props): JSX.Element => {
  const { node, postOrPage } = postOrPageWithNode;
  return (
    <div className={"flex flex-col items-center md:mt-20 my-10 mx-4"}>
      <article className={"prose w-full md:prose-lg prose-indigo"}>
        <h1>{postOrPage.title}</h1>
        {postOrPage.author && <AuthorAndBrief post={postOrPage} />}
        {postOrPage.cover && (
          <div className="mt-6 aspect-w-3 aspect-h-2">
            <Image
              className="rounded-sm object-contain"
              src={postOrPage.cover.url}
              alt={postOrPage.cover.alternativeText}
              layout={"fill"}
            />
          </div>
        )}
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
            .stringify(node)}
        </div>
        <hr />
        <p>Have a question or a discussion? Come, I&apos;m reading all day.</p>
        <DiscussionEmbed
          shortname={process.env.DISQUS_SHORTNAME || "an7"}
          config={{
            url: `${domainUrl}/${postOrPage.slug}`,
            identifier: postOrPage.slug,
            title: postOrPage.title,
          }}
        />
      </article>
    </div>
  );
};

export default PostOrPageContent;
