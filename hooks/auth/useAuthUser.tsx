import { useUser } from "../../state/user-context";

export const useAuthUser = () => {
  const { user } = useUser();
  return user;
};
