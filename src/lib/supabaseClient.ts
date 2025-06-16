
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Diagnostic logs removed after RLS policy setup.
// console.log('[supabaseClient.ts] Attempting to read NEXT_PUBLIC_SUPABASE_URL. Value:', supabaseUrl);
// console.log('[supabaseClient.ts] Attempting to read NEXT_PUBLIC_SUPABASE_ANON_KEY. Value:', supabaseAnonKey ? "Exists (key hidden for security)" : undefined);


if (!supabaseUrl) {
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
