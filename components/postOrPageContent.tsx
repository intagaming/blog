import Image from "next/image";
import React from "react";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextImage from "./nextImage";
import AuthorAndBrief from "./authorAndBrief";
import { PostOrPageWithNode } from "../types/postOrPage";

type Props = {
  postOrPageWithNode: PostOrPageWithNode;
};

const PostOrPageContent = ({ postOrPageWithNode }: Props): JSX.Element => {
  const { node, postOrPage } = postOrPageWithNode;
  return (
    <div className={"flex justify-center md:mt-20 my-10 mx-4"}>
      <article className={"prose w-full md:prose-lg"}>
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
      </article>
    </div>
  );
};

export default PostOrPageContent;
