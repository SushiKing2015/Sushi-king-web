import { createClient } from '@supabase/supabase-js'

type OrderRow = {
  name: string
  email: string
  phone: string
  details: string
}

/**
 * Production-safe: ask the Next server for Supabase URL + anon key (`?bootstrap=1`)
 * so inserts use the same env as `SUSHI_ORDERS_*` / server `NEXT_PUBLIC_*`, not only
 * values baked into the client bundle at build time.
 */
async function insertViaServerBootstrap(row: OrderRow): Promise<
  { ok: true } | { ok: false; error: string }
> {
  if (typeof window === 'undefined') {
    return { ok: false, error: 'Not in browser' }
  }
  const origin = window.location.origin
  try {
    const cfgRes = await fetch(`${origin}/api/sushi-order?bootstrap=1`, {
      credentials: 'same-origin',
      cache: 'no-store',
    })
    const cfg = (await cfgRes.json()) as {
      supabaseUrl?: string | null
      supabaseAnonKey?: string | null
    }
    const url = (cfg.supabaseUrl || '').trim()
    const key = (cfg.supabaseAnonKey || '').trim()
    if (!url || !key) {
      return { ok: false, error: 'Bootstrap: server returned no Supabase URL/key.' }
    }
    const sb = createClient(url, key)
    const { error } = await sb.from('sushi_orders').insert(row)
    if (error) return { ok: false, error: `Bootstrap insert: ${error.message}` }
    return { ok: true }
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error ? `Bootstrap: ${e.message}` : 'Bootstrap: network error',
    }
  }
}

async function insertViaApi(row: OrderRow): Promise<
  { ok: true } | { ok: false; error: string; status?: number }
> {
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
      cache: 'no-store',
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

async function insertViaBundledEnv(row: OrderRow): Promise<
  { ok: true } | { ok: false; error: string }
> {
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
      error: 'Bundled env: no NEXT_PUBLIC Supabase URL/key in this build.',
    }
  }

  const sb = createClient(supabaseUrl, supabaseKey)
  const { error } = await sb.from('sushi_orders').insert(row)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function insertSushiOrder(row: OrderRow): Promise<
  { ok: true } | { ok: false; error: string }
> {
  const bootstrap = await insertViaServerBootstrap(row)
  if (bootstrap.ok) return { ok: true }

  const api = await insertViaApi(row)
  if (api.ok) return { ok: true }

  const bundled = await insertViaBundledEnv(row)
  if (bundled.ok) return { ok: true }

  return {
    ok: false,
    error: [bootstrap.error, `POST: ${api.error}`, `Bundled: ${bundled.error}`].join(
      ' | '
    ),
  }
}
