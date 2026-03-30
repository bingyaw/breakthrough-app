import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://zrsmhmuwjfghzgqglzab.supabase.co";
const supabaseAnonKey = "sb_publishable_xI70PFKSlLUnbu_Jq84oSQ_6vmmGgjk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
