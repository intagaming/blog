import React, { ReactNode } from "react";
import LinkWrapper from "../../common/LinkWrapper";
import { LinkProps } from "next/link";

interface Props {
  href: LinkProps["href"];
  children?: ReactNode;
}

const SidebarLink = ({ href, children }: Props): JSX.Element => {
  return (
    <LinkWrapper href={href}>
      <p className="py-2">{children}</p>
    </LinkWrapper>
  );
};

export default SidebarLink;
