import { ReactNode } from "react";
import TopNavigation from "./top-navigation/TopNavigation";
import Footer from "./Footer";

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
