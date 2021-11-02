import React, { useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import SidebarContent from "./SidebarContent";
import Menu from "../../layout/top-navigation/Menu";

const Sidebar = (): JSX.Element => {
  const ref = useRef();
  const [expand, setExpand] = useState<boolean>(false);

  const handleClickOutside = () => {
    setExpand(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    // Mobile sidebar
    <>
      <div className="p-2">
        <Menu onClick={() => setExpand(true)} checked={expand} />
      </div>

      <div
        ref={ref}
        className={`${
          expand ? "fixed" : "hidden"
        } h-[100vh] flex flex-col w-[66vw] bg-black z-50`}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
