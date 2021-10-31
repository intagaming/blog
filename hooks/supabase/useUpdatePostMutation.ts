import { supabase } from "../../utils/supabaseClient";
import { definitions } from "../../types/supabase";
import { useMutation } from "react-query";

const updatePost = async (post: Partial<definitions["posts"]>) => {
  const { data, error } = await supabase
    .from<definitions["posts"]>("posts")
    .update(post);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useUpdatePostMutation = () =>
  useMutation((post: Partial<definitions["posts"]>) => updatePost(post));

export default useUpdatePostMutation;
