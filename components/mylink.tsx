import { Element } from "hast";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { animated, useSpring, config } from "react-spring";

type Props = {
  href: LinkProps["href"];
  children: ReactNode;
  node?: Element;
};

const MyLink = ({ href, children }: Props): JSX.Element => {
  const [{ opacity }, api] = useSpring(() => ({
    opacity: 0,
    config: config.gentle,
  }));
  return (
    <Link href={href}>
      <animated.a
        onMouseOver={() => {
          api.start({ opacity: 0.4 });
        }}
        onMouseLeave={() => {
          api.start({ opacity: 0 });
        }}
        style={{
          cursor: "pointer",
          backgroundColor: opacity.to(
            (opacity) => `hsl(21, 27%, 45%, ${opacity})`
          ),
        }}
      >
        <span className="text-indigo-600 underline">{children}</span>
      </animated.a>
    </Link>
  );
};

export default MyLink;
