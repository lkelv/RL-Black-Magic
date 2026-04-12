import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yardhwmobvyxcmjqnoxg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmRod21vYnZ5eGNtanFub3hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4ODE0ODAsImV4cCI6MjA5MTQ1NzQ4MH0.zAgMECYbgHfC2pt0vDLNNK3VxJpwNsScC9dKQVvAxzc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);