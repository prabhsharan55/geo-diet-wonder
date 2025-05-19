
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eyqutwgkcqqnnnogrddx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5cXV0d2drY3Fxbm5ub2dyZGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2Njg4ODgsImV4cCI6MjA2MzI0NDg4OH0.sMT7Xi0vIKc-1NtUaMRRFLqJGNPXeHiy1B6Ktldr8eg";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
