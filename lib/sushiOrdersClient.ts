import { createClient } from '@supabase/supabase-js'

/**
 * Bulk orders must land in the clock-in Supabase (`sushi_orders`).
 *
 * - Server route `/api/sushi-order` reads `SUSHI_ORDERS_*` or `NEXT_PUBLIC_*` at request time
 *   (so your 4 env vars work even when only 2 are NEXT_PUBLIC_*).
 * - If that request fails, we fall back to a browser insert using only NEXT_PUBLIC_*.
 */

async function insertViaApi(row: {
  name: string
  email: string
  phone: string
  details: string
}): Promise<{ ok: true } | { ok: false; error: string; status?: number }> {
  if (typeof window === 'undefined') {
    return { ok: false, error: 'Not in browser' }
  }
  const url = `${window.location.origin}/api/sushi-order`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
      credentials: 'same-origin',
    })
    const payload = (await res.json().catch(() => ({}))) as { error?: string }
    if (res.ok) return { ok: true }
    return {
      ok: false,
      error:
        typeof payload.error === 'string'
          ? payload.error
          : `API error (${res.status})`,
      status: res.status,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Network error calling /api/sushi-order',
    }
  }
}

async function insertViaBrowserSupabase(row: {
  name: string
  email: string
  phone: string
  details: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ''
  ).trim()
  const supabaseKey = (
    process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''
  ).trim()

  if (!supabaseUrl || !supabaseKey) {
    return {
      ok: false,
      error:
        'Browser fallback: no NEXT_PUBLIC Supabase URL/key in the built bundle.',
    }
  }

  const sb = createClient(supabaseUrl, supabaseKey)
  const { error } = await sb.from('sushi_orders').insert(row)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function insertSushiOrder(row: {
  name: string
  email: string
  phone: string
  details: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiResult = await insertViaApi(row)
  if (apiResult.ok) return { ok: true }

  const direct = await insertViaBrowserSupabase(row)
  if (direct.ok) return { ok: true }

  return {
    ok: false,
    error: [
      `Server API: ${apiResult.error}`,
      `Direct (browser): ${direct.error}`,
    ].join(' | '),
  }
}
