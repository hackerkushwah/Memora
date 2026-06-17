import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key-to-prevent-crash";

// Client-side Supabase (uses anon key — safe for browser, configured for SSR PKCE cookies)
export const supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
