// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fovbbeeexjqmcivjaujs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdmJiZWVleGpxbWNpdmphdWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1Nzg2NjksImV4cCI6MjAzNTE1NDY2OX0.F3M2b5cR9gKJo5muAZ45bgs8LKkf8znkMlixf7wN_88';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
