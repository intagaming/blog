import { Element } from "hast";
import { LinkProps } from "next/link";
import { ReactNode } from "react";
import MyLink from "./mylink";

type Props = {
  href: LinkProps["href"];
  children: ReactNode;
  node: Element;
};

const MyLinkNodeWrapper = ({ href, children }: Props): JSX.Element => {
  return <MyLink href={href}>{children}</MyLink>;
};

export default MyLinkNodeWrapper;
