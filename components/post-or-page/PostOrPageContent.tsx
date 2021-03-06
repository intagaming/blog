import Image from "next/image";
import React, { createRef, useEffect } from "react";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextDirectionalImage from "./rehype-react-components/NextDirectionalImage";
import AuthorAndBrief from "../common/AuthorAndBrief";
import { PostOrPageData } from "../../types/postOrPage";
import "highlight.js/styles/github-dark.css";
import TableOfContents from "./table-of-contents/TableOfContents";
import { TocMapping } from "../../lib/tableOfContents";
import PostOrPageHeading from "./rehype-react-components/PostOrPageHeading";
import LinkSpan, { LinkSpanWithNode } from "../common/LinkSpan";

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
    <article className="md:pt-20 pt-10 pb-10 px-4 flex flex-col items-center bg-white dark:bg-surface-gray min-h-[65vh]">
      <div className={proseClasses}>
        <h1>{postOrPage.title}</h1>
        <AuthorAndBrief
          postOrPage={postOrPage}
          author={postOrPageData.author}
        />
        {"excerpt" in postOrPage && <p>{postOrPage.excerpt}</p>}
        {"cover" in postOrPage && (
          <div
            className="mt-6 aspect-w-16 aspect-h-9"
            data-testid="cover-image"
          >
            <Image
              className="object-cover rounded-sm"
              src={postOrPage.cover}
              alt=""
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

        <div className={`${proseClasses} mx-auto`} data-testid="blog-content">
          {rehype()
            .data("settings", {
              fragment: true,
            })
            // @ts-ignore Ignoring, forwardRef seems to work fine.
            .use(rehype2react, {
              createElement: createElementWrapper,
              Fragment: React.Fragment,
              components: {
                Image: NextDirectionalImage,
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
