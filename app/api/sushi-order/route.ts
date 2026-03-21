import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// Use clockin-out Supabase for sushi orders (same DB as admin dashboard)
// Set SUSHI_ORDERS_SUPABASE_URL and SUSHI_ORDERS_SUPABASE_ANON_KEY in .env.local
// If same as main Supabase, you can use NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
const sushiOrdersUrl =
  (process.env.SUSHI_ORDERS_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) ?? ''
const sushiOrdersKey =
  (process.env.SUSHI_ORDERS_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ?? ''

export async function POST(request: Request) {
  try {
    if (!sushiOrdersUrl || !sushiOrdersKey) {
      console.error(
        'Sushi order API: missing Supabase URL or anon key. Set SUSHI_ORDERS_SUPABASE_URL + SUSHI_ORDERS_SUPABASE_ANON_KEY (or NEXT_PUBLIC_*) on Vercel / .env.local.'
      )
      return NextResponse.json(
        {
          error:
            'Server is not configured to save orders to the dashboard. Add SUSHI_ORDERS_SUPABASE_URL and SUSHI_ORDERS_SUPABASE_ANON_KEY (same as clock-in app Supabase).',
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
      console.error('Sushi order insert error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Sushi order API error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    )
  }
}
