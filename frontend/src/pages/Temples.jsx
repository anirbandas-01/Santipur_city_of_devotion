// import { useState, useEffect } from 'react'

// export default function Temples() {
//   const [activeTemple, setActiveTemple] = useState(0)

//   useEffect(() => {
//     // Scroll reveal animation observer
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: '0px 0px -50px 0px'
//     }
    
//     const observer = new IntersectionObserver(function(entries) {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible')
//         }
//       })
//     }, observerOptions)
    
//     document.querySelectorAll('.scroll-reveal').forEach(el => {
//       observer.observe(el)
//     })
    
//     return () => observer.disconnect()
//   }, [])

//   const temples = [
//     {
//       id: 1,
//       name: "Advaita Acharya Temple",
//       period: "16th Century",
//       deity: "Lord Krishna & Advaita Acharya",
//       description: "The most sacred temple of Santipur, dedicated to Advaita Acharya, one of the principal associates of Sri Chaitanya Mahaprabhu. This ancient temple stands as a testament to the rich Vaishnava heritage of the region.",
//       specialFeatures: [
//         "Original samadhi of Advaita Acharya",
//         "Ancient stone carvings and sculptures",
//         "Daily kirtan and aarti ceremonies",
//         "Pilgrimage destination for Vaishnavas worldwide"
//       ],
//       festivals: ["Janmashtami", "Advaita Jayanti", "Gaura Purnima"],
//       architecture: "Traditional Bengali temple architecture with terracotta work",
//       image: "🏛️"
//     },
//     {
//       id: 2,
//       name: "Madana Gopala Temple",
//       period: "17th Century", 
//       deity: "Madana Gopala (Krishna)",
//       description: "A beautiful temple housing the deity of Madana Gopala, known for its exquisite Bengal architectural style and peaceful atmosphere that attracts devotees seeking spiritual solace.",
//       specialFeatures: [
//         "Intricate terracotta panels",
//         "Beautiful gardens surrounding the temple",
//         "Traditional oil lamp lighting system",
//         "Ancient manuscripts preserved in temple library"
//       ],
//       festivals: ["Rash Utsav", "Kali Puja", "Dol Jatra"],
//       architecture: "Ratna style with multiple spires and ornate decorations",
//       image: "🕌"
//     },
//     {
//       id: 3,
//       name: "Gopal Jiu Temple",
//       period: "18th Century",
//       deity: "Gopal Jiu (Young Krishna)",
//       description: "This temple is renowned for its elaborate festivals and community gatherings. It serves as a cultural center where traditional music, dance, and devotional practices flourish.",
//       specialFeatures: [
//         "Large prayer hall for community gatherings",
//         "Traditional dhol and khol instruments",
//         "Weekly cultural programs",
//         "Community kitchen serving prasadam"
//       ],
//       festivals: ["Holi", "Janmashtami", "Kartik Puja"],
//       architecture: "Modern renovation while preserving traditional elements",
//       image: "🏮"
//     },
//     {
//       id: 4,
//       name: "Nityananda Temple",
//       period: "16th Century",
//       deity: "Lord Nityananda",
//       description: "Dedicated to Lord Nityananda, the eternal companion of Sri Chaitanya. This temple is known for its spiritual atmosphere and the regular chanting of the holy names.",
//       specialFeatures: [
//         "Sacred tulsi garden",
//         "Original stone deities",
//         "Continuous nama-sankirtan tradition",
//         "Ancient palm leaf manuscripts"
//       ],
//       festivals: ["Nityananda Trayodashi", "Gaura Purnima", "Ratha Yatra"],
//       architecture: "Simple yet elegant traditional Bengali style",
//       image: "⛩️"
//     }
//   ]

//   const templeTimings = [
//     { time: "5:00 AM", activity: "Mangal Aarti" },
//     { time: "8:00 AM", activity: "Bhog Offering" },
//     { time: "12:00 PM", activity: "Raj Bhog" },
//     { time: "6:00 PM", activity: "Sandhya Aarti" },
//     { time: "8:00 PM", activity: "Shayan Aarti" }
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
//       {/* Header Section */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
//           <div className="text-center scroll-reveal">
//             <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
//               Sacred Temples of Santipur
//             </h1>
//             <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
//               Journey through centuries of devotion and discover the spiritual heart of Bengal, 
//               where ancient temples stand as eternal witnesses to divine love and devotion.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Temple Overview Stats */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center scroll-reveal">
//               <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl text-white">🏛️</span>
//               </div>
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">12+</h3>
//               <p className="text-gray-600">Ancient Temples</p>
//             </div>
//             <div className="text-center scroll-reveal" style={{animationDelay: '0.1s'}}>
//               <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl text-white">📅</span>
//               </div>
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
//               <p className="text-gray-600">Years of Heritage</p>
//             </div>
//             <div className="text-center scroll-reveal" style={{animationDelay: '0.2s'}}>
//               <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl text-white">🎪</span>
//               </div>
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">25+</h3>
//               <p className="text-gray-600">Annual Festivals</p>
//             </div>
//             <div className="text-center scroll-reveal" style={{animationDelay: '0.3s'}}>
//               <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl text-white">👥</span>
//               </div>
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">1000+</h3>
//               <p className="text-gray-600">Daily Visitors</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Temples Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16 scroll-reveal">
//             <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
//               Sacred Temples
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Each temple tells a unique story of devotion, architecture, and spiritual heritage
//             </p>
//           </div>

