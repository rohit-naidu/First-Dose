import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// The browser only receives public Supabase values. Row Level Security still protects the data.
export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseKey);
}

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.');
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
