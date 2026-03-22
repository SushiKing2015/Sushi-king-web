import { insertSushiOrderRest, type SushiOrderRow } from '@/lib/sushiOrderRest'

async function insertViaApi(row: SushiOrderRow): Promise<
  { ok: true } | { ok: false; error: string }
> {
  if (typeof window === 'undefined') {
    return { ok: false, error: 'Not in browser' }
  }
  try {
    const res = await fetch(`${window.location.origin}/api/sushi-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
      credentials: 'same-origin',
      cache: 'no-store',
    })
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('application/json')) {
      const t = (await res.text()).slice(0, 200)
      return {
        ok: false,
        error: `POST /api/sushi-order returned non-JSON (${res.status}): ${t}`,
      }
    }
    const payload = (await res.json()) as { error?: string; ok?: boolean }
    if (!res.ok) {
      return {
        ok: false,
        error:
          typeof payload.error === 'string'
            ? payload.error
            : `POST API ${res.status}`,
      }
    }
    // Do not trust HTTP 200 alone (proxies / wrong routes can return HTML pages mis-parsed as JSON).
    if (payload.ok === true) return { ok: true }
    return {
      ok: false,
      error:
        typeof payload.error === 'string'
          ? payload.error
          : `API 200 but missing ok:true (got: ${JSON.stringify(payload).slice(0, 120)})`,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'POST /api/sushi-order failed',
    }
  }
}

/**
 * Load URL + key from the Next server (reads SUSHI_ORDERS_* first), then insert via REST from the browser.
 */
async function insertViaBootstrapRest(row: SushiOrderRow): Promise<
  { ok: true } | { ok: false; error: string }
> {
  if (typeof window === 'undefined') {
    return { ok: false, error: 'Not in browser' }
  }
  try {
    const cfgRes = await fetch(
      `${window.location.origin}/api/sushi-order?bootstrap=1`,
      { credentials: 'same-origin', cache: 'no-store' }
    )
    const ct = cfgRes.headers.get('content-type') || ''
    if (!ct.includes('application/json')) {
      const t = (await cfgRes.text()).slice(0, 200)
      return {
        ok: false,
        error: `Bootstrap config not JSON (${cfgRes.status}): ${t}`,
      }
    }
    const cfg = (await cfgRes.json()) as {
      supabaseUrl?: string | null
      supabaseAnonKey?: string | null
      supabaseHost?: string | null
    }
    const url = (cfg.supabaseUrl || '').trim()
    const key = (cfg.supabaseAnonKey || '').trim()
    if (!url || !key) {
      return {
        ok: false,
        error: `Bootstrap: empty URL/key (host: ${cfg.supabaseHost ?? 'unknown'})`,
      }
    }
    const ins = await insertSushiOrderRest(url, key, row)
    if (ins.ok) return { ok: true }
    return {
      ok: false,
      error: `Bootstrap REST → ${cfg.supabaseHost ?? new URL(url).hostname}: ${ins.error}`,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Bootstrap failed',
    }
  }
}

async function insertViaBundledRest(row: SushiOrderRow): Promise<
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
    return { ok: false, error: 'No NEXT_PUBLIC Supabase URL/key in bundle.' }
  }

  const ins = await insertSushiOrderRest(supabaseUrl, supabaseKey, row)
  if (ins.ok) return { ok: true }
  return {
    ok: false,
    error: `Bundled NEXT_PUBLIC (${new URL(supabaseUrl).hostname}): ${ins.error}`,
  }
}

/**
 * Order: (1) server API — one hop, uses SUSHI_ORDERS_* on the server.
 * (2) bootstrap + browser REST — same creds as server if (1) missing/broken.
 * (3) NEXT_PUBLIC_* REST — last resort (your NEXT_PUBLIC_* is a different project than SUSHI_ORDERS_*).
 */
export async function insertSushiOrder(
  row: SushiOrderRow
): Promise<{ ok: true } | { ok: false; error: string }> {
  const api = await insertViaApi(row)
  if (api.ok) return { ok: true }

  const boot = await insertViaBootstrapRest(row)
  if (boot.ok) return { ok: true }

  const bundled = await insertViaBundledRest(row)
  if (bundled.ok) return { ok: true }

  return {
    ok: false,
    error: [`1) ${api.error}`, `2) ${boot.error}`, `3) ${bundled.error}`].join(
      '\n'
    ),
  }
}
