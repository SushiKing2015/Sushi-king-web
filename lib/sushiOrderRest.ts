/**
 * Insert via Supabase PostgREST (same wire format as supabase-js).
 * Surfaces real HTTP status + body when something fails.
 */

export type SushiOrderRow = {
  name: string
  email: string
  phone: string
  details: string
}

export async function insertSushiOrderRest(
  projectUrl: string,
  anonKey: string,
  row: SushiOrderRow
): Promise<{ ok: true } | { ok: false; error: string; status?: number }> {
  const base = projectUrl.replace(/\/$/, '').trim()
  const key = anonKey.trim()
  if (!base || !key) {
    return { ok: false, error: 'Missing Supabase project URL or anon key.' }
  }

  const res = await fetch(`${base}/rest/v1/sushi_orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=minimal',
    },
    // Array form is what PostgREST/Supabase examples use for inserts
    body: JSON.stringify([row]),
  })

  if (res.ok) return { ok: true }

  const text = (await res.text()).slice(0, 500)
  return {
    ok: false,
    error: text ? `${res.status} ${text}` : `${res.status} ${res.statusText}`,
    status: res.status,
  }
}
