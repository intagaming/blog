import { Element } from "hast";
import React, { ReactNode } from "react";

import LinkWrapper from "./linkWrapper";

export type HeadingIntersectFunction = {
  (headingId: string, inView: boolean, entry: IntersectionObserverEntry): void;
};

type Props = {
  node: Element;
  children: ReactNode;
};

const PostOrPageHeading = React.forwardRef(
  ({ node, children }: Props, ref): JSX.Element => {
    // I'm casting to bypass TypeScript complaining the ref type.
    const HeadingTag = node.tagName as "h2";

    return (
      <LinkWrapper href={`#${node.properties.id}`}>
        <HeadingTag
          ref={ref as React.ForwardedRef<HTMLHeadingElement>}
          id={node.properties.id as string}
          className="heading"
        >
          {children}
        </HeadingTag>
      </LinkWrapper>
    );
  }
);

PostOrPageHeading.displayName = "PostOrPageHeading";

export default PostOrPageHeading;
