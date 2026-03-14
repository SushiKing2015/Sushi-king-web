'use client'

import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'

const POKE_BOWL_BASE = '/images/poke%20bowl/'

export default function PokeBowls() {
  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/poke-bowls')
      .then((r) => r.json())
      .then((data) => (Array.isArray(data) ? setFiles(data) : setFiles([])))
      .catch(() => setFiles([]))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <NavBar active="POKE BOWLS" />

      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[400px] bg-white">
        <div className="absolute inset-0 wave-bg"></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8">
              POKE BOWLS
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fresh, healthy, and delicious poke bowls made with the finest ingredients
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {files.map((filename, index) => {
              const name = filename.replace(/\.(jpg|jpeg|png)$/i, '')
              const src = POKE_BOWL_BASE + encodeURIComponent(filename)
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={src} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-navy">{name}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="bg-navy text-white py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">125 Eagleson Ave</span>
            </div>
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
