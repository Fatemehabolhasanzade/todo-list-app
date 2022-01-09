import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTM2ODY1OSwiZXhwIjoxOTU2OTQ0NjU5fQ.hFFJp90j5KC7nCGo3gqkrr1MFeP_xNmEXyqEJgPNRWA'

const SUPABASE_URL = "https://jsasiopjraaziwqptlsc.supabase.co"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
