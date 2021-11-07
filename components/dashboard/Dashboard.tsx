import React, { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";

interface Props {
  children?: ReactNode;
}

const Dashboard = ({ children }: Props): JSX.Element => {
  return (
    <div className="flex flex-col">
      <Sidebar />
      {children}
    </div>
  );
};

export default Dashboard;
