import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
// Ensure Node runtime on Vercel (stable env + fetch to Supabase)
export const runtime = 'nodejs'

/**
 * Read env inside each request so Vercel always sees current Production variables
 * (avoid stale top-level reads + NEXT_PUBLIC inlining quirks).
 */
function getSushiOrdersConfig() {
  const url =
    process.env.SUSHI_ORDERS_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ''
  const key =
    process.env.SUSHI_ORDERS_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''
  let host = ''
  try {
    if (url) host = new URL(url.trim()).hostname
  } catch {
    host = '(invalid URL)'
  }
  return {
    url: url.trim(),
    key: key.trim(),
    host,
    usingDedicatedEnv: !!(
      process.env.SUSHI_ORDERS_SUPABASE_URL &&
      process.env.SUSHI_ORDERS_SUPABASE_ANON_KEY
    ),
  }
}

/** GET = safe check that production is pointed at the right Supabase (no secrets). */
export async function GET() {
  const { url, key, host, usingDedicatedEnv } = getSushiOrdersConfig()
  return NextResponse.json({
    ok: !!(url && key),
    supabaseHost: host || null,
    usingSushiOrdersEnvVars: usingDedicatedEnv,
    hint:
      'This must match the Supabase project your clock-in admin app uses. After changing env on Vercel, redeploy.',
  })
}

export async function POST(request: Request) {
  try {
    const { url: sushiOrdersUrl, key: sushiOrdersKey, host } = getSushiOrdersConfig()

    if (!sushiOrdersUrl || !sushiOrdersKey) {
      console.error(
        'Sushi order API: missing Supabase URL or anon key. Set SUSHI_ORDERS_* or NEXT_PUBLIC_* on Vercel (Production) and redeploy.'
      )
      return NextResponse.json(
        {
          error:
            'Server is not configured to save orders to the dashboard. Add SUSHI_ORDERS_SUPABASE_URL and SUSHI_ORDERS_SUPABASE_ANON_KEY (same as clock-in app Supabase) on Vercel for Production, then redeploy.',
        },
        { status: 503 }
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
        { status: 400 }
      )
    }

    const supabase = createClient(sushiOrdersUrl, sushiOrdersKey)
    const { error } = await supabase.from('sushi_orders').insert({
      name,
      email,
      phone,
      details,
    })

    if (error) {
      console.error('Sushi order insert error:', host, error.message, error.code)
      return NextResponse.json(
        {
          error: error.message,
          supabaseHost: host,
          code: error.code,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, supabaseHost: host })
  } catch (e) {
    console.error('Sushi order API error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    )
  }
}
