import { Element } from "hast";
import { ReactNode } from "react";

type Props = {
  node: Element;
  children: ReactNode;
  active: boolean;
};

const TocLi = ({ children, active }: Props): JSX.Element => {
  return <li className={active ? "tocActive" : ""}>{children}</li>;
};

export default TocLi;
