import rehype from "rehype";
import { Node } from "unist";
import rehype2react from "rehype-react";
import React from "react";

type Props = {
  className?: string;
  toc: Node;
};

const TableOfContents = ({ className = "", toc }: Props): JSX.Element => {
  return (
    <div className="mx-auto w-[65ch] max-w-full text-md lg:absolute lg:left-full lg:w-[14vw] lg:h-full">
      <aside className={`lg:sticky lg:top-20 text-sm ${className}`}>
        <h2>Table of Contents</h2>
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
