import { useMutation } from "react-query";
import { supabase } from "../../utils/supabaseClient";
import { definitions } from "../../types/supabase";

const togglePublish = async (postId: number, publish: boolean) => {
  const { error } = await supabase.from<definitions["posts"]>("posts").update({
    id: postId,
    published_at: publish ? new Date().toISOString() : null,
  });
  if (error) {
    throw new Error(error.message);
  }
};

interface Variables {
  postId: number;
  publish: boolean;
}

const useTogglePublishPostMutation = () => {
  return useMutation(({ postId, publish }: Variables) =>
    togglePublish(postId, publish)
  );
};

export default useTogglePublishPostMutation;
