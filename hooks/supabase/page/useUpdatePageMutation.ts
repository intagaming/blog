import { supabase } from "../../../utils/supabaseClient";
import { definitions } from "../../../types/supabase";
import { useMutation } from "react-query";

const updatePage = async (page: Partial<definitions["pages"]>) => {
  const { data, error } = await supabase
    .from<definitions["pages"]>("pages")
    .update(page)
    .match({ id: page.id });

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useUpdatePageMutation = () =>
  useMutation((page: Partial<definitions["pages"]>) => updatePage(page));

export default useUpdatePageMutation;
