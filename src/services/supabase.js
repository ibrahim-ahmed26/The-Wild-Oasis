import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qkfipiszaklwcwnlnruv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrZmlwaXN6YWtsd2N3bmxucnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxOTYyNTksImV4cCI6MjA3Mjc3MjI1OX0.rM7yIULZbaSxP2tD4VByItbmi26qtJZooJGmGZia3-Y";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
