import rehype from "rehype";
import { Node } from "unist";
import rehype2react from "rehype-react";
import React from "react";

type Props = {
  toc: Node;
};

const TableOfContents = ({ toc }: Props): JSX.Element => {
  return (
    <div className={"toc"}>
      <aside>
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
