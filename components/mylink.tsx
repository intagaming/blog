import { Element } from "hast";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import AnimatedLinkSpan from "./animatedLinkSpan";

type Props = {
  href: LinkProps["href"];
  children: ReactNode;
  node?: Element;
};

const MyLink = ({ href, children }: Props): JSX.Element => {
  const isNextLink = href.toString().startsWith("/");

  const classes = "!no-underline";

  if (isNextLink) {
    return (
      <Link href={href}>
        <a className={classes}>
          <AnimatedLinkSpan>{children}</AnimatedLinkSpan>
        </a>
      </Link>
    );
  }

  return (
    <a href={href.toString()} className={classes}>
      <AnimatedLinkSpan>{children}</AnimatedLinkSpan>
    </a>
  );
};

export default MyLink;
