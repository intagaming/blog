import Image from "next/image";
import React from "react";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextImage from "./nextImage";
import AuthorAndBrief from "./authorAndBrief";
import { PostOrPageData } from "../types/postOrPage";
import "highlight.js/styles/github-dark.css";
import TableOfContents, { SetHeadingIntersectData } from "./tableOfContents";
import { TocMapping } from "../lib/tableOfContents";
import PostOrPageHeading, {
  HeadingIntersectFunction,
} from "./postOrPageHeading";
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

  // We need this function in order to update the intersect data in <TableOfContents/>.
  let setHeadingIntersectData: SetHeadingIntersectData;

  // When <TableOfContents> renders, we will have the function to use.
  const onTocMount = (f: SetHeadingIntersectData) => {
    setHeadingIntersectData = f;
  };

  // On heading intersecting the view (called by PostOrPageHeading)
  const onIntersect: HeadingIntersectFunction = (headingId, inView, entry) => {
    // Seems like <InView/>'s onChange prop (which triggers this) is
    // being called after <TableOfContents/> is rendered, which guarantees
    // this function to be available.
    setHeadingIntersectData(headingId, { inView, entry });
  };

  const createElementWrapper = (...args) => {
    // We need to pass onIntersect into PostOrPageHeading
    if (args[0] === PostOrPageHeading) {
      args[1].onIntersect = onIntersect;
    }
    return React.createElement.apply(null, args);
  };

  const proseClasses = "prose prose-md lg:prose-lg prose-indigo w-full";
  return (
    <article className="md:pt-20 pt-10 pb-10 px-4 flex flex-col items-center bg-white dark:bg-[#121212] min-h-[65vh]">
      <div className={proseClasses}>
        <h1>{postOrPage.title}</h1>
        {postOrPage.author && <AuthorAndBrief post={postOrPage} />}
        {postOrPage.cover && (
          <div className="mt-6 aspect-w-3 aspect-h-2">
            <Image
              className="rounded-sm object-contain"
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
          onMount={onTocMount}
          tocMapping={tocMapping}
        />

        <div className={`${proseClasses} mx-auto`}>
          {rehype()
            .data("settings", {
              fragment: true,
            })
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
        </div>
      </div>
    </article>
  );
};

export default PostOrPageContent;
