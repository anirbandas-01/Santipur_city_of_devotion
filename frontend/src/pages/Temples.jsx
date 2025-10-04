import { useState, useEffect } from 'react'

// Enhanced Temple data with full descriptions and features
const allTemples = [
  {
    id: 1,
    name: "Boro Goswami Bari",
    image: "🏛️",
    shortDesc: "One of the oldest and most prominent Goswami families' temple in Santipur, maintaining centuries of unbroken devotional traditions and spiritual teachings.",
    fullDesc: "Boro Goswami Bari stands as a testament to centuries of devotional tradition in Santipur. This ancient temple complex has been the spiritual home of one of the most respected Goswami families, maintaining unbroken lineages of worship and scholarship. The temple features traditional Bengali architecture with intricate terracotta work and a peaceful courtyard where devotees gather for daily kirtans and spiritual discussions.",
    period: "16th Century",
    category: "radhakrishna",
    specialFeatures: [
      "Ancient family lineage of spiritual teachers",
      "Daily kirtan and bhajan sessions",
      "Traditional manuscript library",
      "Annual Ras Yatra celebrations"
    ],
    gallery: ["🏛️", "📿", "🕉️", "🎭", "📚", "🌺"]
  },
  {
    id: 2,
    name: "Khan Bari Temple",
    image: "🕌",
    shortDesc: "Historic temple complex with beautiful architecture, preserving centuries of devotional traditions and hosting grand festival celebrations throughout the year.",
    fullDesc: "Khan Bari Temple is renowned for its unique architectural blend and rich historical significance. The temple complex showcases the harmonious coexistence of different cultural influences while maintaining its core spiritual identity. The main shrine houses beautifully adorned deities, and the temple is known for its elaborate festival celebrations that draw devotees from far and wide.",
    period: "17th Century",
    category: "radhakrishna",
    specialFeatures: [
      "Unique architectural fusion",
      "Grand festival celebrations",
      "Community prayer hall",
      "Traditional prasadam distribution"
    ],
    gallery: ["🕌", "🌺", "🪔", "🎪", "🎨", "🌟"]
  },
  {
    id: 3,
    name: "Pagla Bari",
    image: "🏮",
    shortDesc: "Sacred temple known for its unique spiritual atmosphere, ecstatic devotional practices, and night-long kirtan sessions during special occasions.",
    fullDesc: "Pagla Bari carries a fascinating history of ecstatic devotion and spiritual practices. The temple earned its name from the deep devotional fervor displayed by its early devotees. Today, it remains a center of intense bhakti (devotion) where traditional worship methods are preserved with utmost care. The temple is particularly known for its night-long kirtan sessions during special occasions.",
    period: "18th Century",
    category: "radhakrishna",
    specialFeatures: [
      "Night-long kirtan traditions",
      "Ecstatic devotional practices",
      "Historic spiritual artifacts",
      "Monthly full moon celebrations"
    ],
    gallery: ["🏮", "🎵", "🌙", "💫", "🕯️", "🎶"]
  },
  {
    id: 29,
    name: "Agameshwari Kali Temple",
    image: "🔱",
    shortDesc: "The principal Kali temple of Santipur, famous for its powerful spiritual energy, tantric worship traditions, and legendary Kali Puja celebrations.",
    fullDesc: "Agameshwari Kali Temple stands as the premier center of Shakti worship in Santipur. The temple houses a powerful deity of Goddess Kali and is known for the intense spiritual energy felt within its premises. The annual Kali Puja celebrations here are legendary, attracting thousands of devotees. The temple follows tantric traditions of worship and maintains strict ritual protocols passed down through generations of priests.",
    period: "17th Century",
    category: "kali",
    specialFeatures: [
      "Principal Shakti worship center",
      "Tantric ritual traditions",
      "Grand Kali Puja celebrations",
      "Powerful spiritual atmosphere"
    ],
    gallery: ["🔱", "🔥", "🌙", "🎆", "💀", "🕉️"]
  },
  {
    id: 34,
    name: "Mahadev Temple",
    image: "🔱",
    shortDesc: "Ancient Shiva temple housing a historic self-manifested lingam, known for elaborate Monday abhishekam ceremonies and Maha Shivaratri night vigils.",
    fullDesc: "Mahadev Temple is one of the oldest Shiva temples in Santipur, housing an ancient Shiva lingam that devotees believe to be self-manifested. The temple is renowned for its elaborate Monday abhishekam ceremonies where the lingam is bathed with various sacred substances including milk, honey, and Ganges water. During Maha Shivaratri, the temple conducts night-long worship with continuous chanting and offerings.",
    period: "16th Century",
    category: "shiv",
    specialFeatures: [
      "Ancient self-manifested lingam",
      "Monday abhishekam traditions",
      "Maha Shivaratri night vigils",
      "Sacred water offerings"
    ],
    gallery: ["🔱", "🥛", "🔔", "🌊", "🕉️", "⛰️"]
  },
  {
    id: 40,
    name: "Jagadhatri Temple",
    image: "🏛️",
    shortDesc: "Famous temple celebrating Jagadhatri Puja with grand festivities, elaborate decorations, cultural programs, and serving as a year-round cultural hub.",
    fullDesc: "Jagadhatri Temple is the epicenter of Jagadhatri Puja celebrations in Santipur, an occasion that rivals even Durga Puja in its grandeur here. The temple organizes elaborate decorations, cultural programs, and community feasts during the puja. The deity of Jagadhatri is beautifully crafted and adorned with traditional ornaments and clothing. The temple also serves as a cultural hub throughout the year, hosting various events and gatherings.",
    period: "18th Century",
    category: "durga",
    specialFeatures: [
      "Grand Jagadhatri Puja",
      "Elaborate festival decorations",
      "Cultural event center",
      "Community feast traditions"
    ],
    gallery: ["🏛️", "🎨", "🎪", "🍲", "👑", "🌸"]
  },
  {
    id: 45,
    name: "Lakshmi Narayan Temple",
    image: "🏛️",
    shortDesc: "Beautiful temple dedicated to Lord Vishnu and Goddess Lakshmi, known for balanced prosperity worship, precise daily rituals, and charitable activities.",
    fullDesc: "Lakshmi Narayan Temple celebrates the divine union of Lord Vishnu and Goddess Lakshmi, symbolizing the perfect balance of spiritual and material prosperity. The temple is known for its daily rituals performed with great devotion and precision. Thursday evenings see special worship as it's considered particularly auspicious for Lakshmi-Narayan worship. The temple also runs charitable activities including food distribution and educational support.",
    period: "17th Century",
    category: "narayan",
    specialFeatures: [
      "Balanced prosperity worship",
      "Daily precise rituals",
      "Thursday special worship",
      "Charitable activities"
    ],
    gallery: ["🏛️", "💰", "📿", "🙌", "🌼", "✨"]
  }
]

