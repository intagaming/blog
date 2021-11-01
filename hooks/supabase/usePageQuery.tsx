import { useQuery } from "react-query";
import { supabase } from "../../utils/supabaseClient";
import { definitions } from "../../types/supabase";
import { pagesKey } from "./usePagesQuery";

const getPage = async (pageId: string): Promise<definitions["pages"]> => {
  const { data, error } = await supabase
    .from<definitions["pages"]>("pages")
    .select()
    .eq("id", pageId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const usePageQuery = (pageId: string) => {
  return useQuery(pagesKey.page(pageId), () => getPage(pageId));
};

export default usePageQuery;
