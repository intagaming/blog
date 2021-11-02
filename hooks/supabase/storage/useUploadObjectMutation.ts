import { supabase } from "../../../utils/supabaseClient";
import { useAuthUser } from "../../auth/useAuthUser";
import { AuthUser } from "@supabase/supabase-js";
import { useMutation } from "react-query";

const uploadObject = async (user: AuthUser, file: File) => {
  const { data, error } = await supabase.storage
    .from("assets")
    .upload(`${user.id}/${file.name}`, file);

  if (error) {
    throw error;
  }

  // TODO: This is stupid; why is there only {Key: string}? Where's the object's
  //   uuid? How can we make a relationship out of the Key (which is the
  //   object's path)?
  return data;
};

const useUploadObjectMutation = () => {
  const user = useAuthUser();

  return useMutation((file: File) => uploadObject(user, file));
};

export default useUploadObjectMutation;
