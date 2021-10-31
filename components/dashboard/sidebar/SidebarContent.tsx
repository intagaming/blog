import React from "react";
import LinkWrapper from "../../common/LinkWrapper";
import SidebarLink from "./SidebarLink";
import ThemeToggle from "../../layout/top-navigation/ThemeToggle";

const SidebarContent = (): JSX.Element => {
  return (
    <>
      <div className="w-full flex justify-center my-3">
        <LinkWrapper href="/dashboard">
          <span className="md:text-lg md:font-bold px-2">Dashboard</span>
        </LinkWrapper>
      </div>

      <hr />

      <div className="flex flex-col gap-3 mx-2">
        <SidebarLink href="/dashboard/posts">Posts</SidebarLink>
      </div>

      <div className="flex flex-col gap-3 mx-2">
        <SidebarLink href="/dashboard/posts/write">Write</SidebarLink>
      </div>

      <ThemeToggle />
    </>
  );
};

export default SidebarContent;
