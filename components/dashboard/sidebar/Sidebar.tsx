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
    <div ref={ref} className="md:h-screen">
      <div className="p-2 md:hidden">
        <Menu
          onClick={() => setExpand((lastExpand) => !lastExpand)}
          checked={expand}
        />
      </div>

      <div
        className={`${
          expand
            ? "flex fixed top-0 left-0 w-[66vw]"
            : "hidden md:flex md:w-[15vw]"
        } flex-col h-full bg-white dark:bg-surface-gray z-50 border-r`}
      >
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
