import { supabase } from "./supabaseClient";

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const getCoverUrl = (path: string) => {
  const { data } = supabase.storage.from("assets").getPublicUrl(path);
  return data.publicURL;
};
