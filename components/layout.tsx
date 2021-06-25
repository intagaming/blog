import { ReactNode } from "react";
import TopNavigation from "./topnav";
import Footer from "./footer";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => (
  <>
    <TopNavigation />
    {children}
    <Footer />
  </>
);

export default Layout;
