import { supabase } from "../../../utils/supabaseClient";
import { definitions } from "../../../types/supabase";
import { useMutation } from "react-query";

const insertPost = async (post: Partial<definitions["posts"]>) => {
  const { data, error } = await supabase
    .from<definitions["posts"]>("posts")
    .insert(post);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useInsertPostMutation = () =>
  useMutation((post: Partial<definitions["posts"]>) => insertPost(post));

export default useInsertPostMutation;
