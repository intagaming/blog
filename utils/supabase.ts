import { supabase } from "./supabaseClient";
import { definitions } from "../types/supabase";

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const getObjectUrl = (path: string) => {
  const { data } = supabase.storage.from("assets").getPublicUrl(path);
  return data.publicURL;
};

/**
 * This function exists while the cover field is not an url yet.
 * TODO: Delete this when the backend made the move.
 */
export const hackPostCoverUrl = (
  post: definitions["posts"]
): definitions["posts"] => {
  if (!post.cover.match(/^https?:\/\//)) {
    post.cover = getObjectUrl(post.cover);
  }
  return post;
};

/**
 * This function exists while the avatar field is not an url yet.
 * TODO: Delete this when the backend made the move.
 */
export const hackAuthorAvatarUrl = (
  author: definitions["authors"]
): definitions["authors"] => {
  if (!author.avatar?.match(/^https?:\/\//)) {
    author.avatar = getObjectUrl(author.avatar);
  }
  return author;
};
