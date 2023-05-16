import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://abfyibkjwzurieqcjmck.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZnlpYmtqd3p1cmllcWNqbWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwNjU0MTEsImV4cCI6MTk5OTY0MTQxMX0.SORBq0YUy7OqBz-7-_63tVPbEKeoneHoj0-oTINI1NU'
);
