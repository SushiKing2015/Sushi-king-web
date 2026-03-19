'use client'

import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import { supabase } from '@/lib/supabase'
import type { FeedbackRow } from '@/lib/supabase'

export default function Home() {
  const [feedbackList, setFeedbackList] = useState<FeedbackRow[]>([])

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from('feedback').select('id, name, stars, feedback_text, created_at').order('created_at', { ascending: false }).limit(20)
        setFeedbackList(data ?? [])
      } catch {
        setFeedbackList([])
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Hero Section with Wave Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[600px] bg-white">
        {/* Wave Background */}
        <div className="absolute inset-0 wave-bg"></div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          {/* Hero Text - Centered */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8">
              FRESH POKE, SUSHI, BOBA
            </h1>
            
            {/* CTA Button */}
            <a 
              href="/locations"
              className="bg-navy-light hover:bg-navy text-white font-semibold py-3 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 inline-block"
            >
              VISIT US
            </a>
          </div>

          {/* Food Images - Spread to extreme edges */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
            {/* Poke Bowl - Very Left */}
            <img 
              src="/images/poke_image.png" 
              alt="Poke Bowl" 
              className="max-h-96"
            />

            {/* Matcha Boba Drink - Center */}
            <img 
              src="/images/matcha111.png" 
              alt="Matcha Boba Drink" 
              className="max-h-96"
            />

            {/* Sushi Plate - Very Right */}
            <img 
              src="/images/sushi_image.png" 
              alt="Sushi Plate" 
              className="max-h-96"
            />
          </div>
        </div>
      </section>

      {/* Customer Feedback - left to right cards */}
      {feedbackList.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy text-center mb-10">What Our Customers Say</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 max-w-7xl mx-auto">
              {feedbackList.map((row) => (
                <div key={row.id ?? `fb-${row.name}-${row.created_at ?? ''}`} className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-navy">{row.name}</span>
                    <span className="text-amber-400">{'★'.repeat(row.stars)}{'☆'.repeat(5 - row.stars)}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{row.feedback_text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
            {/* Left Location */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">125 Eagleson Ave</span>
            </div>

            {/* Right Location */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">1309 E 10th St</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
