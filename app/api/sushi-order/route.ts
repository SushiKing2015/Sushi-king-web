import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

/** Same resolution order as your .env: dedicated sushi vars first, then site Supabase. */
function getSushiOrdersConfig() {
  const url = (
    process.env.SUSHI_ORDERS_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ''
  ).trim()
  const key = (
    process.env.SUSHI_ORDERS_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''
  ).trim()

  let host = ''
  try {
    if (url) host = new URL(url).hostname
  } catch {
    host = '(invalid URL)'
  }

  return { url, key, host }
}

export async function GET(request: Request) {
  const { url, key, host } = getSushiOrdersConfig()
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
      },
      { headers: NO_STORE }
    )
  }

  return NextResponse.json(
    {
      ok: !!(url && key),
      supabaseHost: host || null,
    },
    { headers: NO_STORE }
  )
}

export async function POST(request: Request) {
  try {
    const { url: sushiOrdersUrl, key: sushiOrdersKey, host } = getSushiOrdersConfig()

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
        { status: 500, headers: NO_STORE }
      )
    }

    return NextResponse.json({ ok: true, supabaseHost: host }, { headers: NO_STORE })
  } catch (e) {
    console.error('Sushi order API error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500, headers: NO_STORE }
    )
  }
}
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

/** Same resolution order as your .env: dedicated sushi vars first, then site Supabase. */
function getSushiOrdersConfig() {
  const url = (
    process.env.SUSHI_ORDERS_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ''
  ).trim()
  const key = (
    process.env.SUSHI_ORDERS_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUSHI_ORDERS_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''
  ).trim()

  let host = ''
  try {
    if (url) host = new URL(url).hostname
  } catch {
    host = '(invalid URL)'
  }

  return { url, key, host }
}

export async function GET() {
  const { url, key, host } = getSushiOrdersConfig()
  return NextResponse.json(
    {
      ok: !!(url && key),
      supabaseHost: host || null,
    },
    { headers: NO_STORE }
  )
}

export async function POST(request: Request) {
  try {
    const { url: sushiOrdersUrl, key: sushiOrdersKey, host } = getSushiOrdersConfig()

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
        { status: 500, headers: NO_STORE }
      )
    }

    return NextResponse.json({ ok: true, supabaseHost: host }, { headers: NO_STORE })
  } catch (e) {
    console.error('Sushi order API error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500, headers: NO_STORE }
    )
  }
}
