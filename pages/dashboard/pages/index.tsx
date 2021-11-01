import React from "react";
import dynamic from "next/dynamic";
import { useRequireAuth } from "../../../hooks/auth/useRequireAuth";
import { useAuthUser } from "../../../hooks/auth/useAuthUser";
import Dashboard from "../../../components/dashboard/Dashboard";
import DashboardPages from "../../../components/dashboard/contents/DashboardPages";

const DashboardPagesPage = (): JSX.Element => {
  useRequireAuth();

  const user = useAuthUser();

  return (
    <>
      {user === undefined && <p>Please wait...</p>}
      {user && (
        <Dashboard>
          <DashboardPages />
        </Dashboard>
      )}
    </>
  );
};

/**
 * Turn off SSR for this page, because there's nothing to render server-side.
 */
export default dynamic(() => Promise.resolve(DashboardPagesPage), {
  ssr: false,
});
