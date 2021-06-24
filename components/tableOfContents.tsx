import rehype from "rehype";
import rehype2react from "rehype-react";
import React, { useRef } from "react";
import { Element } from "hast";
import { useEffect } from "react";
import TocLi from "./tocLi";
import { TocMapping } from "../lib/tableOfContents";
import { useState } from "react";

export type HeadingIntersectData = {
  inView: boolean;
  entry: IntersectionObserverEntry;
};

export type HeadingIntersectDataStore = {
  [key: string]: HeadingIntersectData;
};

export type SetHeadingIntersectData = {
  (headingId: string, headingIntersectData: HeadingIntersectData): void;
};

type Props = {
  toc: Element;
  onMount(setHeadingIntersectData: SetHeadingIntersectData): void;
  tocMapping: TocMapping;
};

const TableOfContents = ({ toc, onMount, tocMapping }: Props): JSX.Element => {
  // This store contains intersect data of heading tags.
  const headingIntersectDataStore = useRef({});

  // This board/panel is like a circuit breaker, full of flip flops.
  // In this case, it's an active state breaker for <li>s.
  const [headingActiveBoard, setHeadingActiveBoard] = useState({});

  // To clear things up between the two, an active <li> tag
  // does not always mean the corresponding heading is showing on screen.

  // Clear the stores when updating tocMapping.
  // Triggered when we change page (which changes ToC, which changes tocMapping).
  useEffect(() => {
    // This will be hydrated at the page load, all to inView = false.
    headingIntersectDataStore.current = {};

    // Will be hydrated when resetBoard() is called the first time,
    // which will be called when the first heading comes into screen.
    setHeadingActiveBoard({});
  }, [tocMapping]);

  // When rendering this component, populate the board with knobs.
  // In the same analogy, knob labels = id of <a> tags.
  const defaultBoard = useRef({}); // The default board with all = false.
  const createElementWrapper = (...args) => {
    if (args[0] === TocLi) {
      for (const liChild of args[2]) {
        if (liChild.type !== "a") return;
        const id = liChild.props.href.slice(1);
        defaultBoard.current[id] = false;
        args[1].active = headingActiveBoard[id]; // Attaching props to custom li.
        break;
      }
    }
    return React.createElement.apply(null, args);
  };

  const resetBoard = () => {
    setHeadingActiveBoard(defaultBoard.current);
  };

  // Find all active headings.
  type ActiveData = {
    id: string;
    headingIntersectData: HeadingIntersectData;
  };
  const getAllActiveData = (): ActiveData[] => {
    const actives: ActiveData[] = [];
    for (const id in headingActiveBoard) {
      if (headingActiveBoard[id]) {
        actives.push({
          id,
          headingIntersectData: headingIntersectDataStore.current[id],
        });
      }
    }
    return actives;
  };

  // Propagates the highlight like h4 -> h3 -> h2
  const highlight = (id: string) => {
    // Might be a good idea to store the final board first. (Too many re-render thingy.)
    setHeadingActiveBoard((board) => {
      return {
        ...board,
        [id]: true,
      };
    });
    const mapping = tocMapping[id];
    if (mapping.parent) {
      highlight(mapping.parent);
    }
  };

  // Throw it outside to parent to access
  // Each time a heading enters/leaves the screen, we reevaluate.
  const setHeadingIntersectData: SetHeadingIntersectData = (
    headingId,
    headingIntersectData
  ) => {
    headingIntersectDataStore.current[headingId] = headingIntersectData; // Update to the store

    // If we have a heading on screen, reset all active to false and activate currently on-screen headings.
    let reset = false; // We only reset if there's one heading in view. Otherwise keep old state.
    let somethingOnScreen = false;
    for (const id in headingIntersectDataStore.current) {
      if (headingIntersectDataStore.current[id].inView) {
        if (!reset) {
          resetBoard();
          reset = true;
        }
        somethingOnScreen = true;
        highlight(id);
      }
    }

    // If no heading is on screen, we need to reevaluate, because they might be scrolling backwards.
    // Check the position of the deepest level heading (because they're reading the deepest level heading's content).
    // If it's above the screen, we're ok. Otherwise, back it off a notch.
    if (somethingOnScreen) return;

    // Find all active headings.
    const actives = getAllActiveData();

    // This safeguard requires there's at least an active (to back off of).
    // Triggered when first time loading the page (which at the time has
    // no active but has intersect data - populated with inView = false)
    if (actives.length === 0) return;

    let child: ActiveData = actives.pop();
    let active: ActiveData;
    while ((active = actives.pop()) !== undefined) {
      if (tocMapping[active.id].parent === child.id) {
        // If current's parent is the children
        child = active; // Switch the position.
      }
    }

    // We found the child. Now check if it's above the screen (which is ok, we ignore)
    if (child.headingIntersectData.entry?.boundingClientRect.top <= 0) {
      return;
    }

    // It's below the screen. Back it off.
    resetBoard();
    const last = tocMapping[child.id].last;
    if (!last) return; // Except we don't have anything to back off to.
    highlight(last);
  };
  onMount(setHeadingIntersectData);

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
