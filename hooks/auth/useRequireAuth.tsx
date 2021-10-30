import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../../state/user-context";

export const useRequireAuth = (redirectRoute: string) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(redirectRoute).then();
    }
  }, [user, router, redirectRoute]);
};