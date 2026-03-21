'use client'

import { useState } from 'react'
import NavBar from '@/components/NavBar'
import { insertSushiOrder } from '@/lib/sushiOrdersClient'

export default function Sushi() {
  const [showBulkOrder, setShowBulkOrder] = useState(false)

  const sushiItems = [
    { name: "California Roll", calories: 255, image: "California roll.jpg" },
    { name: "Cream Cheese Roll", calories: 280, image: "Cream Cheese roll.jpg" },
    { name: "Crispy Crab", calories: 220, image: "Crispy crab.jpg" },
    { name: "Crispy Lover Roll", calories: 300, image: "Crispy lover roll.jpg" },
    { name: "Eel Roll", calories: 310, image: "Eel roll.jpg" },
    { name: "Fischado Roll", calories: 290, image: "Fischado roll.jpg" },
    { name: "Inari Combo Roll", calories: 180, image: "Inari combo roll.jpg" },
    { name: "King Favourite Roll", calories: 350, image: "King Favourite roll.jpg" },
    { name: "King Salad Roll", calories: 160, image: "King salad roll.jpg" },
    { name: "Salmon Roll", calories: 270, image: "Salmon roll.jpg" },
    { name: "Seaweed Salad", calories: 120, image: "Seaweed salad.jpg" },
    { name: "Smoked Salmon Roll", calories: 290, image: "Smoked Salmon roll.jpg" },
    { name: "Spicy California Roll", calories: 275, image: "Spicy california roll.jpg" },
    { name: "Spicy Inary", calories: 200, image: "Spicy Inary.jpg" },
    { name: "Spicy Shrimp Roll", calories: 320, image: "Spicy Shrimp roll.jpg" },
    { name: "Trio Roll", calories: 340, image: "Trio roll.jpg" },
    { name: "Tuna Roll", calories: 260, image: "Tuna roll.jpg" },
    { name: "Veggie Roll", calories: 160, image: "Veggie roll.jpg" },
    { name: "Nigiri Roll", calories: 220, image: "Nigiri roll.jpeg" },
    { name: "Squid Salad", calories: 130, image: "Squid salad.jpeg" },
    { name: "King Mini Combo", calories: 0, image: "King Mini Combo.jpeg" },
    { name: "King Deluxe Combo", calories: 0, image: "King Deluxe Combo.jpeg" },
    { name: "Mountain Roll", calories: 0, image: "Mountain Roll.jpeg" },
    { name: "Deluxe Moon Roll", calories: 0, image: "Deluxe Moon Roll.jpeg" },
    { name: "Party Tray", calories: 0, image: "Party tray1.jpeg" },
    { name: "Party Tray", calories: 0, image: "Party tray2.jpeg" },
    { name: "Party Tray", calories: 0, image: "Party tray3.jpeg" },
    { name: "Party Tray", calories: 0, image: "Party tray4.jpeg" }
  ]

  const sushiLocations = [
    "Kelly School of business 1315 E 10th St Bloomington, IN 47405",
    "School of business 2931 E 10th St Bloomington In 47405",
    "Bookmarket Eatery 1320 E 10th St Bloomington In 47405",
    "McNutt C store 1101 N. Fee Lane Bloomington IN 47405",
    "Briscoe C-Store 1225 N Fee Lane Bloomington IN 47405",
    "Union Street 10th and Union St Bloomington In 47405",
    "Ballentine Cafe 2931 E 10th St Bloomington In 47405",
    "Art Shop at Eskenazi 1201 E 7th ST Room 007 Bloomington IN 47405",
    "School of ED Cafe: 1160, 201 N Rose Ave, Bloomington In 47405",
    "IMU  Gift Shop: 900 E 7th St Bloomington, IN 47405",
    "Bloomingfood East 3220 e 3RD sT bLOOMINGTON in 47401",
    "Bloomingfood West 316 W 6th St Bloomington IN 47404"
  ]

  return (
    <div className="min-h-screen bg-white">
      <NavBar active="SUSHI" />

      {/* Hero Section with Wave Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-[400px] bg-white">
        {/* Wave Background */}
        <div className="absolute inset-0 wave-bg"></div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          {/* Hero Text - Centered */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-8">
              SUSHI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Authentic Japanese sushi made with the freshest ingredients and traditional techniques
            </p>
            <button 
              onClick={() => setShowBulkOrder(true)}
              className="bg-navy-light hover:bg-navy text-white font-semibold py-3 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
            >
              Order in Bulk
            </button>
          </div>
        </div>
      </section>

      {/* Sushi Locations */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy text-center mb-8">Available at These Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sushiLocations.map((location, index) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <svg className="w-5 h-5 text-navy mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sushi Grid */}
      <section className="py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {sushiItems.map((sushi, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden flex items-center justify-center bg-gray-50">
                  <img 
                    src={`/images/${sushi.image}`}
                    alt={sushi.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-navy mb-2">{sushi.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Order Modal */}
      {showBulkOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-navy mb-4">Bulk Order Form</h3>
            <p className="text-gray-600 mb-6">
              Bulk sushi orders start from $250. Please fill out the form below and we&apos;ll get back to you with pricing and availability.
            </p>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                const name = String(data.get("name") ?? "").trim();
                const email = String(data.get("email") ?? "").trim();
                const phone = String(data.get("phone") ?? "").trim();
                const details = String(data.get("details") ?? "").trim();

                // Save to admin dashboard: insert from browser (works on Vercel; uses NEXT_PUBLIC_* Supabase)
                const dashboardResult = await insertSushiOrder({
                  name,
                  email,
                  phone,
                  details,
                })
                const dashboardSaveFailed = !dashboardResult.ok
                const dashboardErrorMessage = !dashboardResult.ok
                  ? dashboardResult.error
                  : ''

                const FORM_ID = "1FAIpQLScMpCFZhbZy035xrPMp3n68z4mvO6SJRQMcxP5o6NeLBnmqSA";
                const ENTRY_NAME = "entry.1270743351";
                const ENTRY_EMAIL = "entry.2004462391"; 
                const ENTRY_PHONE = "entry.1077607953";
                const ENTRY_DETAILS = "entry.35698300";

                const params = new URLSearchParams({
                  [ENTRY_NAME]: name,
                  [ENTRY_EMAIL]: email,
                  [ENTRY_PHONE]: phone,
                  [ENTRY_DETAILS]: details,
                });

                const submitUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse?${params.toString()}`;
                
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.style.visibility = 'hidden';
                iframe.style.position = 'absolute';
                iframe.style.left = '-9999px';
                iframe.style.top = '-9999px';
                iframe.style.width = '0';
                iframe.style.height = '0';
                iframe.style.border = 'none';
                iframe.src = submitUrl;
                document.body.appendChild(iframe);
                
                setTimeout(() => {
                  try {
                    document.body.removeChild(iframe);
                  } catch (e) {}
                }, 3000);

                if (dashboardSaveFailed) {
                  alert(
                    `Your request was sent (you may still get an email confirmation).\n\n` +
                      `It did not save to the admin Sushi Orders list:\n${dashboardErrorMessage}`
                  )
                } else {
                  alert("Thanks! Your bulk order request has been sent. We'll reach out shortly.")
                }
                form.reset();
                setShowBulkOrder(false);
              }}
              className="space-y-4"
            >
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-light"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-light"
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-light"
              />
              <textarea 
                name="details" 
                placeholder="Sushi Order Details" 
                rows={4}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-light"
              ></textarea>
              <div className="flex space-x-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowBulkOrder(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-navy-light hover:bg-navy text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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




