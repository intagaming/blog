import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useRequireAuth } from "../../hooks/auth/useRequireAuth";
import dynamic from "next/dynamic";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import MainDashboard from "../../components/dashboard/contents/MainDashboard";

const DashboardPage = (): JSX.Element => {
  useRequireAuth();

  const user = useAuthUser();

  return (
    <>
      {user === undefined && <p>Please wait...</p>}
      {user && (
        <Dashboard>
          <MainDashboard />
        </Dashboard>
      )}
    </>
  );
};

/**
 * Turn off SSR for this page, because there's nothing to render server-side.
 */
export default dynamic(() => Promise.resolve(DashboardPage), {
  ssr: false,
});
