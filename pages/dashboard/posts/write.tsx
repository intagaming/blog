import React from "react";
import { useRequireAuth } from "../../../hooks/auth/useRequireAuth";
import { useAuthUser } from "../../../hooks/auth/useAuthUser";
import PostComposer from "../../../components/dashboard/contents/post/PostComposer";
import Dashboard from "../../../components/dashboard/Dashboard";
import dynamic from "next/dynamic";
import useInsertPostMutation from "../../../hooks/supabase/post/useInsertPostMutation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { definitions } from "../../../types/supabase";

const WritePage = (): JSX.Element => {
  useRequireAuth();
  const user = useAuthUser();
  const insertPostMutation = useInsertPostMutation();
  const router = useRouter();

  const handleCommit = (composedPost: Partial<definitions["posts"]>): void => {
    toast
      .promise(insertPostMutation.mutateAsync(composedPost), {
        loading: "Creating a post...",
        success: "Success",
        error: (e: Error) => e.message,
      })
      .then(
        (post) => {
          router.push(`/dashboard/posts/edit/${post.id}`).then();
        },
        () => {}
      );
  };

  return (
    <>
      {user && (
        <Dashboard>
          <PostComposer onCommit={handleCommit} />
        </Dashboard>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(WritePage), {
  ssr: false,
});