// Add remaining temples with basic data structure
const remainingTemples = [
  { id: 4, name: "Madan Gopal Bari", image: "⛩️", shortDesc: "Beautiful temple dedicated to Madan Gopal, featuring traditional Bengal architectural style with exquisitely adorned deity and spring festival celebrations.", period: "17th Century", category: "radhakrishna" },
  { id: 5, name: "Prosenjit's Mama Bari", image: "🛕", shortDesc: "Family temple with deep cultural significance and notable connections, maintaining traditional worship practices with beautiful temple gardens.", period: "19th Century", category: "radhakrishna" },
  { id: 6, name: "Chakfera Goswami Bari", image: "🏛️", shortDesc: "Renowned Goswami family temple known for weekly kirtan assemblies, spiritual instruction programs, and rare manuscript collection.", period: "17th Century", category: "radhakrishna" },
  { id: 7, name: "Bashbuniya Goswami Bari", image: "🕌", shortDesc: "Ancient temple with spacious traditional courtyard, multiple shrine complex, and ancient architectural preservation with seasonal festival grounds.", period: "16th Century", category: "radhakrishna" },
  { id: 8, name: "Atabuniya Goswami Bari", image: "🏮", shortDesc: "Historic Goswami family temple featuring masterful terracotta artwork depicting scenes from Krishna's life with traditional worship timings.", period: "17th Century", category: "radhakrishna" },
  { id: 9, name: "Gopalpur Saha Bari", image: "⛩️", shortDesc: "Prominent family temple known for grand festival celebrations, large community hall hosting cultural programs and community feasts.", period: "18th Century", category: "radhakrishna" },
  { id: 10, name: "Shyamrai Jiu", image: "🛕", shortDesc: "Sacred shrine dedicated to Lord Krishna in his Shyamrai form with soul-stirring aarti ceremonies and seasonal deity decorations.", period: "16th Century", category: "radhakrishna" },
  { id: 11, name: "Radha Rasa Bihari Jiu", image: "🏛️", shortDesc: "Temple celebrating the divine pastimes of Radha and Krishna with special Kartik month observances and daily text recitations.", period: "17th Century", category: "radhakrishna" },
  { id: 12, name: "Radha Binod Jiu", image: "🕌", shortDesc: "Beautiful temple complex known for peaceful meditation spaces, serene garden complex, and morning meditation sessions.", period: "18th Century", category: "radhakrishna" },
  { id: 13, name: "Math Bari", image: "🏮", shortDesc: "Monastery-style temple serving as a center for spiritual learning and devotion with traditional educational programs.", period: "17th Century", category: "radhakrishna" },
  { id: 14, name: "Dindayal Babu's Bari", image: "⛩️", shortDesc: "Historic family temple maintaining traditional worship and cultural programs with community engagement activities.", period: "19th Century", category: "radhakrishna" },
  { id: 15, name: "Ashtakali Bhavan", image: "🛕", shortDesc: "Temple complex featuring eight forms of goddess Kali with traditional tantric worship practices.", period: "18th Century", category: "kali" },
  { id: 16, name: "Roy Bari Temple", image: "🏛️", shortDesc: "Prominent family temple known for its architectural beauty and spiritual significance with regular community prayers.", period: "17th Century", category: "radhakrishna" },
  { id: 17, name: "Radha Shyamchand Jiu", image: "🕌", shortDesc: "Sacred temple dedicated to Radha and Shyamchand with elaborate festival celebrations and traditional worship methods.", period: "16th Century", category: "radhakrishna" },
  { id: 18, name: "Radha Kalachand Jiu", image: "🏮", shortDesc: "Ancient temple featuring beautiful deity of Kalachand Krishna with daily worship and seasonal celebrations.", period: "17th Century", category: "radhakrishna" },
  { id: 19, name: "Saha Bari Temple", image: "⛩️", shortDesc: "Historic family temple known for traditional kirtan and community gatherings with cultural preservation efforts.", period: "18th Century", category: "radhakrishna" },
  { id: 20, name: "Madhyam Goswami Bari", image: "🛕", shortDesc: "Middle Goswami family temple with rich spiritual heritage and daily rituals following ancient traditions.", period: "17th Century", category: "radhakrishna" },
  { id: 21, name: "Bijaykrishna Goswami Bari", image: "🏛️", shortDesc: "Renowned temple of the Goswami lineage, known for spiritual teachings and devotion with scholarly traditions.", period: "18th Century", category: "radhakrishna" },
  { id: 22, name: "Goswami Bhattacharya Lane Temple", image: "🕌", shortDesc: "Temple complex in the historic lane, serving as a spiritual hub for the community with regular gatherings.", period: "17th Century", category: "radhakrishna" },
  { id: 23, name: "Rasaraj Jiu", image: "🏮", shortDesc: "Temple dedicated to Krishna as the king of divine mellows with traditional worship and meditation practices.", period: "16th Century", category: "radhakrishna" },
  { id: 24, name: "ISKCON Santipur", image: "⛩️", shortDesc: "Modern ISKCON temple promoting Krishna consciousness with daily programs and festivals following ISKCON traditions.", period: "21st Century", category: "radhakrishna" },
  { id: 25, name: "Putoputi Jiu", image: "🛕", shortDesc: "Charming temple with unique name, known for its intimate devotional atmosphere and family-style worship.", period: "18th Century", category: "radhakrishna" },
  { id: 26, name: "Ashananda Bari", image: "🏛️", shortDesc: "Historic temple maintaining traditional worship practices and cultural heritage with community involvement.", period: "17th Century", category: "radhakrishna" },
  { id: 27, name: "Advaita Acharya Temple", image: "🕌", shortDesc: "The most sacred temple dedicated to Advaita Acharya, principal associate of Sri Chaitanya Mahaprabhu with pilgrimage significance.", period: "16th Century", category: "radhakrishna" },
  { id: 28, name: "Nityananda Temple", image: "🏮", shortDesc: "Dedicated to Lord Nityananda, known for spiritual atmosphere and continuous chanting following Gaudiya Vaishnava traditions.", period: "16th Century", category: "radhakrishna" },
  { id: 30, name: "Dakshina Kali Mandir", image: "🕉️", shortDesc: "Ancient temple dedicated to Dakshina Kali with traditional tantric rituals and powerful spiritual presence.", period: "18th Century", category: "kali" },
  { id: 31, name: "Bhadra Kali Temple", image: "🔱", shortDesc: "Historic shrine known for its peaceful ambiance and evening aartis with traditional worship practices.", period: "16th Century", category: "kali" },
  { id: 32, name: "Shamshan Kali Mandir", image: "🕉️", shortDesc: "Sacred temple with deep spiritual significance and traditional worship practices following tantric traditions.", period: "19th Century", category: "kali" },
  { id: 33, name: "Raksha Kali Temple", image: "🔱", shortDesc: "Protective deity temple visited by devotees seeking blessings and protection with daily worship rituals.", period: "18th Century", category: "kali" },
  { id: 35, name: "Kedareshwar Shiv Mandir", image: "🕉️", shortDesc: "Sacred temple known for Monday worship and Maha Shivaratri celebrations with traditional Shiva worship methods.", period: "17th Century", category: "shiv" },
  { id: 36, name: "Panchanana Shiv Temple", image: "🔱", shortDesc: "Temple featuring the five-faced form of Lord Shiva with intricate carvings and unique architectural elements.", period: "18th Century", category: "shiv" },
  { id: 37, name: "Baidyanath Shiv Mandir", image: "🕉️", shortDesc: "Historic temple known for healing powers and spiritual significance with devotees seeking health blessings.", period: "19th Century", category: "shiv" },
  { id: 38, name: "Nataraja Temple", image: "🔱", shortDesc: "Unique temple celebrating Shiva as the cosmic dancer with traditional dance performances and cultural programs.", period: "17th Century", category: "shiv" },
  { id: 39, name: "Bhuteshwar Temple", image: "🕉️", shortDesc: "Ancient shrine with traditional architecture and daily worship rituals following centuries-old practices.", period: "16th Century", category: "shiv" },
  { id: 41, name: "Durga Bari", image: "🕌", shortDesc: "Historic Durga temple known for elaborate Durga Puja celebrations with traditional rituals and decorations.", period: "17th Century", category: "durga" },
  { id: 42, name: "Mahishasuramardini Temple", image: "🏮", shortDesc: "Sacred shrine depicting the goddess slaying Mahishasura with powerful iconography and symbolic significance.", period: "19th Century", category: "durga" },
  { id: 43, name: "Annapurna Temple", image: "⛩️", shortDesc: "Temple dedicated to Goddess Annapurna, known for community meals and charity with food distribution programs.", period: "18th Century", category: "durga" },
  { id: 44, name: "Chandi Temple", image: "🛕", shortDesc: "Ancient temple with traditional Bengali architecture and spiritual significance hosting regular worship ceremonies.", period: "16th Century", category: "durga" },
  { id: 46, name: "Narayan Dham", image: "🕌", shortDesc: "Sacred complex featuring multiple shrines and spiritual learning center with educational programs for devotees.", period: "18th Century", category: "narayan" },
  { id: 47, name: "Jagannath Temple", image: "🏮", shortDesc: "Temple celebrating Lord Jagannath with annual Rath Yatra celebrations following Puri temple traditions.", period: "19th Century", category: "narayan" },
  { id: 48, name: "Venkateswara Temple", image: "⛩️", shortDesc: "Modern temple dedicated to Lord Venkateswara with South Indian architectural style and worship rituals.", period: "20th Century", category: "narayan" },
  { id: 49, name: "Narasimha Temple", image: "🛕", shortDesc: "Temple dedicated to the fierce avatar of Vishnu with traditional worship and protection blessings for devotees.", period: "17th Century", category: "narayan" },
  { id: 50, name: "Rama Temple", image: "🏛️", shortDesc: "Sacred shrine celebrating Lord Rama with regular Ram Katha recitations and Ram Navami celebrations.", period: "18th Century", category: "narayan" }
]

