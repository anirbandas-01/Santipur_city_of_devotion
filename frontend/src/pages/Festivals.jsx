import { useState, useEffect } from 'react'

export default function Festivals() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedFestival, setSelectedFestival] = useState(null)

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

  const festivals = [
    {
      id: 1,
      name: "Ras Yatra",
      category: "major",
      season: "Winter",
      duration: "3 Days",
      description: "The grandest festival celebrating Lord Krishna's divine play with the Gopis. A spectacular celebration of devotion, music, and dance that attracts thousands of pilgrims.",
      highlights: [
        "Elaborate Ras Leela performances",
        "Traditional Kirtan sessions",
        "Decorated temple processions",
        "Cultural dance competitions",
        "Community feast (Mahaprasad)"
      ],
      date: "November-December (Kartik Purnima)",
      significance: "Celebrates the divine love between Radha and Krishna, representing the soul's longing for the divine.",
      traditions: [
        "Devotees dress as Radha-Krishna",
        "24-hour continuous kirtan",
        "Traditional Bengali sweets distribution",
        "Boat decorations on nearby rivers"
      ],
      icon: "🎭",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      name: "Dol Jatra (Holi)",
      category: "major",
      season: "Spring",
      duration: "2 Days",
      description: "The festival of colors celebrating spring's arrival and Lord Krishna's playful nature. Communities come together in joyous celebration with colors, music, and dance.",
      highlights: [
        "Colorful powder (abir) celebrations",
        "Traditional Holi songs",
        "Community color fights",
        "Special Holi delicacies",
        "Cultural programs"
      ],
      date: "March (Falgun Purnima)",
      significance: "Represents the victory of good over evil and the arrival of spring, celebrating Krishna's playful spirit.",
      traditions: [
        "Early morning temple prayers",
        "Throwing colored powders",
        "Traditional drums and music",
        "Sweet preparation and sharing"
      ],
      icon: "🎨",
      color: "from-red-500 to-yellow-500"
    },
    {
      id: 3,
      name: "Rath Yatra",
      category: "major",
      season: "Summer",
      duration: "7 Days",
      description: "The chariot festival where decorated chariots carry the deities through the streets. A magnificent procession that symbolizes the divine journey.",
      highlights: [
        "Grand chariot processions",
        "Deity decorations",
        "Street performances",
        "Prasadam distribution",
        "Community participation"
      ],
      date: "June-July (Ashadh)",
      significance: "Celebrates Lord Jagannath's journey to visit devotees, symbolizing God's accessibility to all.",
      traditions: [
        "Hand-pulling decorated chariots",
        "Offering flowers and fruits",
        "Singing devotional songs",
        "Community service activities"
      ],
      icon: "🚂",
      color: "from-orange-600 to-red-600"
    },
    {
      id: 4,
      name: "Janmashtami",
      category: "other",
      season: "Monsoon",
      duration: "1 Day",
      description: "Lord Krishna's birthday celebration with midnight festivities, devotional singing, and special rituals marking the divine birth.",
      highlights: [
        "Midnight celebrations",
        "Krishna Leela performances",
        "Dahi Handi ceremonies",
        "Devotional music",
        "Special temple decorations"
      ],
      date: "August-September (Bhadra)",
      significance: "Celebrates the birth of Lord Krishna, symbolizing the divine incarnation and victory of good over evil.",
      traditions: [
        "Fasting until midnight",
        "Cradle ceremonies",
        "Jhulana (swing) decorations",
        "108 names chanting"
      ],
      icon: "👶",
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 5,
      name: "Gaura Purnima",
      category: "other",
      season: "Spring",
      duration: "1 Day",
      description: "Celebrating the appearance of Sri Chaitanya Mahaprabhu, the great saint who spread Krishna consciousness throughout Bengal.",
      highlights: [
        "Chaitanya Leela performances",
        "Sankirtan processions",
        "Community prayers",
        "Devotional discourses",
        "Traditional feast"
      ],
      date: "March (Falgun Purnima)",
      significance: "Honors Sri Chaitanya's contributions to devotional practices and the spread of Krishna consciousness.",
      traditions: [
        "Golden Gauranga processions",
        "24-hour naam sankirtan",
        "Charitable activities",
        "Community singing"
      ],
      icon: "🙏",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 6,
      name: "Durga Puja",
      category: "other",
      season: "Autumn",
      duration: "5 Days",
      description: "The grand celebration of Goddess Durga's victory over evil, featuring elaborate pandals, cultural programs, and community celebrations.",
      highlights: [
        "Artistic idol installations",
        "Cultural performances",
        "Traditional music concerts",
        "Community gatherings",
        "Bhog distribution"
      ],
      date: "September-October (Ashwin)",
      significance: "Celebrates the divine feminine power and the triumph of good over evil through Goddess Durga.",
      traditions: [
        "Elaborate pandal decorations",
        "Traditional dhak playing",
        "Anjali offerings",
        "Sindur khela ceremony"
      ],
      icon: "🏺",
      color: "from-pink-600 to-purple-600"
    }
  ]

  const filteredFestivals = festivals.filter(festival => 
    activeTab === 'all' || festival.category === activeTab
  )

  const FestivalModal = ({ festival, onClose }) => {
    if (!festival) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className={`bg-gradient-to-r ${festival.color} p-8 text-white rounded-t-3xl relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <span className="text-2xl">&times;</span>
            </button>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                {festival.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold font-serif">{festival.name}</h2>
                <p className="text-lg opacity-90">{festival.date}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">About the Festival</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{festival.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Significance</h4>
                  <p className="text-gray-600">{festival.significance}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Season</p>
                    <p className="font-semibold text-blue-700">{festival.season}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-green-700">{festival.duration}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-purple-700 capitalize">{festival.category}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Festival Highlights</h4>
                <ul className="space-y-2 mb-6">
                  {festival.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold text-gray-800 mb-3">Traditional Practices</h4>
                <ul className="space-y-2">
                  {festival.traditions.map((tradition, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2"></span>
                      <span className="text-gray-700">{tradition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Festivals & Events
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 max-w-4xl mx-auto leading-relaxed">
              Experience the vibrant celebrations that bring Santipur's spiritual heritage to life 
              through colorful festivals, devotional music, and community unity.
            </p>
          </div>
        </div>
      </div>

      {/* Festival Calendar Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
              Year-Round Celebrations
            </h2>
            <p className="text-xl text-gray-600">
              From grand chariot processions to colorful spring celebrations
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12 scroll-reveal">
            <div className="bg-gray-100 p-2 rounded-full">
              <button
                onClick={() => {
                  setActiveTab('all') 
                  setSelectedFestival(null)}}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'all' 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                All Festivals
              </button>
              <button
                onClick={() =>{
                   setActiveTab('major')
                   setSelectedFestival(null)}}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ml-2 ${
                  activeTab === 'major' 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Major Festivals
              </button>
              <button
                onClick={() =>{ 
                  setActiveTab('other')
                  setSelectedFestival(null)}}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ml-2 ${
                  activeTab === 'other' 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Other Events
              </button>
            </div>
          </div>

          {/* Festival Grid */}
          <div 
           key={activeTab}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFestivals.map((festival, index) => (
              <div
                key={festival.id}
                className="scroll-reveal bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedFestival(festival)}
              >
                <div className={`bg-gradient-to-r ${festival.color} p-6 rounded-t-2xl text-white`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                      {festival.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serif">{festival.name}</h3>
                      <p className="text-sm opacity-90">{festival.season} Festival</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">{festival.date}</p>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                    {festival.description}
                  </p>

                  <div className="flex justify-between items-center text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {festival.duration}
                    </span>
                    <button className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Participation Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Join the Celebrations
            </h2>
            <p className="text-xl text-pink-200 max-w-3xl mx-auto">
              Be part of Santipur's vibrant festival traditions and experience the joy of community celebration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🎵
              </div>
              <h3 className="text-xl font-bold mb-4">Cultural Programs</h3>
              <p className="text-pink-200">
                Participate in traditional music, dance performances, and devotional singing that bring communities together.
              </p>
            </div>

            <div className="text-center scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🤝
              </div>
              <h3 className="text-xl font-bold mb-4">Volunteer Opportunities</h3>
              <p className="text-pink-200">
                Help organize events, assist in preparations, and contribute to the smooth running of festival celebrations.
              </p>
            </div>

            <div className="text-center scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                📅
              </div>
              <h3 className="text-xl font-bold mb-4">Event Calendar</h3>
              <p className="text-pink-200">
                Stay updated with upcoming festivals, special events, and community celebrations throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
            Experience Divine Celebrations
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Immerse yourself in the spiritual joy and cultural richness of Santipur's festivals. 
            Join thousands of devotees in celebrating devotion, tradition, and community spirit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              View Festival Calendar
            </button>
            <button className="px-8 py-4 border-2 border-red-600 text-red-600 rounded-full font-semibold hover:bg-red-50 transition-all duration-300">
              Get Involved
            </button>
          </div>
        </div>
      </section>

      {/* Festival Detail Modal */}
      <FestivalModal 
        festival={selectedFestival} 
        onClose={() => setSelectedFestival(null)} 
      />
    </div>
  )
}