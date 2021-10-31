import { useQuery } from "react-query";
import { supabase } from "../../utils/supabaseClient";
import { definitions } from "../../types/supabase";
import { postsKey } from "./usePostsQuery";

const getPost = async (postId: string): Promise<definitions["posts"]> => {
  const { data, error } = await supabase
    .from<definitions["posts"]>("posts")
    .select()
    .eq("id", postId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const usePostQuery = (postId: string) => {
  return useQuery(postsKey.post(postId), () => getPost(postId));
};

export default usePostQuery;