// Combine all temples
const completeTemples = [...allTemples, ...remainingTemples.map(t => ({
  ...t,
  fullDesc: t.shortDesc + " This temple maintains traditional worship practices and serves as an important spiritual center in Santipur's religious landscape.",
  specialFeatures: [
    "Traditional daily worship rituals",
    "Community prayer gatherings",
    "Festival celebrations",
    "Cultural preservation efforts"
  ],
  gallery: ["🏛️", "🌺", "🪔", "📿", "🕉️", "✨"]
}))]

const categories = [
  { id: 'all', name: 'All Temples', icon: '🕉️' },
  { id: 'radhakrishna', name: 'Radha Krishna', icon: '🏛️' },
  { id: 'kali', name: 'Kali', icon: '🔱' },
  { id: 'shiv', name: 'Shiv', icon: '🕉️' },
  { id: 'durga', name: 'Durga', icon: '🏮' },
  { id: 'narayan', name: 'Narayan', icon: '⛩️' }
]

export default function Temples() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [visibleTemples, setVisibleTemples] = useState(10)
  const [selectedTemple, setSelectedTemple] = useState(null)

  const filteredTemples = selectedFilter === 'all' 
    ? completeTemples 
    : completeTemples.filter(temple => temple.category === selectedFilter)

  const displayedTemples = filteredTemples.slice(0, visibleTemples)
  const hasMore = visibleTemples < filteredTemples.length

  useEffect(() => {
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
    
    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el)
      })
    }, 100)
    
    return () => observer.disconnect()
  }, [displayedTemples.length])

  useEffect(() => {
    setVisibleTemples(selectedFilter === 'all' ? 10 : 6)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedFilter])

  const handleLoadMore = () => {
    setVisibleTemples(prev => prev + (selectedFilter === 'all' ? 10 : 6))
  }

  // Temple Detail Modal Component
  const TempleModal = ({ temple, onClose }) => {
    if (!temple) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto my-8">
          {/* Modal Header */}
          <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white rounded-t-3xl z-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <span className="text-3xl leading-none">&times;</span>
            </button>
            
            <div className="flex items-center space-x-6 pr-16">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
                {temple.image}
              </div>
              <div>
                <h2 className="text-4xl font-bold font-serif mb-2">{temple.name}</h2>
                <p className="text-amber-100 text-lg">{temple.period}</p>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-8">
            {/* Temple Gallery - Horizontal Scrollable */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Temple Gallery</h3>
              <div className="relative group">
                {/* Scrollable Container */}
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide hover:scrollbar-show scroll-smooth">
                  {temple.gallery?.map((img, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-80 h-64 bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center text-8xl hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer snap-start"
                    >
                      {img}
                    </div>
                  ))}
                </div>
                
                {/* Scroll Indicator */}
                <div className="flex justify-center mt-4 gap-2">
                  {temple.gallery?.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-amber-300"
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">
                ← Scroll horizontally to view all images →
              </p>
            </div>
            
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .hover:scrollbar-show:hover::-webkit-scrollbar {
                display: block;
                height: 8px;
              }
              .hover:scrollbar-show:hover::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .hover:scrollbar-show:hover::-webkit-scrollbar-thumb {
                background: #d97706;
                border-radius: 10px;
              }
              .hover:scrollbar-show:hover::-webkit-scrollbar-thumb:hover {
                background: #b45309;
              }
            `}</style>

            {/* Temple Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Temple</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {temple.fullDesc}
              </p>
            </div>

            {/* Special Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Special Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {temple.specialFeatures?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
                  >
                    <span className="text-amber-600 text-xl mt-1">✦</span>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visitor Information */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Visitor Information</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-lg">
                <div>
                  <p className="mb-3"><span className="font-semibold">📍 Location:</span> Santipur, Nadia District</p>
                  <p className="mb-3"><span className="font-semibold">🕐 Best Time:</span> Early morning or evening aarti</p>
                </div>
                <div>
                  <p className="mb-3"><span className="font-semibold">🎟️ Entry:</span> Free for all devotees</p>
                  <p className="mb-3"><span className="font-semibold">📸 Photography:</span> Allowed in courtyard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-8 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🏛️</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
              <p className="text-gray-600">Ancient Temples</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">📅</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Years of Heritage</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎪</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">25+</h3>
              <p className="text-gray-600">Annual Festivals</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">👥</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">1000+</h3>
              <p className="text-gray-600">Daily Visitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <span className="text-gray-700 font-semibold text-lg mr-2">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                  selectedFilter === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-amber-700">{displayedTemples.length}</span> of <span className="font-semibold text-amber-700">{filteredTemples.length}</span> temples
            </p>
          </div>
        </div>
      </section>

      {/* Temples Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
              {selectedFilter === 'all' ? 'All Sacred Temples' : `${categories.find(c => c.id === selectedFilter)?.name} Temples`}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each temple tells a unique story of devotion, architecture, and spiritual heritage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTemples.map((temple) => (
              <div
                key={temple.id}
                className="scroll-reveal group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  {/* Temple Image - Larger */}
                  <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                    <span className="text-8xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                      {temple.image}
                    </span>
                    
                    {/* Period Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {temple.period}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/30 rounded-full blur-xl"></div>
                    <div className="absolute -top-2 -left-2 w-20 h-20 bg-white/30 rounded-full blur-lg"></div>
                  </div>

                  {/* Temple Info - Enhanced */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                      {temple.name}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4 flex-1 text-base">
                      {temple.shortDesc}
                    </p>

                    {/* Quick Feature Preview */}
                    {temple.specialFeatures && temple.specialFeatures.length > 0 && (
                      <div className="mb-4 p-3 bg-amber-50 rounded-lg">
                        <p className="text-sm text-gray-700 flex items-start">
                          <span className="text-amber-600 mr-2">✦</span>
                          <span className="font-semibold">{temple.specialFeatures[0]}</span>
                        </p>
                      </div>
                    )}

                    <button 
                      onClick={() => setSelectedTemple(temple)}
                      className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>Learn More</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Load More Temples
              </button>
            </div>
          )}

          {/* All Loaded Message */}
          {!hasMore && filteredTemples.length > (selectedFilter === 'all' ? 10 : 6) && (
            <div className="text-center mt-12">
              <div className="inline-block bg-white rounded-full px-6 py-3 shadow-lg border-2 border-amber-200">
                <p className="text-gray-700 font-semibold flex items-center space-x-2">
                  <span className="text-2xl">✨</span>
                  <span>You have seen all {filteredTemples.length} temples</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visitor Info Section */}
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
                {[
                  { time: '5:00 AM', activity: 'Mangal Aarti' },
                  { time: '8:00 AM', activity: 'Bhog Offering' },
                  { time: '12:00 PM', activity: 'Raj Bhog' },
                  { time: '6:00 PM', activity: 'Sandhya Aarti' },
                  { time: '8:00 PM', activity: 'Shayan Aarti' }
                ].map((timing, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
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
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-8 rounded-3xl text-white text-center shadow-2xl">
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
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
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
            <div className="scroll-reveal">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-4">Educational Hub</h3>
                <p className="text-blue-200">
                  Traditional schools and libraries preserve ancient texts and teachings for future generations.
                </p>
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-bold mb-4">Cultural Center</h3>
                <p className="text-blue-200">
                  Regular cultural programs showcase classical music, dance, and dramatic performances.
                </p>
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl transform hover:scale-105 transition-transform duration-300">
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
            <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Plan Your Visit
            </button>
            <button className="px-8 py-4 border-2 border-amber-600 text-amber-600 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300">
              Join Our Community
            </button>
          </div>
        </div>
      </section>

      {/* Temple Modal */}
      <TempleModal temple={selectedTemple} onClose={() => setSelectedTemple(null)} />
    </div>
  )
}