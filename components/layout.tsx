import TopNavigation from "./topnav";
import Footer from "./footer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <TopNavigation />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
