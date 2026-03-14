import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sushi King - Fresh Poke, Sushi, Boba',
  description: 'Fresh and tasty poke bowls, sushi, and boba drinks in Bloomington, IN',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
