
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://bnpbsfhtrxdpngwikdab.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucGJzZmh0cnhkcG5nd2lrZGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4ODUyMDUsImV4cCI6MjA1MDQ2MTIwNX0.fLwfn-zwSlUqndU6qgf_QuMp7keQ2KT1vST4IPaM528"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase