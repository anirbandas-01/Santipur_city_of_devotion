import { useState, useEffect } from 'react'

export default function Temples() {
  const [activeTemple, setActiveTemple] = useState(0)

  useEffect(() => {
    // Scroll reveal animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])

  const temples = [
    {
      id: 1,
      name: "Advaita Acharya Temple",
      period: "16th Century",
      deity: "Lord Krishna & Advaita Acharya",
      description: "The most sacred temple of Santipur, dedicated to Advaita Acharya, one of the principal associates of Sri Chaitanya Mahaprabhu. This ancient temple stands as a testament to the rich Vaishnava heritage of the region.",
      specialFeatures: [
        "Original samadhi of Advaita Acharya",
        "Ancient stone carvings and sculptures",
        "Daily kirtan and aarti ceremonies",
        "Pilgrimage destination for Vaishnavas worldwide"
      ],
      festivals: ["Janmashtami", "Advaita Jayanti", "Gaura Purnima"],
      architecture: "Traditional Bengali temple architecture with terracotta work",
      image: "🏛️"
    },
    {
      id: 2,
      name: "Madana Gopala Temple",
      period: "17th Century", 
      deity: "Madana Gopala (Krishna)",
      description: "A beautiful temple housing the deity of Madana Gopala, known for its exquisite Bengal architectural style and peaceful atmosphere that attracts devotees seeking spiritual solace.",
      specialFeatures: [
        "Intricate terracotta panels",
        "Beautiful gardens surrounding the temple",
        "Traditional oil lamp lighting system",
        "Ancient manuscripts preserved in temple library"
      ],
      festivals: ["Rash Utsav", "Kali Puja", "Dol Jatra"],
      architecture: "Ratna style with multiple spires and ornate decorations",
      image: "🕌"
    },
    {
      id: 3,
      name: "Gopal Jiu Temple",
      period: "18th Century",
      deity: "Gopal Jiu (Young Krishna)",
      description: "This temple is renowned for its elaborate festivals and community gatherings. It serves as a cultural center where traditional music, dance, and devotional practices flourish.",
      specialFeatures: [
        "Large prayer hall for community gatherings",
        "Traditional dhol and khol instruments",
        "Weekly cultural programs",
        "Community kitchen serving prasadam"
      ],
      festivals: ["Holi", "Janmashtami", "Kartik Puja"],
      architecture: "Modern renovation while preserving traditional elements",
      image: "🏮"
    },
    {
      id: 4,
      name: "Nityananda Temple",
      period: "16th Century",
      deity: "Lord Nityananda",
      description: "Dedicated to Lord Nityananda, the eternal companion of Sri Chaitanya. This temple is known for its spiritual atmosphere and the regular chanting of the holy names.",
      specialFeatures: [
        "Sacred tulsi garden",
        "Original stone deities",
        "Continuous nama-sankirtan tradition",
        "Ancient palm leaf manuscripts"
      ],
      festivals: ["Nityananda Trayodashi", "Gaura Purnima", "Ratha Yatra"],
      architecture: "Simple yet elegant traditional Bengali style",
      image: "⛩️"
    }
  ]

  const templeTimings = [
    { time: "5:00 AM", activity: "Mangal Aarti" },
    { time: "8:00 AM", activity: "Bhog Offering" },
    { time: "12:00 PM", activity: "Raj Bhog" },
    { time: "6:00 PM", activity: "Sandhya Aarti" },
    { time: "8:00 PM", activity: "Shayan Aarti" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Sacred Temples of Santipur
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
              Journey through centuries of devotion and discover the spiritual heart of Bengal, 
              where ancient temples stand as eternal witnesses to divine love and devotion.
            </p>
          </div>
        </div>
      </div>

      {/* Temple Overview Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🏛️</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">12+</h3>
              <p className="text-gray-600">Ancient Temples</p>
            </div>
            <div className="text-center scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">📅</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Years of Heritage</p>
            </div>
            <div className="text-center scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎪</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">25+</h3>
              <p className="text-gray-600">Annual Festivals</p>
            </div>
            <div className="text-center scroll-reveal" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">👥</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">1000+</h3>
              <p className="text-gray-600">Daily Visitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Temples Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
              Sacred Temples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each temple tells a unique story of devotion, architecture, and spiritual heritage
            </p>
          </div>

          {/* Temple Cards */}
          <div className="space-y-16">
            {temples.map((temple, index) => (
              <div 
                key={temple.id}
                className={`scroll-reveal grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-reverse' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Temple Image/Icon */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl h-80 flex items-center justify-center">
                    <span className="text-8xl opacity-70">{temple.image}</span>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-amber-600 text-white px-4 py-2 rounded-full font-semibold">
                    {temple.period}
                  </div>
                </div>

                {/* Temple Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-3">
                      {temple.name}
                    </h3>
                    <p className="text-lg text-amber-600 font-semibold mb-4">
                      Dedicated to: {temple.deity}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {temple.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Special Features:</h4>
                    <ul className="space-y-2">
                      {temple.specialFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Architecture:</h4>
                      <p className="text-gray-600">{temple.architecture}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Major Festivals:</h4>
                      <div className="flex flex-wrap gap-2">
                        {temple.festivals.map((festival, idx) => (
                          <span key={idx} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                            {festival}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temple Timings Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
                Daily Temple Timings
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the rhythm of devotional life with our daily prayer schedule
              </p>
              
              <div className="space-y-4">
                {templeTimings.map((timing, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{timing.time.split(' ')[1]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{timing.activity}</p>
                        <p className="text-sm text-gray-600">{timing.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-8 rounded-3xl text-white text-center">
                <div className="text-6xl mb-6">🙏</div>
                <h3 className="text-2xl font-bold font-serif mb-4">Visitor Guidelines</h3>
                <ul className="space-y-3 text-left text-amber-100">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 mt-1">•</span>
                    <span>Dress modestly and remove shoes before entering</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 mt-1">•</span>
                    <span>Photography may be restricted in certain areas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 mt-1">•</span>
                    <span>Maintain silence during prayer times</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 mt-1">•</span>
                    <span>Participate respectfully in communal activities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 mt-1">•</span>
                    <span>Donations are welcome but not mandatory</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Impact Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="scroll-reveal mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Cultural & Spiritual Impact
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              These temples serve as more than places of worship - they are centers of culture, learning, and community unity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-4">Educational Hub</h3>
                <p className="text-blue-200">
                  Traditional schools and libraries preserve ancient texts and teachings for future generations.
                </p>
              </div>
            </div>

            <div className="scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-bold mb-4">Cultural Center</h3>
                <p className="text-blue-200">
                  Regular cultural programs showcase classical music, dance, and dramatic performances.
                </p>
              </div>
            </div>

            <div className="scroll-reveal" style={{animationDelay: '0.3s'}}>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-4">Community Service</h3>
                <p className="text-blue-200">
                  Temples organize charitable activities, free meals, and support for the needy in the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
            Plan Your Sacred Journey
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Experience the divine atmosphere and rich heritage of Santipur's ancient temples. 
            Join us in preserving this spiritual legacy for future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105">
              Plan Your Visit
            </button>
            <button className="px-8 py-4 border-2 border-amber-600 text-amber-600 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300">
              Join Our Community
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}