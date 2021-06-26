import rehype from "rehype";
import rehype2react from "rehype-react";
import React, {
  useRef,
  useEffect,
  useState,
  SetStateAction,
  useCallback,
} from "react";
import { Element } from "hast";

import TocLi from "./tocLi";
import { TocMapping } from "../lib/tableOfContents";

type Props = {
  toc: Element;
  tocMapping: TocMapping;
  // headingRefs: { [headingId: string]: React.RefObject<HTMLHeadingElement> };
  onMount(setHeadingRefs: React.Dispatch<SetStateAction<{}>>): void;
};

const TableOfContents = ({ onMount, toc, tocMapping }: Props): JSX.Element => {
  // This board/panel is like a circuit breaker, full of flip flops.
  // In this case, it's an active state breaker for <li>s.
  const [headingActiveBoard, setHeadingActiveBoard] = useState({});

  // refs to the h tags inside PostOrPageHeading.
  const [headingRefs, setHeadingRefs] = useState(null);

  // This boolean marks if this ToC reevaluated once.
  const isInit = useRef(false);

  // We'll send out the state set method.
  // Once the state is updated, we can use those to
  //   capture positions and highlight properly.
  useEffect(() => {
    onMount(setHeadingRefs);
  }, [onMount]);

  // When rendering this component, populate the board with toggles.
  // In the same analogy, toggle labels = id of <a> tags.
  // This is used to reset the board when highlighting.
  const defaultBoard = useRef({}); // The default board with all = false.
  const createElementWrapper = (...args) => {
    if (args[0] === TocLi) {
      args[2].forEach((liChild) => {
        if (liChild.type !== "a") return;
        const id = liChild.props.href.slice(1);
        defaultBoard.current[id] = false;
        args[1].active = headingActiveBoard[id]; // Attaching props to custom li.
      });
    }
    return React.createElement.apply(null, args);
  };

  // Reset when updating tocMapping.
  // Triggered when we change page (which changes ToC, which changes tocMapping),
  //   before headingRefs is sent into this ToC.
  useEffect(() => {
    // Hydrated when this component re-renders.
    // It'll re-render after this reset.
    defaultBoard.current = {};

    // Hydrated when the parent complete its render.
    setHeadingRefs(null);

    // Hydrated when reevaluate the first time.
    setHeadingActiveBoard({});
  }, [tocMapping]);

  useEffect(() => {
    // We can't depend on tocMapping because it is too soon.
    // It would init right after it finishes resetting.
    isInit.current = false;
  }, [headingRefs]);

  const reevaluate = useCallback(() => {
    let newBoard;

    // Propagates the highlight like h4 -> h3 -> h2
    const highlight = (id: string, nearMiss = false) => {
      newBoard = {
        ...newBoard,
        [id]: nearMiss ? "nearMiss" : "active",
      };
      const lastId = tocMapping[id].last;
      if (lastId) {
        newBoard = {
          ...newBoard,
          [lastId]: !nearMiss ? false : "active",
        };
      }

      const mapping = tocMapping[id];
      if (mapping.parent) {
        highlight(mapping.parent);
      }
    };

    const midpoint = window.innerHeight / 2; // Vertical center of the window
    let nearMost = null; // The nearest id above the midpoint
    let nearMiss = null; // The next id, below the midpoint
    Object.keys(headingRefs ?? []).every((key) => {
      // Find nearMost & nearMiss
      const ref = headingRefs[key];
      if (!ref.current) {
        // Heading not available. We are in the page switching process.
        // Stop and turn off all highlight.
        return false;
      }
      const rect = ref.current.getBoundingClientRect();
      if (rect.top <= midpoint) {
        nearMost = key;
        return true;
      }
      nearMiss = key;
      return false;
    });

    newBoard = defaultBoard; // Reset all to off
    if (nearMost) {
      highlight(nearMost);
      if (
        nearMiss &&
        headingRefs[nearMiss].current.getBoundingClientRect().top <=
          window.innerHeight
      ) {
        highlight(nearMiss, true);
      }
    }
    setHeadingActiveBoard(newBoard);
  }, [headingActiveBoard, headingRefs, tocMapping]);

  useEffect(() => {
    const onScroll = () => {
      reevaluate(); // Reevaluate on scroll
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [reevaluate]);

  // We must reevaluate once when the page is
  //  completely loaded.
  useEffect(() => {
    // headingRefs must be available to init.
    // And by this time, the defaultBoard is populated, because
    //   headingRefs will only be updated once PostOrPageContent
    //   finished its render, at which time this component already
    //   rendered.
    if (headingRefs && !isInit.current) {
      reevaluate();
      isInit.current = true;
    }
  }, [reevaluate, headingRefs]);

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
