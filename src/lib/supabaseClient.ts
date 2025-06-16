
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "CRITICAL ERROR: Missing environment variable NEXT_PUBLIC_SUPABASE_URL. " +
    "Please ensure this variable is set in your .env.local file (for local development) " +
    "or in your hosting provider's environment variable settings. " +
    "The .env.local file MUST be in the ROOT directory of your project (same level as package.json). " +
    "If you've recently created or modified .env.local, you MUST RESTART your Next.js development server. " +
    "Example .env.local content: \n" +
    "NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here\n" +
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here"
  );
}
if (!supabaseAnonKey) {
  throw new Error(
    "CRITICAL ERROR: Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
    "Please ensure this variable is set in your .env.local file (for local development) " +
    "or in your hosting provider's environment variable settings. " +
    "The .env.local file MUST be in the ROOT directory of your project (same level as package.json). " +
    "If you've recently created or modified .env.local, you MUST RESTART your Next.js development server. " +
    "Example .env.local content: \n" +
    "NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here\n" +
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here"
  );
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
