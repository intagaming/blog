import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { animated, useSpring, config } from "react-spring";

type Props = {
  href: LinkProps["href"];
  children: ReactNode;
};

const MyLink = ({ href, children }: Props): JSX.Element => {
  const [{ progress }, api] = useSpring(() => ({
    progress: 0,
    config: config.gentle,
  }));
  return (
    <Link href={href}>
      <animated.a
        onMouseOver={() => {
          api.start({ progress: 1 });
        }}
        onMouseLeave={() => {
          api.start({ progress: 0 });
        }}
        style={{
          cursor: "pointer",
          backgroundColor: progress.to(
            (progress) => `hsl(0, 0%, 100%, ${0.25 * progress})`
          ),
        }}
      >
        <span className="text-indigo-500 underline">{children}</span>
      </animated.a>
    </Link>
  );
};

export default MyLink;
