import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://frbpnqlrvwlrsnkxvwli.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2lIG02KwafXf7eeaV4QrZQ_pHU3LnAa';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
