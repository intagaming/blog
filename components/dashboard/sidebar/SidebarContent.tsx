import React from "react";
import LinkWrapper from "../../common/LinkWrapper";
import SidebarLink from "./SidebarLink";
import ThemeToggle from "../../layout/top-navigation/ThemeToggle";

const SidebarContent = (): JSX.Element => {
  return (
    <>
      <div className="w-full flex justify-center py-3">
        <LinkWrapper href="/dashboard">
          <span className="md:text-lg md:font-bold px-2">Dashboard</span>
        </LinkWrapper>
      </div>

      <hr />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-3 mx-2">
            <SidebarLink href="/dashboard/posts">Posts</SidebarLink>
          </div>

          <div className="flex flex-col gap-3 mx-2">
            <SidebarLink href="/dashboard/pages">Pages</SidebarLink>
          </div>

          <div className="flex flex-col gap-3 mx-2">
            <SidebarLink href="/dashboard/posts/write">Write</SidebarLink>
          </div>
        </div>

        <div className="flex gap-2 justify-center py-3">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default SidebarContent;
