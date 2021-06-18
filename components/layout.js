import PropTypes from "prop-types";
import TopNavigation from "./topnav";
import React from "react";
import Footer from "./footer";

const Layout = (props) => {
  return (
    <>
      <TopNavigation />
      {props.children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
