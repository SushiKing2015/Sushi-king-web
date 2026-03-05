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
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  The story of Sushi King begins with a journey of courage, faith, and perseverance.
                </p>
                <p>
                  In 2001, our founder immigrated to the United States from Burma in search of new opportunities. Starting a life in a new country was not easy. There were language barriers, no nearby family or relatives, no professional network, and little work experience. Despite these challenges, he remained determined to build a better future through hard work, faith, and dedication.
                </p>
                <p>
                  Soon after arriving in the United States, he began working as a contractor with Hissho Sushi. Over the next decade, he learned every aspect of the sushi business, from preparation and quality standards to customer service and operations. During those years, one dream continued to grow stronger: to one day open a restaurant of his own.
                </p>
                <p>
                  In August 2003, he married his wife, Marilyn Tial Hlei Iang. Together, they shared not only a life but also a vision. As a family grounded in faith, they prayed for the opportunity to build their own business and serve their community.
                </p>
                <p>
                  Over time, that prayer was answered. With the support and encouragement of the Indiana University Dining leadership team in Bloomington, Indiana, the opportunity finally arrived.
                </p>
                <p>
                  In the last week of August 2015, Sushi King opened its doors in the heart of Indiana University. What began as a dream built through years of dedication became a reality through faith, perseverance, and the support of the community.
                </p>
                <p>
                  The journey continued to grow. In 2024, Sushi King expanded with a Poke Bowl and Boba Tea concept located inside the Kelley School of Business at Indiana University. In 2025, the Sushi King family expanded once again with another location at Read Hall, continuing its mission of bringing fresh, high quality sushi and welcoming hospitality to the Indiana University community.
                </p>
                <p>
                  Today, Sushi King remains a family driven business rooted in faith, gratitude, and service. We are thankful for the opportunities we have received and for the community that continues to support us.
                </p>
                <p className="pt-2">
                  As the Bible reminds us:
                </p>
                <blockquote className="border-l-4 border-navy-light pl-6 py-2 italic text-navy">
                  &quot;Seek first the kingdom of God and His righteousness, and all these things will be added to you.&quot;
                  <cite className="block mt-2 not-italic text-base text-gray-600">Matthew 6:33</cite>
                </blockquote>
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




