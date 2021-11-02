import { supabase } from "../../../utils/supabaseClient";
import { useQuery } from "react-query";
import { AuthUser } from "@supabase/supabase-js";
import { useAuthUser } from "../../auth/useAuthUser";

export const objectsKey = {
  me: ["objects"] as const,
};

const getObjects = async (user: AuthUser) => {
  const { data, error } = await supabase.storage.from("assets").list(user.id);

  if (error) {
    throw error;
  }

  return data;
};

const useListObjectsQuery = () => {
  const user = useAuthUser();
  return useQuery(objectsKey.me, () => getObjects(user));
};

export default useListObjectsQuery;
