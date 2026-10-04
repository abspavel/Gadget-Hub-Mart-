import { createClient } from '@supabase/supabase-js';

// Reads from environment variables if set in Cloudflare Pages / .env, otherwise uses fallback
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://frbpnqlrvwlrsnkxvwli.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_2lIG02KwafXf7eeaV4QrZQ_pHU3LnAa';

// Safe custom fetch handler that prevents unhandled "TypeError: Failed to fetch"
const safeFetch: typeof fetch = async (input, init) => {
  try {
    return await fetch(input, init);
  } catch {
    // Return graceful 200 Response so local state and safeStorage continue seamlessly
    return new Response(JSON.stringify({ data: [], error: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    fetch: safeFetch,
  },
});
