import Image from "next/image";
import React, { createRef, useEffect } from "react";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextImage from "./nextImage";
import AuthorAndBrief from "./authorAndBrief";
import { PostOrPageData } from "../types/postOrPage";
import "highlight.js/styles/github-dark.css";
import TableOfContents from "./tableOfContents";
import { TocMapping } from "../lib/tableOfContents";
import PostOrPageHeading from "./postOrPageHeading";
import LinkSpan, { LinkSpanWithNode } from "./linkSpan";

type Props = {
  postOrPageData: PostOrPageData;
  tocMapping: TocMapping;
};

const PostOrPageContent = ({
  postOrPageData,
  tocMapping,
}: Props): JSX.Element => {
  const { node, postOrPage, toc, coverImagePlaceholder } = postOrPageData;

  // refs to the h tags inside PostOrPageHeading.
  const headingRefs = {};

  const createElementWrapper = (...args) => {
    if (args[0] === PostOrPageHeading) {
      const ref = createRef<HTMLHeadingElement>();
      args[1].ref = ref;
      headingRefs[args[1].id] = ref; // Storing ref
    }
    return React.createElement.apply(null, args);
  };

  let tocMount;
  const onTocMount = (f) => {
    tocMount = f;
  };
  // On rendering complete, we will send heading refs to ToC.
  // It is a state, so the ToC will re-render.
  useEffect(() => {
    tocMount(headingRefs);
  });

  const proseClasses = "prose prose-md lg:prose-lg prose-indigo w-full";
  return (
    <article className="md:pt-20 pt-10 pb-10 px-4 flex flex-col items-center bg-white dark:bg-[#121212] min-h-[65vh]">
      <div className={proseClasses}>
        <h1>{postOrPage.title}</h1>
        {postOrPage.author && <AuthorAndBrief post={postOrPage} />}
        {postOrPage.cover && (
          <div className="mt-6 aspect-w-3 aspect-h-2">
            <Image
              className="object-contain rounded-sm"
              src={postOrPage.cover.url}
              alt={postOrPage.cover.alternativeText}
              layout="fill"
              placeholder="blur"
              blurDataURL={coverImagePlaceholder}
            />
          </div>
        )}
      </div>

      <div className="w-full mt-10 lg:relative lg:w-auto">
        <TableOfContents
          toc={toc}
          tocMapping={tocMapping}
          onMount={onTocMount}
        />

        <div className={`${proseClasses} mx-auto`}>
          {rehype()
            .data("settings", {
              fragment: true,
            })
            // @ts-ignore Ignoring, forwardRef seems to work fine.
            .use(rehype2react, {
              createElement: createElementWrapper,
              Fragment: React.Fragment,
              components: {
                Image: NextImage,
                a: LinkSpan as LinkSpanWithNode,
                h1: PostOrPageHeading,
                h2: PostOrPageHeading,
                h3: PostOrPageHeading,
                h4: PostOrPageHeading,
                h5: PostOrPageHeading,
                h6: PostOrPageHeading,
              },
              passNode: true,
            })
            .stringify(node)}
          {/* A little long text to make this div the full width */}
          <span className="invisible">{"_ ".repeat(40)}</span>
        </div>
      </div>
    </article>
  );
};

export default PostOrPageContent;
