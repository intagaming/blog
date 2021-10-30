import { animated, useSpring, config } from "react-spring";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AnimatedLinkSpan = ({ children }: Props): JSX.Element => {
  const [{ opacity }, api] = useSpring(() => ({
    opacity: 0,
    config: config.gentle,
  }));

  return (
    <animated.span
      onMouseOver={() => {
        api.start({ opacity: 0.4 });
      }}
      onMouseLeave={() => {
        api.start({ opacity: 0 });
      }}
      style={{
        cursor: "pointer",
        backgroundColor: opacity.to((o) => `hsl(21, 27%, 45%, ${o})`),
      }}
    >
      <span className="text-indigo-600">{children}</span>
    </animated.span>
  );
};

export default AnimatedLinkSpan;
