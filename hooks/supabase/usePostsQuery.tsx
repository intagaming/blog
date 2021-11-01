import { useQuery } from "react-query";
import { supabase } from "../../utils/supabaseClient";
import { definitions } from "../../types/supabase";

export const postsKey = {
  all: ["posts"] as const,
  post: (postId: string) => ["posts", postId] as const,
};

export type GetPostsEntry = Pick<
  definitions["posts"],
  "id" | "title" | "slug" | "cover" | "published_at"
>;

const getPosts = async (): Promise<GetPostsEntry[]> => {
  const { data, error } = await supabase
    .from<GetPostsEntry>("posts")
    .select(
      `
    id,
    title,
    slug,
    cover,
    published_at
    `
    )
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const usePostsQuery = () => {
  return useQuery<GetPostsEntry[]>(postsKey.all, () => getPosts());
};

export default usePostsQuery;
