import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type Props = {
  href: LinkProps["href"];
  children: ReactNode;
};
const LinkWrapper = ({ href, children }: Props): JSX.Element => {
  const isNextLink = href.toString().startsWith("/");

  if (isNextLink) {
    return (
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="!no-underline">{children}</a>
      </Link>
    );
  }

  return (
    <a href={href.toString()} className="!no-underline">
      {children}
    </a>
  );
};

export default LinkWrapper;
