import React from "react";
import dynamic from "next/dynamic";
import { useRequireAuth } from "../../../hooks/auth/useRequireAuth";
import { useAuthUser } from "../../../hooks/auth/useAuthUser";
import Dashboard from "../../../components/dashboard/Dashboard";
import DashboardPosts from "../../../components/dashboard/contents/DashboardPosts";

const DashboardPostsPage = (): JSX.Element => {
  useRequireAuth();

  const user = useAuthUser();

  return (
    <>
      {user === undefined && <p>Please wait...</p>}
      {user && (
        <Dashboard>
          <DashboardPosts />
        </Dashboard>
      )}
    </>
  );
};

/**
 * Turn off SSR for this page, because there's nothing to render server-side.
 */
export default dynamic(() => Promise.resolve(DashboardPostsPage), {
  ssr: false,
});