//           {/* Temple Cards */}
//           <div className="space-y-16">
//             {temples.map((temple, index) => (
//               <div 
//                 key={temple.id}
//                 className={`scroll-reveal grid lg:grid-cols-2 gap-12 items-center ${
//                   index % 2 === 1 ? 'lg:grid-flow-col-reverse' : ''
//                 }`}
//                 style={{animationDelay: `${index * 0.1}s`}}
//               >
//                 {/* Temple Image/Icon */}
//                 <div className="relative">
//                   <div className="bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl h-80 flex items-center justify-center">
//                     <span className="text-8xl opacity-70">{temple.image}</span>
//                   </div>
//                   <div className="absolute -top-4 -right-4 bg-amber-600 text-white px-4 py-2 rounded-full font-semibold">
//                     {temple.period}
//                   </div>
//                 </div>

//                 {/* Temple Details */}
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-3">
//                       {temple.name}
//                     </h3>
//                     <p className="text-lg text-amber-600 font-semibold mb-4">
//                       Dedicated to: {temple.deity}
//                     </p>
//                     <p className="text-gray-700 leading-relaxed text-lg">
//                       {temple.description}
//                     </p>
//                   </div>

//                   <div>
//                     <h4 className="text-xl font-semibold text-gray-800 mb-3">Special Features:</h4>
//                     <ul className="space-y-2">
//                       {temple.specialFeatures.map((feature, idx) => (
//                         <li key={idx} className="flex items-center text-gray-700">
//                           <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="text-lg font-semibold text-gray-800 mb-2">Architecture:</h4>
//                       <p className="text-gray-600">{temple.architecture}</p>
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-semibold text-gray-800 mb-2">Major Festivals:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {temple.festivals.map((festival, idx) => (
//                           <span key={idx} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
//                             {festival}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Temple Timings Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="scroll-reveal">
//               <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
//                 Daily Temple Timings
//               </h2>
//               <p className="text-xl text-gray-600 mb-8">
//                 Experience the rhythm of devotional life with our daily prayer schedule
//               </p>
              
//               <div className="space-y-4">
//                 {templeTimings.map((timing, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
//                         <span className="text-white font-bold text-sm">{timing.time.split(' ')[1]}</span>
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-800">{timing.activity}</p>
//                         <p className="text-sm text-gray-600">{timing.time}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="scroll-reveal">
//               <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-8 rounded-3xl text-white text-center">
//                 <div className="text-6xl mb-6">🙏</div>
//                 <h3 className="text-2xl font-bold font-serif mb-4">Visitor Guidelines</h3>
//                 <ul className="space-y-3 text-left text-amber-100">
//                   <li className="flex items-start space-x-2">
//                     <span className="text-yellow-300 mt-1">•</span>
//                     <span>Dress modestly and remove shoes before entering</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <span className="text-yellow-300 mt-1">•</span>
//                     <span>Photography may be restricted in certain areas</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <span className="text-yellow-300 mt-1">•</span>
//                     <span>Maintain silence during prayer times</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <span className="text-yellow-300 mt-1">•</span>
//                     <span>Participate respectfully in communal activities</span>
//                   </li>
//                   <li className="flex items-start space-x-2">
//                     <span className="text-yellow-300 mt-1">•</span>
//                     <span>Donations are welcome but not mandatory</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Cultural Impact Section */}
//       <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
//           <div className="scroll-reveal mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
//               Cultural & Spiritual Impact
//             </h2>
//             <p className="text-xl text-blue-200 max-w-3xl mx-auto">
//               These temples serve as more than places of worship - they are centers of culture, learning, and community unity
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="scroll-reveal" style={{animationDelay: '0.1s'}}>
//               <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl">
//                 <div className="text-4xl mb-4">📚</div>
//                 <h3 className="text-xl font-bold mb-4">Educational Hub</h3>
//                 <p className="text-blue-200">
//                   Traditional schools and libraries preserve ancient texts and teachings for future generations.
//                 </p>
//               </div>
//             </div>

