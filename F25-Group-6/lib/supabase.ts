import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const url = 'https://auizjnhgpwkwwmtkrqeg.supabase.co';
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true },
});