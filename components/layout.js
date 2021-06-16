import PropTypes from "prop-types";
import TopNavigation from "./topnav";
import React from "react";

const Layout = (props) => {
  return (
    <>
      <TopNavigation />
      {props.children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
