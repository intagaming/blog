import { Element } from "hast";
import { ReactNode } from "react";
import { InView } from "react-intersection-observer";

export type HeadingIntersectFunction = {
  (headingId: string, inView: boolean, entry: IntersectionObserverEntry): void;
};

type Props = {
  node: Element;
  children: ReactNode;
  onIntersect: HeadingIntersectFunction;
};

const PostOrPageHeading = ({
  node,
  children,
  onIntersect,
}: Props): JSX.Element => {
  return (
    <InView
      onChange={(inView, entry) => {
        onIntersect(node.properties.id as string, inView, entry);
      }}
    >
      {({ ref }) => {
        const HeadingTag = node.tagName as keyof JSX.IntrinsicElements;
        const props = {
          ref,
          ...node.properties,
          className: "heading",
        };
        return (
          <a href={"#" + node.properties.id} className="!no-underline">
            <HeadingTag {...props}>{children}</HeadingTag>
          </a>
        );
      }}
    </InView>
  );
};

export default PostOrPageHeading;
