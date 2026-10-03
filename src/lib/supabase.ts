import { createClient } from '@supabase/supabase-js';

// Reads from environment variables if set in Cloudflare Pages / .env, otherwise uses working fallback
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://frbpnqlrvwlrsnkxvwli.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_2lIG02KwafXf7eeaV4QrZQ_pHU3LnAa';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
