import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hggkbxvuitvccqhxstme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZ2tieHZ1aXR2Y2NxaHhzdG1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNDkxMDQsImV4cCI6MjA5NzcyNTEwNH0.CS5894YzmVSqBWbGFj-Y75P86hkHsOhbE2ffRyHgvKU"
);
