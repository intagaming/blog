import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  active: boolean;
};

const TocLi = ({ children, active }: Props): JSX.Element => (
  <li className={active ? "tocActive" : ""}>{children}</li>
);

export default TocLi;
