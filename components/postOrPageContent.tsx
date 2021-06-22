import Image from "next/image";
import React from "react";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextImage from "./nextImage";
import AuthorAndBrief from "./authorAndBrief";
import { PostOrPageData } from "../types/postOrPage";
import "highlight.js/styles/github-dark.css";
import MyLinkNodeWrapper from "./myLinkNodeWrapper";
import TableOfContents from "../components/tableOfContents";

type Props = {
  postOrPageData: PostOrPageData;
};

const PostOrPageContent = ({ postOrPageData }: Props): JSX.Element => {
  const { node, postOrPage } = postOrPageData;
  const proseClasses =
    "prose prose-md lg:prose-lg xl:prose-xl prose-indigo w-full";
  return (
    <article
      className={
        "md:pt-20 pt-10 pb-10 px-4 flex flex-col items-center bg-white dark:bg-[#121212] min-h-[65vh]"
      }
    >
      <div className={proseClasses}>
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
      </div>

      <div className="w-full mt-10 lg:relative lg:w-auto">
        <TableOfContents toc={postOrPageData.toc} />

        <div className={proseClasses + " mx-auto"}>
          {rehype()
            .data("settings", {
              fragment: true,
            })
            .use(rehype2react, {
              createElement: React.createElement,
              Fragment: React.Fragment,
              components: {
                Image: NextImage,
                a: MyLinkNodeWrapper,
              },
              passNode: true,
            })
            .stringify(node)}
        </div>
      </div>
    </article>
  );
};

export default PostOrPageContent;
