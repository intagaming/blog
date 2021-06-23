import rehype from "rehype";
import rehype2react from "rehype-react";
import React from "react";
import { Element } from "hast";
import { useEffect } from "react";
import TocLi from "./tocLi";
import { TocMapping } from "../lib/tableOfContents";
import { useState } from "react";

export type HeadingData = {
  inView: boolean;
  entry: IntersectionObserverEntry;
};

type Props = {
  toc: Element;
  headingData: {
    [key: string]: HeadingData;
  };

  tocMapping: TocMapping;
};

const TableOfContents = ({
  toc,
  headingData,
  tocMapping,
}: Props): JSX.Element => {
  // This board/panel is like a circuit breaker, full of flip flops.
  // In this case, it's an active state breaker for <li>s.
  const [headingActiveBoard, setHeadingActiveBoard] = useState({});

  const defaultBoard = {}; // The default board with all = false.
  const createElementWrapper = (...args) => {
    if (args[0] === TocLi) {
      for (const i of args[2]) {
        if (i.type === "a") {
          const id = i.props.href.slice(1);
          defaultBoard[id] = false;
          args[1].active = headingActiveBoard[id]; // Attaching props to custom li.
          break;
        }
      }
    }
    return React.createElement.apply(null, args);
  };

  const resetBoard = () => {
    setHeadingActiveBoard(defaultBoard);
  };

  // Propagates the highlight like h4 -> h3 -> h2
  const highlight = (id: string) => {
    // Might be a good idea to store the final board first. (Too many re-render thingy.)
    setHeadingActiveBoard((board) => {
      board[id] = true;
      return board;
    });
    const mapping = tocMapping[id];
    if (mapping.parent) {
      highlight(mapping.parent);
    }
  };

  // Each time a heading appears on the screen, we reevaluate.
  useEffect(() => {
    if (toc.children.length === 0) {
      return;
    }
    let reset = false; // We only reset if there's one in view. Otherwise keep old state.
    let allOffScreen = true;
    for (const id in headingData) {
      if (headingData[id].inView) {
        if (!reset) {
          resetBoard();
          reset = true;
        }
        allOffScreen = false;
        highlight(id);
      }
    }

    // If it's all off-screen, we need to reevaluate, because they might be scrolling backwards.
    // Check the position of the deepest level heading (because they're reading the deepest level heading's content).
    // If it's above the screen, we're ok. Otherwise, back it off a notch.
    if (!allOffScreen) return;

    // Find all actives
    const actives: {
      id: string;
      headingData: HeadingData;
    }[] = [];
    for (const id in headingActiveBoard) {
      if (headingActiveBoard[id]) {
        actives.push({ id, headingData: headingData[id] });
      }
    }

    // This condition is strange. If they're triggered because
    // they're all off-screen, they must be turned on before(?)
    if (actives.length === 0) return;

    type ActiveData = {
      id: string;
      headingData: HeadingData;
    };

    let child: ActiveData = actives.pop();
    let active: ActiveData;
    while ((active = actives.pop()) !== undefined) {
      if (tocMapping[active.id].parent === child.id) {
        // If current's parent is the children
        child = active; // Switch the position.
      }
    }

    // We found the child. Now check if it's above the screen (which is ok, we ignore)
    if (child.headingData.entry?.boundingClientRect.top <= 0) {
      return;
    }

    // It's below the screen. Back it off.
    resetBoard();
    const last = tocMapping[child.id].last;
    if (!last) return; // Except we don't have anything to back off to.
    highlight(last);
  }, [headingData]);

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
