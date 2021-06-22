import rehype from "rehype";
import { Node } from "unist";
import rehype2react from "rehype-react";
import React from "react";

type Props = {
  toc: Node;
};

const TableOfContents = ({ toc }: Props): JSX.Element => {
  return (
    <div
      className={
        "toc nightwind-prevent-block mx-auto w-[65ch] max-w-full lg:absolute lg:left-full lg:h-full lg:ml-4 " +
        "lg:w-[calc((100vw-65ch)/2-5rem)] xl:w-[calc((100vw-65ch)/2-8rem)]"
      }
    >
      <aside className="text-gray-300 bg-black p-4 rounded-md mb-5 text-sm overflow-hidden max-h-[75vh] overflow-y-auto lg:my-0 lg:sticky lg:top-20">
        <h2 className="pb-4">&gt;_ Table of Contents</h2>
        {rehype()
          .data("settings", {
            fragment: true,
          })
          .use(rehype2react, {
            createElement: React.createElement,
          })
          .stringify(toc)}
      </aside>
    </div>
  );
};

export default TableOfContents;
