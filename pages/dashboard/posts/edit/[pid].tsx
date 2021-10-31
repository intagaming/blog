import React from "react";
import { useRequireAuth } from "../../../../hooks/auth/useRequireAuth";
import { useAuthUser } from "../../../../hooks/auth/useAuthUser";
import Composer from "../../../../components/dashboard/contents/composer/Composer";
import Dashboard from "../../../../components/dashboard/Dashboard";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import usePostQuery from "../../../../hooks/supabase/usePostQuery";
import useUpdatePostMutation from "../../../../hooks/supabase/useUpdatePostMutation";
import { definitions } from "../../../../types/supabase";
import { toast } from "react-hot-toast";

/**
 * We need to wrap with a component in order to ensure the [pid] is available.
 */

interface Props {
  pid: string;
}

const EditPageWithPid = ({ pid }: Props): JSX.Element => {
  const user = useAuthUser();
  const { data: postData, isLoading } = usePostQuery(pid as string);

  const updatePostMutation = useUpdatePostMutation();

  const handleCommit = (composedPost: Partial<definitions["posts"]>): void => {
    toast
      .promise(updatePostMutation.mutateAsync(composedPost), {
        loading: "Updating",
        success: "Updated.",
        error: "An error occurred.",
      })
      .then();
  };

  return (
    <>
      {user && (
        <Dashboard>
          {isLoading && <p>Please wait...</p>}

          {!isLoading && !postData && (
            <p>An error occurred. Please try again.</p>
          )}

          {!isLoading && postData && (
            <Composer post={postData} onCommit={handleCommit} />
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
