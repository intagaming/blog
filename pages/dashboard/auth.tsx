import React, { useEffect } from "react";
import { Auth } from "@supabase/ui";
import supabaseClient from "../../utils/supabaseClient";
import { useAuthUser } from "../../hooks/auth/useAuthUser";
import { useRouter } from "next/router";

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

const DashboardAuth = (): JSX.Element => {
  const user = useAuthUser();
  const router = useRouter();

  /**
   * The first time the user came back from the OAuth page, they will have
   * the `user === null`, so they are redirected from the /dashboard to this
   * auth page. It will take a moment to register the user into the session.
   * Then they need to be redirected back to the dashboard again.
   */
  useEffect(() => {
    if (user) {
      router.push("/dashboard").then();
    }
  });

  return (
    <div className="w-[100vw] h-[100vh] flex">
      <div className="w-[33vw] min-w-[300px] m-auto">
        <Auth
          supabaseClient={supabaseClient} providers={["github"]}
          onlyThirdPartyProviders={true}
          redirectTo={`${domainUrl}/dashboard`}
        />
      </div>
    </div>
  );
};

export default DashboardAuth;
