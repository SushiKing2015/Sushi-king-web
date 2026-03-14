'use client'

import NavBar from '@/components/NavBar'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar active="ABOUT" />

      {/* Hero Section with Wave Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-screen bg-white">
        {/* Wave Background */}
        <div className="absolute inset-0 wave-bg"></div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Story */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-4">
                ABOUT US
              </h1>
              <h2 className="text-xl md:text-2xl text-navy-light font-semibold mb-8">
                A Journey of Faith, Family, and Dreams
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify">
                <p>
                  The story of Sushi King begins with a journey of courage, faith, and perseverance.
                </p>
                <p>
                  In 2001, our founder arrived in the United States from Burma in search of new opportunities. Starting life in a new country was not easy. There were language barriers, no nearby family or relatives, no professional network, and little work experience. Despite these challenges, he remained determined to build a better future through hard work, faith, and dedication.
                </p>
                <p>
                  Sushi King began with a passion for the craft of sushi making and a vision to share fresh, high quality food with the Bloomington community.
                </p>
                <p>
                  For many years before opening our first location, sushi was carefully prepared and delivered to grocery stores across the community. Those early years built the experience, discipline, and dedication that would later shape Sushi King.
                </p>
                <p>
                  In August 2003, the founder married his wife, Marilyn Tial Hlei Iang. Together they shared not only a life but also a vision. As a family grounded in faith, they prayed for the opportunity to build their own business and serve their community.
                </p>
                <p>
                  In August 2015, that vision became reality when Sushi King opened its first location in Bloomington, and sushi soon became available at Indiana University and more than 20 locations.
                </p>
                <p>
                  Since then, Sushi King has continued to grow with the IU community. In August 2023, we expanded with a Poke Bowl and Boba Tea concept inside the Kelley School of Business. In 2025, another Sushi King location opened at Read Hall.
                </p>
                <p>
                  Sushi King is a true family journey, inspired by their three children: Chris Bawithawng Lian, Joshua Bawihlei Sang, and Caleb Bawivel Lian.
                </p>
                <p>
                  Today, we continue to serve fresh sushi and deliver a welcoming experience to the Indiana University and Bloomington community.
                </p>
              </div>
              
              <button className="mt-8 bg-navy-light hover:bg-navy text-white font-semibold py-3 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105">
                Our Story
              </button>
            </div>

            {/* Right Side - Founder Images */}
            <div className="space-y-8">
              <div className="rounded-lg shadow-lg overflow-hidden h-80 bg-gray-100">
                <img
                  src="/images/Founder%201.jpeg"
                  alt="Founder 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg shadow-lg overflow-hidden h-80 bg-gray-100">
                <img
                  src="/images/Founder%202.png"
                  alt="Founder 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
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




