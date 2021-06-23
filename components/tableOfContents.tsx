import rehype from "rehype";
import rehype2react from "rehype-react";
import React from "react";
import { Element } from "hast";
import { useEffect } from "react";
import TocLi from "./tocLi";
import { TocMapping } from "../lib/tableOfContents";
import { useState } from "react";

type Props = {
  toc: Element;
  headerInViews: {
    [key: string]: boolean;
  };
  tocMapping: TocMapping;
};

const TableOfContents = ({
  toc,
  headerInViews,
  tocMapping,
}: Props): JSX.Element => {
  // This board/panel is like a circuit breaker, full of flip flops.
  // In this case, it's an active state breaker for <li>s.
  const [headerActiveBoard, setHeaderActiveBoard] = useState({});

  const defaultBoard = {}; // The default board with all = false.
  const createElementWrapper = (...args) => {
    if (args[0] === TocLi) {
      for (const i of args[2]) {
        if (i.type === "a") {
          const id = i.props.href.slice(1);
          defaultBoard[id] = false;
          args[1].active = headerActiveBoard[id]; // Attaching props to custom li.
          break;
        }
      }
    }
    return React.createElement.apply(null, args);
  };

  const resetBoard = () => {
    setHeaderActiveBoard(defaultBoard);
  };

  // Propagates the highlight like h4 -> h3 -> h2
  const highlight = (id: string) => {
    resetBoard();
    // Might be a good idea to store the final board first. (Too many re-render thingy.)
    setHeaderActiveBoard((board) => {
      board[id] = true;
      return board;
    });
    const parentId = tocMapping[id];
    if (parentId) {
      highlight(parentId);
    }
  };

  // Each time a header appears on the screen, we reevaluate.
  // Which means if there's none, there's no update, and we keep last (<li> active) state.
  useEffect(() => {
    for (const id in headerInViews) {
      if (headerInViews[id]) {
        highlight(id);
      }
    }
  }, [headerInViews]);

  return (
    toc.children.length > 0 && (
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
              createElement: createElementWrapper,
              components: {
                li: TocLi, // We will attach props to this custom li.
              },
            })
            .stringify(toc)}
        </aside>
      </div>
    )
  );
};

export default TableOfContents;
