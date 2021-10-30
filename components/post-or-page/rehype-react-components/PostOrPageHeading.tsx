import { Element } from "hast";
import React, { ReactNode } from "react";

import LinkWrapper from "../../common/LinkWrapper";

type Props = {
  node: Element;
  children: ReactNode;
};

/**
 * Provides the href needed for heading navigation.
 */
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
