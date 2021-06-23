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
import { useInView } from "react-intersection-observer";
import { TocMapping } from "../lib/tableOfContents";

type Props = {
  postOrPageData: PostOrPageData;
  tocMapping: TocMapping;
};

const PostOrPageContent = ({
  postOrPageData,
  tocMapping,
}: Props): JSX.Element => {
  const { node, postOrPage, toc } = postOrPageData;
  const proseClasses =
    "prose prose-md lg:prose-lg xl:prose-xl prose-indigo w-full";

  // Map h tag to their state of being on the screen.
  // Powered by react-intersection-observer
  const headerInViews = {};

  const createElementWrapper = (...args) => {
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(args[0])) {
      const { ref, inView } = useInView();
      args[1].ref = ref;
      headerInViews[args[1].id] = inView;
    }
    return React.createElement.apply(null, args);
  };

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
        <TableOfContents
          toc={toc}
          headerInViews={headerInViews}
          tocMapping={tocMapping}
        />

        <div className={proseClasses + " mx-auto"}>
          {rehype()
            .data("settings", {
              fragment: true,
            })
            .use(rehype2react, {
              createElement: createElementWrapper,
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
