import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Sushi orders must be written to the SAME Supabase project as the clock-in admin app.
 *
 * Use these (recommended on Vercel so the browser can insert — no serverless env issues):
 *   NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_URL
 *   NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_ANON_KEY
 *
 * If unset, falls back to NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 * (only works if that project is the clock-in DB with `sushi_orders` + RLS for anon insert).
 */
const url = (
  process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  ''
).trim()
const key = (
  process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ''
).trim()

export const sushiOrdersConfigured = !!(url && key)

let client: SupabaseClient | null = null
function getClient(): SupabaseClient | null {
  if (!url || !key) return null
  if (!client) client = createClient(url, key)
  return client
}

export async function insertSushiOrder(row: {
  name: string
  email: string
  phone: string
  details: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const sb = getClient()
  if (!sb) {
    return {
      ok: false,
      error:
        'Missing Supabase URL/key. On Vercel add NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_URL and NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_ANON_KEY (same values as your clock-in app), then redeploy.',
    }
  }

  const { error } = await sb.from('sushi_orders').insert({
    name: row.name,
    email: row.email,
    phone: row.phone,
    details: row.details,
  })

  if (error) {
    return { ok: false, error: error.message }
  }
  return { ok: true }
}
