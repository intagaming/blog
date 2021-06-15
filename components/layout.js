import TopNavigation from "./topnav";
import React from "react";

export default function Layout(props) {
  return (
    <>
      <TopNavigation />
      {props.children}
    </>
  );
}
