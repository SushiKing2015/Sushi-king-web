import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const stars = typeof body.stars === 'number' ? body.stars : Number(body.stars)
    const feedback_text = typeof body.feedback_text === 'string' ? body.feedback_text.trim() : ''

    if (!name || !email || !feedback_text || stars < 1 || stars > 5) {
      return NextResponse.json(
        { error: 'Missing or invalid fields: name, email, stars (1–5), feedback_text required' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('feedback').insert({
      name,
      email,
      stars,
      feedback_text,
    })

    if (error) {
      console.error('Supabase feedback insert error:', error.message, error.details)
      return NextResponse.json(
        { error: error.message || 'Database error' },
        { status: 500 }
      )
    }

    // If 200+ feedbacks, keep only the newest 100 (delete oldest 100)
    const { count } = await supabase.from('feedback').select('*', { count: 'exact', head: true })
    if (count != null && count >= 200) {
      const { data: oldest } = await supabase
        .from('feedback')
        .select('id')
        .order('created_at', { ascending: true })
        .limit(100)
      const ids = (oldest ?? []).map((r) => r.id).filter(Boolean)
      if (ids.length > 0) {
        await supabase.from('feedback').delete().in('id', ids)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Feedback API error:', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    )
  }
}
