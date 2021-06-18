import PropTypes from "prop-types";
import Image from "next/image";
import React from "react";
import rehype2react from "rehype-react";
import rehype from "rehype";
import NextImage from "./nextImage";
import AuthorAndBrief from "./authorAndBrief";

const PostOrPageContent = ({ postOrPage }) => {
  const { htmlNode, json } = postOrPage;
  return (
    <div className={"flex justify-center md:mt-20 my-10 mx-2"}>
      <article className={"prose w-full"}>
        <h1>{json.title}</h1>
        {json.author && <AuthorAndBrief post={json} />}
        {json.cover && (
          <div className="mt-6 aspect-w-3 aspect-h-2">
            <Image
              className="rounded-sm object-contain"
              src={json.cover.url}
              alt={json.cover.alternativeText}
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
            .stringify(htmlNode)}
        </div>
      </article>
    </div>
  );
};

PostOrPageContent.propTypes = {
  postOrPage: PropTypes.object,
};

export default PostOrPageContent;
