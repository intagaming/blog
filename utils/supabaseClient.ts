import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseSecretKey = process.env.NEXT_SUPABASE_SECRET_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
const supabaseSecretClient =
  supabaseSecretKey && createClient(supabaseUrl, supabaseSecretKey);

export default supabaseClient;

export { supabaseClient as supabase, supabaseSecretClient as supabaseSecret };
