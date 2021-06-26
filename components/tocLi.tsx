import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  active: "active" | "nearMiss" | false;
};

const TocLi = ({ children, active }: Props): JSX.Element => {
  let classes = "";
  switch (active) {
    case "active":
      classes = "tocActive";
      break;
    case "nearMiss":
      classes = "tocNearMiss";
      break;
    default:
  }

  return <li className={classes}>{children}</li>;
};

export default TocLi;
