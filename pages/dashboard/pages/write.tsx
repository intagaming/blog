import React from "react";
import { useRequireAuth } from "../../../hooks/auth/useRequireAuth";
import { useAuthUser } from "../../../hooks/auth/useAuthUser";
import Dashboard from "../../../components/dashboard/Dashboard";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { definitions } from "../../../types/supabase";
import useInsertPageMutation from "../../../hooks/supabase/page/useInsertPageMutation";
import PageComposer from "../../../components/dashboard/contents/page/PageComposer";

const WritePage = (): JSX.Element => {
  useRequireAuth();
  const user = useAuthUser();
  const insertPageMutation = useInsertPageMutation();
  const router = useRouter();

  const handleCommit = (composedPage: Partial<definitions["pages"]>): void => {
    toast
      .promise(insertPageMutation.mutateAsync(composedPage), {
        loading: "Creating a page...",
        success: "Success",
        error: (e: Error) => e.message,
      })
      .then(
        (page) => {
          router.push(`/dashboard/pages/edit/${page.id}`).then();
        },
        () => {}
      );
  };

  return (
    <>
      {user && (
        <Dashboard>
          <PageComposer onCommit={handleCommit} />
        </Dashboard>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(WritePage), {
  ssr: false,
});
