import { supabase } from "../../utils/supabaseClient";
import { definitions } from "../../types/supabase";
import { useMutation } from "react-query";

const deletePost = async (postId: number) => {
  const { data, error } = await supabase
    .from<definitions["posts"]>("posts")
    .delete()
    .match({ id: postId });

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useDeletePostMutation = () =>
  useMutation((postId: number) => deletePost(postId));

export default useDeletePostMutation;
