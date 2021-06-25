import { Element } from "hast";
import { ReactNode } from "react";
import { InView } from "react-intersection-observer";
import LinkWrapper from "./linkWrapper";

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
  const HeadingTag = node.tagName as keyof JSX.IntrinsicElements;
  return (
    <InView
      onChange={(inView, entry) => {
        onIntersect(node.properties.id as string, inView, entry);
      }}
    >
      <LinkWrapper href={`#${node.properties.id}`}>
        <HeadingTag id={node.properties.id as string} className="heading">
          {children}
        </HeadingTag>
      </LinkWrapper>
    </InView>
  );
};

export default PostOrPageHeading;
