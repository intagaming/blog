import React from "react";
import { useRequireAuth } from "../../../../hooks/auth/useRequireAuth";
import { useAuthUser } from "../../../../hooks/auth/useAuthUser";
import Dashboard from "../../../../components/dashboard/Dashboard";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { definitions } from "../../../../types/supabase";
import { toast } from "react-hot-toast";
import usePageQuery from "../../../../hooks/supabase/page/usePageQuery";
import useUpdatePageMutation from "../../../../hooks/supabase/page/useUpdatePageMutation";
import PageComposer from "../../../../components/dashboard/contents/page/PageComposer";

/**
 * We need to wrap with a component in order to ensure the [pid] is available.
 */

interface Props {
  pid: string;
}

const EditPageWithPid = ({ pid }: Props): JSX.Element => {
  const user = useAuthUser();
  const { data: pageData, isLoading } = usePageQuery(pid as string);

  const updatePageMutation = useUpdatePageMutation();

  const handleCommit = (composedPage: Partial<definitions["pages"]>): void => {
    toast.promise(updatePageMutation.mutateAsync(composedPage), {
      loading: "Updating",
      success: "Updated.",
      error: (e: Error) => e.message,
    });
  };

  return (
    <>
      {user && (
        <Dashboard>
          {isLoading && <p>Please wait...</p>}

          {!isLoading && !pageData && (
            <p>An error occurred. Please try again.</p>
          )}

          {!isLoading && pageData && (
            <PageComposer page={pageData} onCommit={handleCommit} />
          )}
        </Dashboard>
      )}
    </>
  );
};

const EditPage = (): JSX.Element => {
  useRequireAuth();
  const router = useRouter();
  const { pid } = router.query;

  return <>{pid && <EditPageWithPid pid={pid as string} />}</>;
};

export default dynamic(() => Promise.resolve(EditPage), {
  ssr: false,
});
