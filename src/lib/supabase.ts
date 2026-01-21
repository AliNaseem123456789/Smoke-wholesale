import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://puwqurkjqembiliyjwqk.supabase.co";
const supabaseKey = "sb_publishable_bQe-8LeaUZZHzgmHFmm2Kw_OVWLx6sE";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase Environment Variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
