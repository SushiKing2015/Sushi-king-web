import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
  const dir = path.join(process.cwd(), 'public', 'images', 'poke bowl')
  try {
    const files = fs.readdirSync(dir)
    const images = files.filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    return NextResponse.json(images)
  } catch (e) {
    try {
      const alt = path.join(process.cwd(), 'public', 'images', 'Poke Bowl')
      const files = fs.readdirSync(alt)
      const images = files.filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
      return NextResponse.json(images)
    } catch {
      return NextResponse.json([])
    }
  }
}
