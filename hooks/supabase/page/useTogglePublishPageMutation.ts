import { useMutation } from "react-query";
import { supabase } from "../../../utils/supabaseClient";
import { definitions } from "../../../types/supabase";

const togglePublish = async (pageId: number, publish: boolean) => {
  const { error } = await supabase
    .from<definitions["pages"]>("pages")
    .update({
      published_at: publish ? new Date().toISOString() : null,
    })
    .match({ id: pageId });
  if (error) {
    throw new Error(error.message);
  }
};

interface Variables {
  pageId: number;
  publish: boolean;
}

const useTogglePublishPageMutation = () => {
  return useMutation(({ pageId, publish }: Variables) =>
    togglePublish(pageId, publish)
  );
};

export default useTogglePublishPageMutation;
