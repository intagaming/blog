import { supabase } from "../../utils/supabaseClient";
import { useQuery } from "react-query";
import { AuthUser } from "@supabase/supabase-js";
import { useAuthUser } from "../auth/useAuthUser";

export const coversKey = {
  me: ["covers"] as const,
};

const getCovers = async (user: AuthUser) => {
  const { data, error } = await supabase.storage.from("covers").list(user.id);

  if (error) {
    throw error;
  }

  return data;
};

const useListCoversQuery = () => {
  const user = useAuthUser();
  return useQuery(coversKey.me, () => getCovers(user));
};

export default useListCoversQuery;
