import { createClient } from '@supabase/supabase-js'

// 🔑 Use your own Supabase values from Project Settings → API
const supabaseUrl = "https://xhvgovpvvrhzrmuknuxt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhodmdvdnB2dnJoenJtdWtudXh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE2NDU3OCwiZXhwIjoyMDc0NzQwNTc4fQ._UCOLNbZk-doi9u9juo6fXDWtVZV1x4orTJk0Rt-HHc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
