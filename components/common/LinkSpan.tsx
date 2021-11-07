import { LinkProps } from "next/link";
import { ReactNode } from "react";
import { Node } from "unist";
import LinkWrapper from "./LinkWrapper";

type Props = {
  href: LinkProps["href"];
  children: ReactNode;
};

export type LinkSpanWithNode = {
  ({
    href,
    children,
    node,
  }: {
    node: Node;
    href: LinkProps["href"];
    children: ReactNode;
  }): JSX.Element;
};

const LinkSpan = ({ href, children }: Props): JSX.Element => (
  <LinkWrapper href={href}>
    <span className="hover:underline">{children}</span>
  </LinkWrapper>
);

export default LinkSpan;
