import { NextResponse } from 'next/server'
import { insertSushiOrderRest } from '@/lib/sushiOrderRest'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

function firstEnv(
  chain: { name: string; value: string | undefined }[]
): { value: string; name: string | null } {
  for (const { name, value } of chain) {
    const v = (value ?? '').trim()
    if (v) return { value: v, name }
  }
  return { value: '', name: null }
}

/**
 * Same resolution order as .env: dedicated sushi vars first, then site Supabase.
 * On Vercel, `.env.local` is NOT deployed — only Project → Environment Variables count.
 * If dev uses SUSHI_ORDERS_* in .env.local but Production only has NEXT_PUBLIC_SUPABASE_*,
 * local inserts go to the clock-in DB and production may insert a different/wrong project.
 */
function getSushiOrdersConfig() {
  const urlRes = firstEnv([
    { name: 'SUSHI_ORDERS_SUPABASE_URL', value: process.env.SUSHI_ORDERS_SUPABASE_URL },
    {
      name: 'NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_URL',
      value: process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_URL,
    },
    { name: 'NEXT_PUBLIC_SUPABASE_URL', value: process.env.NEXT_PUBLIC_SUPABASE_URL },
  ])
  const keyRes = firstEnv([
    { name: 'SUSHI_ORDERS_SUPABASE_ANON_KEY', value: process.env.SUSHI_ORDERS_SUPABASE_ANON_KEY },
    {
      name: 'NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_ANON_KEY',
      value: process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_ANON_KEY,
    },
    { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
  ])

  const url = urlRes.value
  const key = keyRes.value

  let host = ''
  try {
    if (url) host = new URL(url).hostname
  } catch {
    host = '(invalid URL)'
  }

  return {
    url,
    key,
    host,
    urlFromEnv: urlRes.name,
    keyFromEnv: keyRes.name,
  }
}

export async function GET(request: Request) {
  const { url, key, host, urlFromEnv, keyFromEnv } = getSushiOrdersConfig()
  const bootstrap = new URL(request.url).searchParams.get('bootstrap') === '1'

  if (bootstrap) {
    // Anon key is public by design; RLS must protect data. Lets the live site use the
    // exact same URL/key as the server (SUSHI_ORDERS_*), not only what was baked into JS.
    return NextResponse.json(
      {
        ok: !!(url && key),
        supabaseHost: host || null,
        supabaseUrl: url || null,
        supabaseAnonKey: key || null,
        urlFromEnv,
        keyFromEnv,
        envMismatch:
          urlFromEnv && keyFromEnv && urlFromEnv.replace(/_ANON_KEY$|_URL$/, '') !==
            keyFromEnv.replace(/_ANON_KEY$|_URL$/, '')
            ? 'URL and anon key were resolved from different env vars — fix Vercel env.'
            : null,
      },
      { headers: NO_STORE }
    )
  }

  return NextResponse.json(
    {
      ok: !!(url && key),
      supabaseHost: host || null,
      /** Which env var supplied the URL (no secrets). Compare prod vs local. */
      urlFromEnv,
      keyFromEnv,
      envMismatch:
        urlFromEnv && keyFromEnv && urlFromEnv.replace(/_ANON_KEY$|_URL$/, '') !==
          keyFromEnv.replace(/_ANON_KEY$|_URL$/, '')
          ? 'URL and anon key were resolved from different env vars — fix Vercel env.'
          : null,
      hint:
        'If rows appear in dev but not on Vercel, open this URL on both and compare supabaseHost + urlFromEnv. .env.local is not deployed.',
    },
    { headers: NO_STORE }
  )
}

export async function POST(request: Request) {
  try {
    const {
      url: sushiOrdersUrl,
      key: sushiOrdersKey,
      host,
      urlFromEnv,
      keyFromEnv,
    } = getSushiOrdersConfig()

    if (!sushiOrdersUrl || !sushiOrdersKey) {
      console.error('Sushi order API: missing Supabase URL or anon key in server environment.')
      return NextResponse.json(
        { error: 'Server missing Supabase URL or anon key for sushi orders.' },
        { status: 503, headers: NO_STORE }
      )
    }

    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const details = typeof body.details === 'string' ? body.details.trim() : ''

    if (!name || !email || !phone || !details) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, details' },
        { status: 400, headers: NO_STORE }
      )
    }

    const ins = await insertSushiOrderRest(sushiOrdersUrl, sushiOrdersKey, {
      name,
      email,
      phone,
      details,
    })

    if (!ins.ok) {
      console.error('Sushi order REST insert error:', host, ins.error, ins.status)
      return NextResponse.json(
        {
          error: ins.error,
          supabaseHost: host,
          status: ins.status,
        },
        { status: ins.status && ins.status >= 400 && ins.status < 600 ? ins.status : 500, headers: NO_STORE }
      )
    }

    return NextResponse.json(
      {
        ok: true,
        supabaseHost: host,
        urlFromEnv,
        keyFromEnv,
      },
      { headers: NO_STORE }
    )
  } catch (e) {
    console.error('Sushi order API error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500, headers: NO_STORE }
    )
  }
}
