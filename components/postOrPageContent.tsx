import Image from "next/image";
import React from "react";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextImage from "./nextImage";
import AuthorAndBrief from "./authorAndBrief";
import { PostOrPageData } from "../types/postOrPage";
import { DiscussionEmbed } from "disqus-react";
import "highlight.js/styles/github-dark.css";
import MyLinkNodeWrapper from "./myLinkNodeWrapper";
import TableOfContents from "../components/tableOfContents";

type Props = {
  postOrPageData: PostOrPageData;
  domainUrl: string; // For Disqus
};

const PostOrPageContent = ({
  postOrPageData,
  domainUrl,
}: Props): JSX.Element => {
  const { node, postOrPage } = postOrPageData;
  const proseClasses =
    "prose prose-md lg:prose-lg xl:prose-xl prose-indigo w-full";
  return (
    <article className={"md:mt-20 mt-10 mb-10 px-4 flex flex-col items-center"}>
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
      <div className={proseClasses}>
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
      </div>
    </article>
  );
};

export default PostOrPageContent;
