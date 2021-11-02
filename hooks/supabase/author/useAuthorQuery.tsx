import { useQuery } from "react-query";
import { supabase } from "../../../utils/supabaseClient";
import { definitions } from "../../../types/supabase";

const authorKeys = {
  author: (authorId: string) => ["authors", authorId] as const,
};

export const getAuthor = async (
  authorId: string
): Promise<definitions["authors"]> => {
  const { data, error } = await supabase
    .from<definitions["authors"]>("authors")
    .select()
    .eq("user_id", authorId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useAuthorQuery = (authorId: string) => {
  return useQuery(authorKeys.author(authorId), () => getAuthor(authorId));
};

export default useAuthorQuery;
