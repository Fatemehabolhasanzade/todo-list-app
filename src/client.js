import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://jsasiopjraaziwqptlsc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTM2ODY1OSwiZXhwIjoxOTU2OTQ0NjU5fQ.hFFJp90j5KC7nCGo3gqkrr1MFeP_xNmEXyqEJgPNRWA"
)