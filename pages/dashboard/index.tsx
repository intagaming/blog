import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useRequireAuth } from "../../hooks/auth/useRequireAuth";
import dynamic from "next/dynamic";
import { useAuthUser } from "../../hooks/auth/useAuthUser";

const DashboardPage = (): JSX.Element => {
  useRequireAuth("/dashboard/auth");

  const user = useAuthUser();

  return (
    <>
      {user === undefined && <p>Please wait...</p>}
      {user && <Dashboard />}
    </>
  );
};

/**
 * Turn off SSR for this page, because there's nothing to render server-side.
 */
export default dynamic(() => Promise.resolve(DashboardPage), {
  ssr: false
});