'use client'

import NavBar from '@/components/NavBar'

export default function Boba() {
  const bobaDrinks = [
    { name: "Classic Bubble Tea", calories: 250, image: "Classic Bubble Tea.png" },
    { name: "Taro Milk Tea", calories: 280, image: "Taro Bubble Tea.png" },
    { name: "Mango Green Tea", calories: 240, image: "Mango Green Tea.png" },
    { name: "Passion Fruit Tea", calories: 210, image: "Passion Fruit Green Tea.png" },
    { name: "Lychee Black Tea", calories: 220, image: "Lychee Green Tea.png" },
    { name: "Matcha Latte", calories: 220, image: "Matcha Green Tea.png" },
    { name: "Lemon Green Tea", calories: 200, image: "Lemon Green Tea.png" },
    { name: "Coconut Bubble Tea", calories: 270, image: "Coconut Bubble Tea.png" },
    { name: "Strawberry Green Tea", calories: 230, image: "Strawberry Green Tea.png" }
  ]

  return (
    <div className="min-h-screen bg-white">
      <NavBar active="BOBA" />

      {/* Hero Section with Wave Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[400px] bg-white">
        {/* Wave Background */}
        <div className="absolute inset-0 wave-bg"></div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          {/* Hero Text - Centered */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8">
              BOBA DRINKS
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Refreshing boba drinks with premium tea and chewy tapioca pearls
            </p>
          </div>
        </div>
      </section>

      {/* Boba Drinks Grid */}
      <section className="py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {bobaDrinks.map((drink, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden flex items-center justify-center bg-gray-50">
                  <img 
                    src={`/images/${drink.image}`}
                    alt={drink.name}
                    className="w-full h-full object-contain scale-150"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-navy mb-2">{drink.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left Location - Very Left */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">125 Eagleson Ave</span>
            </div>

            {/* Right Location - Very Right */}
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




