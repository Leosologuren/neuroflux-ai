import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tjcpzvzkwhafhzhlaaud.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqY3B6dnprd2hhZmh6aGxhYXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDExODgsImV4cCI6MjA2OTgxNzE4OH0.23Kp-uKmAEWiTKNGb85ndrwTTIkomKCNEhk6pwXuiQ4'
export const supabase = createClient(supabaseUrl, supabaseKey)



