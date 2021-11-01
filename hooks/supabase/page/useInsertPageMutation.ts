import { supabase } from "../../../utils/supabaseClient";
import { definitions } from "../../../types/supabase";
import { useMutation } from "react-query";

const insertPage = async (page: Partial<definitions["pages"]>) => {
  const { data, error } = await supabase
    .from<definitions["pages"]>("pages")
    .insert(page);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

const useInsertPageMutation = () =>
  useMutation((post: Partial<definitions["pages"]>) => insertPage(post));

export default useInsertPageMutation;
