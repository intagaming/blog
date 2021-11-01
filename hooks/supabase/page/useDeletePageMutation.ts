import { supabase } from "../../../utils/supabaseClient";
import { definitions } from "../../../types/supabase";
import { useMutation } from "react-query";

const deletePage = async (pageId: number) => {
  const { data, error } = await supabase
    .from<definitions["pages"]>("pages")
    .delete()
    .match({ id: pageId });

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useDeletePageMutation = () =>
  useMutation((pageId: number) => deletePage(pageId));

export default useDeletePageMutation;