//             <div className="scroll-reveal" style={{animationDelay: '0.2s'}}>
//               <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl">
//                 <div className="text-4xl mb-4">🎭</div>
//                 <h3 className="text-xl font-bold mb-4">Cultural Center</h3>
//                 <p className="text-blue-200">
//                   Regular cultural programs showcase classical music, dance, and dramatic performances.
//                 </p>
//               </div>
//             </div>

//             <div className="scroll-reveal" style={{animationDelay: '0.3s'}}>
//               <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl">
//                 <div className="text-4xl mb-4">🤝</div>
//                 <h3 className="text-xl font-bold mb-4">Community Service</h3>
//                 <p className="text-blue-200">
//                   Temples organize charitable activities, free meals, and support for the needy in the community.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
//         <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
//           <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
//             Plan Your Sacred Journey
//           </h2>
//           <p className="text-xl text-gray-600 mb-10">
//             Experience the divine atmosphere and rich heritage of Santipur's ancient temples. 
//             Join us in preserving this spiritual legacy for future generations.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105">
//               Plan Your Visit
//             </button>
//             <button className="px-8 py-4 border-2 border-amber-600 text-amber-600 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300">
//               Join Our Community
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'

// Temple data organized by categories
const allTemples = [
  {
    id: 1,
    name: "Advaita Acharya Temple",
    image: "🏛️",
    shortDesc: "The most sacred temple dedicated to Advaita Acharya, one of the principal associates of Sri Chaitanya Mahaprabhu.",
    period: "16th Century",
    category: "radhakrishna"
  },
  {
    id: 2,
    name: "Madana Gopala Temple",
    image: "🕌",
    shortDesc: "Beautiful temple housing the deity of Madana Gopala, known for its exquisite Bengal architectural style.",
    period: "17th Century",
    category: "radhakrishna"
  },
  {
    id: 3,
    name: "Gopal Jiu Temple",
    image: "🏮",
    shortDesc: "Renowned for elaborate festivals and community gatherings, serving as a cultural center.",
    period: "18th Century",
    category: "radhakrishna"
  },
  {
    id: 4,
    name: "Nityananda Temple",
    image: "⛩️",
    shortDesc: "Dedicated to Lord Nityananda, known for its spiritual atmosphere and continuous chanting.",
    period: "16th Century",
    category: "radhakrishna"
  },
  {
    id: 5,
    name: "Radha Madhav Temple",
    image: "🛕",
    shortDesc: "Ancient temple celebrating the divine love of Radha and Krishna with daily aartis.",
    period: "17th Century",
    category: "radhakrishna"
  },
  {
    id: 6,
    name: "Govinda Temple",
    image: "🏛️",
    shortDesc: "Historic temple known for its traditional kirtan and spiritual gatherings.",
    period: "18th Century",
    category: "radhakrishna"
  },
  {
    id: 7,
    name: "Radha Raman Temple",
    image: "🕌",
    shortDesc: "Sacred shrine with beautiful gardens and peaceful meditation spaces.",
    period: "16th Century",
    category: "radhakrishna"
  },
  {
    id: 8,
    name: "Krishna Chandra Temple",
    image: "🏮",
    shortDesc: "Temple featuring intricate terracotta work and classical Bengali architecture.",
    period: "19th Century",
    category: "radhakrishna"
  },
  {
    id: 9,
    name: "Agameshwari Kali Temple",
    image: "🔱",
    shortDesc: "The principal Kali temple of Santipur, famous for its powerful spiritual energy and annual Kali Puja.",
    period: "17th Century",
    category: "kali"
  },
  {
    id: 10,
    name: "Dakshina Kali Mandir",
    image: "🕉️",
    shortDesc: "Ancient temple dedicated to Dakshina Kali with traditional tantric rituals.",
    period: "18th Century",
    category: "kali"
  },
  {
    id: 11,
    name: "Bhadra Kali Temple",
    image: "🔱",
    shortDesc: "Historic shrine known for its peaceful ambiance and evening aartis.",
    period: "16th Century",
    category: "kali"
  },
  {
    id: 12,
    name: "Shamshan Kali Mandir",
    image: "🕉️",
    shortDesc: "Sacred temple with deep spiritual significance and traditional worship practices.",
    period: "19th Century",
    category: "kali"
  },
  {
    id: 13,
    name: "Raksha Kali Temple",
    image: "🔱",
    shortDesc: "Protective deity temple visited by devotees seeking blessings and protection.",
    period: "18th Century",
    category: "kali"
  },
  {
    id: 14,
    name: "Mahadev Temple",
    image: "🔱",
    shortDesc: "Ancient Shiva temple with a historic lingam and traditional abhishekam ceremonies.",
    period: "16th Century",
    category: "shiv"
  },
  {
    id: 15,
    name: "Kedareshwar Shiv Mandir",
    image: "🕉️",
    shortDesc: "Sacred temple known for Monday worship and Maha Shivaratri celebrations.",
    period: "17th Century",
    category: "shiv"
  },
  {
    id: 16,
    name: "Panchanana Shiv Temple",
    image: "🔱",
    shortDesc: "Temple featuring the five-faced form of Lord Shiva with intricate carvings.",
    period: "18th Century",
    category: "shiv"
  },
  {
    id: 17,
    name: "Baidyanath Shiv Mandir",
    image: "🕉️",
    shortDesc: "Historic temple known for healing powers and spiritual significance.",
    period: "19th Century",
    category: "shiv"
  },
  {
    id: 18,
    name: "Nataraja Temple",
    image: "🔱",
    shortDesc: "Unique temple celebrating Shiva as the cosmic dancer with traditional dance performances.",
    period: "17th Century",
    category: "shiv"
  },
  {
    id: 19,
    name: "Bhuteshwar Temple",
    image: "🕉️",
    shortDesc: "Ancient shrine with traditional architecture and daily worship rituals.",
    period: "16th Century",
    category: "shiv"
  },
  {
    id: 20,
    name: "Jagadhatri Temple",
    image: "🏛️",
    shortDesc: "Famous temple celebrating Jagadhatri Puja with grand festivities and traditional rituals.",
    period: "18th Century",
    category: "durga"
  },
  {
    id: 21,
    name: "Durga Bari",
    image: "🕌",
    shortDesc: "Historic Durga temple known for elaborate Durga Puja celebrations.",
    period: "17th Century",
    category: "durga"
  },
  {
    id: 22,
    name: "Mahishasuramardini Temple",
    image: "🏮",
    shortDesc: "Sacred shrine depicting the goddess slaying Mahishasura with powerful iconography.",
    period: "19th Century",
    category: "durga"
  },
  {
    id: 23,
    name: "Annapurna Temple",
    image: "⛩️",
    shortDesc: "Temple dedicated to Goddess Annapurna, known for community meals and charity.",
    period: "18th Century",
    category: "durga"
  },
  {
    id: 24,
    name: "Chandi Temple",
    image: "🛕",
    shortDesc: "Ancient temple with traditional Bengali architecture and spiritual significance.",
    period: "16th Century",
    category: "durga"
  },
  {
    id: 25,
    name: "Lakshmi Narayan Temple",
    image: "🏛️",
    shortDesc: "Beautiful temple dedicated to Lord Vishnu and Goddess Lakshmi with daily rituals.",
    period: "17th Century",
    category: "narayan"
  },
  {
    id: 26,
    name: "Narayan Dham",
    image: "🕌",
    shortDesc: "Sacred complex featuring multiple shrines and spiritual learning center.",
    period: "18th Century",
    category: "narayan"
  },
  {
    id: 27,
    name: "Jagannath Temple",
    image: "🏮",
    shortDesc: "Temple celebrating Lord Jagannath with annual Rath Yatra celebrations.",
    period: "19th Century",
    category: "narayan"
  },
  {
    id: 28,
    name: "Venkateswara Temple",
    image: "⛩️",
    shortDesc: "Modern temple dedicated to Lord Venkateswara with South Indian architectural style.",
    period: "20th Century",
    category: "narayan"
  },
  {
    id: 29,
    name: "Narasimha Temple",
    image: "🛕",
    shortDesc: "Temple dedicated to the fierce avatar of Vishnu with traditional worship.",
    period: "17th Century",
    category: "narayan"
  },
  {
    id: 30,
    name: "Rama Temple",
    image: "🏛️",
    shortDesc: "Sacred shrine celebrating Lord Rama with regular Ram Katha recitations.",
    period: "18th Century",
    category: "narayan"
  }
]

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

  const filteredTemples = selectedFilter === 'all' 
    ? allTemples 
    : allTemples.filter(temple => temple.category === selectedFilter)

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
              <h3 className="text-3xl font-bold text-gray-800 mb-2">30+</h3>
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
            {displayedTemples.map((temple, index) => (
              <div
                key={temple.id}
                className="scroll-reveal group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Temple Image/Icon */}
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                    <span className="text-7xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                      {temple.image}
                    </span>
                    
                    {/* Period Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {temple.period}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/30 rounded-full blur-xl"></div>
                    <div className="absolute -top-2 -left-2 w-16 h-16 bg-white/30 rounded-full blur-lg"></div>
                  </div>

                  {/* Temple Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                      {temple.name}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {temple.shortDesc}
                    </p>

                    <button className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
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
    </div>
  )
}