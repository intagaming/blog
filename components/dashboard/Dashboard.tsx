import React, { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";

interface Props {
  children?: ReactNode;
}

const Dashboard = ({ children }: Props): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row md:w-full md:h-screen">
      <Sidebar />
      <div className="md:overflow-y-auto flex-1">{children}</div>
    </div>
  );
};

export default Dashboard;
