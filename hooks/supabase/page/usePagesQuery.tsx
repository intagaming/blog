import { useQuery } from "react-query";
import { supabase } from "../../../utils/supabaseClient";
import { definitions } from "../../../types/supabase";

export const pagesKey = {
  all: ["pages"] as const,
  page: (pageId: string) => ["pages", pageId] as const,
};

export type GetPagesEntry = Pick<
  definitions["pages"],
  "id" | "title" | "slug" | "published_at"
>;

const getPages = async (): Promise<GetPagesEntry[]> => {
  const { data, error } = await supabase
    .from<GetPagesEntry>("pages")
    .select(
      `
    id,
    title,
    slug,
    published_at
    `
    )
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const usePagesQuery = () => {
  return useQuery<GetPagesEntry[]>(pagesKey.all, () => getPages());
};

export default usePagesQuery;
