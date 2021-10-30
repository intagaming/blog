import React from "react";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import { signOut } from "../../utils/supabase";

const Dashboard = (): JSX.Element => {
  const user = useAuthUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi, {user.email}</p>
      <button className="bg-indigo-300 p-1" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;