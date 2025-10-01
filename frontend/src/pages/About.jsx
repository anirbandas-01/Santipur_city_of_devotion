import { useState, useEffect } from 'react'

import shayamChad from '../assets/images/about/shyamChad.jpg'
import ancientManuscripts from '../assets/images/about/santipur_Ancient_Manuscr.jpg'
import historicNeighborhoods from '../assets/images/about/santipur_neighbourhood.jpg'

export default function About() {
  const [activeSection, setActiveSection] = useState('history')

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

  // Reset animations when activeSection changes
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('.content-reveal').forEach(el => {
        el.classList.remove('visible')
      })
      
      setTimeout(() => {
        document.querySelectorAll('.content-reveal').forEach(el => {
          el.classList.add('visible')
        })
      }, 50)
    }, 100)
  }, [activeSection])

  const sections = [
    {
      id: 'history',
      title: 'History',
      icon: '📜'
    },
    {
      id: 'chaitanya',
      title: 'Sri Chaitanya Mahaprabhu',
      icon: '🙏'
    },
    {
      id: 'culture',
      title: 'Culture & Handloom',
      icon: '🧵'
    }
  ]

  const historyContent = {
    title: "History of Santipur",
    subtitle: "Ancient Heritage & Spiritual Legacy",
    content: [
      {
        period: "Ancient Origins",
        description: "Santipur's history dates back to ancient times when it served as a significant center of learning and spirituality in Bengal. The city's strategic location along the Hooghly River made it an important trading hub, attracting merchants, scholars, and spiritual seekers from across the Indian subcontinent."
      },
      {
        period: "Medieval Period",
        description: "During the medieval period, Santipur flourished as a center of Vaishnava culture. The city became renowned for its temples, ashrams, and the presence of numerous saints and scholars who contributed to the rich spiritual and cultural tapestry of the region."
      },
      {
        period: "Colonial Era",
        description: "Under British rule, Santipur maintained its cultural identity while adapting to changing times. The handloom industry, particularly the weaving of fine cotton textiles, became a cornerstone of the local economy and gained recognition throughout Bengal and beyond."
      },
      {
        period: "Modern Era",
        description: "Today, Santipur continues to be a vibrant center of culture, spirituality, and traditional craftsmanship. The city has preserved its ancient traditions while embracing modernity, making it a unique destination for those seeking to experience authentic Bengali culture."
      }
    ],
    highlights: [
      "Over 500 years of documented history",
      "Strategic location on the Hooghly River",
      "Center of Vaishnava culture and learning",
      "Preserved architectural heritage",
      "Continuous tradition of handloom weaving"
    ]
  }

  const chaitanyaContent = {
    title: "Sri Chaitanya Mahaprabhu",
    subtitle: "The Great Saint & His Divine Connection",
    content: [
      {
        aspect: "Divine Incarnation",
        description: "Sri Chaitanya Mahaprabhu (1486-1534) is revered as the combined incarnation of Radha and Krishna. His appearance marked a spiritual renaissance in Bengal, emphasizing love, devotion, and the chanting of the holy names as the path to divine realization."
      },
      {
        aspect: "Connection to Santipur",
        description: "Santipur holds a special place in Chaitanya Mahaprabhu's life through its connection with Advaita Acharya, one of His principal associates. Advaita Acharya's residence and samadhi in Santipur make it a sacred pilgrimage destination for Vaishnavas worldwide."
      },
      {
        aspect: "Advaita Acharya",
        description: "Advaita Acharya, a great devotee and contemporary of Chaitanya Mahaprabhu, lived in Santipur. His prayers and devotional practices are believed to have played a crucial role in the Lord's appearance. His house and samadhi remain important pilgrimage sites."
      },
      {
        aspect: "Sankirtana Movement",
        description: "The sankirtana (congregational chanting) movement initiated by Sri Chaitanya found fertile ground in Santipur. The tradition of communal devotional singing and dancing continues to this day, keeping the spiritual legacy alive through centuries."
      }
    ],
    teachings: [
      "Chanting the Holy Names as the easiest path to God-realization",
      "Love and devotion (Bhakti) as the highest spiritual practice",
      "Equality of all beings regardless of caste or creed",
      "The importance of humble service and surrender",
      "Community devotional practices (Sankirtana)"
    ],
    legacy: "Sri Chaitanya's teachings transformed not just Bengal but influenced spiritual movements across India and eventually the world. His emphasis on love, compassion, and devotional service continues to inspire millions of devotees globally."
  }

  const cultureContent = {
    title: "Culture & Handloom",
    subtitle: "Living Traditions of Art & Craftsmanship",
    culturalAspects: [
      {
        name: "Traditional Music",
        description: "Santipur is renowned for its devotional music traditions, including kirtan, bhajan, and classical Bengali songs. The city has produced many accomplished musicians and continues to nurture musical talent.",
        features: ["Devotional Kirtan", "Classical Bengali Songs", "Traditional Instruments", "Music Festivals"]
      },
      {
        name: "Dance & Drama",
        description: "Classical dance forms and traditional drama depicting religious themes are integral to Santipur's culture. Performances during festivals bring these ancient art forms to life.",
        features: ["Bharatanatyam", "Folk Dances", "Religious Drama", "Festival Performances"]
      },
      {
        name: "Literature & Poetry",
        description: "The city has a rich literary tradition with numerous poets and writers contributing to Bengali literature, particularly devotional poetry and spiritual texts.",
        features: ["Devotional Poetry", "Spiritual Literature", "Bengali Prose", "Scholarly Works"]
      }
    ],
    handloomTradition: {
      description: "Santipur's handloom industry is legendary, known for producing some of the finest cotton and silk textiles in Bengal. The traditional weaving techniques have been passed down through generations of skilled artisans.",
      specialties: [
        "Santipuri Cotton Sarees - Known for their fine quality and intricate borders",
        "Silk Textiles - Premium silk fabrics with traditional motifs",
        "Jamdani Work - Delicate hand-woven patterns on fine cotton",
        "Traditional Borders - Distinctive designs that identify Santipuri textiles"
      ],
      process: [
        "Traditional pit looms operated by skilled weavers",
        "Natural dyeing techniques using vegetable colors",
        "Hand-spinning of cotton and silk threads",
        "Intricate pattern weaving requiring years of experience"
      ],
      significance: "The handloom tradition is not just an industry but a way of life that connects the community to its heritage while providing livelihood to thousands of families."
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'history':
        return (
          <div className="space-y-8">
            <div className="text-center content-reveal">
              <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">{historyContent.title}</h2>
              <p className="text-xl text-gray-600">{historyContent.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 content-reveal">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Timeline of Santipur</h3>
                <div className="space-y-6">
                  {historyContent.content.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-6">
                      <h4 className="text-lg font-semibold text-blue-700 mb-2">{item.period}</h4>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Historical Highlights</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                  <ul className="space-y-4">
                    {historyContent.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-2xl text-white">
                  <h4 className="text-xl font-bold mb-3">Did You Know?</h4>
                  <p className="leading-relaxed">
                    Santipur's name literally means "City of Peace," reflecting its spiritual significance and the tranquil atmosphere that has characterized the city throughout its history.
                  </p>
                </div>
              </div>
            </div>

            {/* Historical Images Gallery */}
            <div className="content-reveal mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Historical Images</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-blue-200 to-indigo-300 rounded-xl flex items-center justify-center">
                    <img 
                     src={shayamChad} 
                     alt="Ancient Temple Architecture"
                     className='w-full h-full object-cover transform group-hover:scale-110 transition duration-500'
                       /> 
                  </div>
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-black opacity-0 group-hover:opacity-100 font-semibold">Ancient Temple Architecture</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-green-200 to-blue-300 rounded-xl flex items-center justify-center">
                    <img 
                     src={historicNeighborhoods} 
                     alt="Ancient Temple Architecture"
                     className='w-full h-full object-cover transform group-hover:scale-110 transition duration-500'
                       /> 
                  </div>
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-black opacity-0 group-hover:opacity-100 font-semibold">Historic Neighborhoods</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-300 rounded-xl flex items-center justify-center">
                    <img 
                     src={ancientManuscripts} 
                     alt="Ancient Temple Architecture"
                     className='w-full h-full object-cover transform group-hover:scale-110 transition duration-500'
                       /> 
                  </div>
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-black opacity-0 group-hover:opacity-100 font-semibold">Ancient Manuscripts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'chaitanya':
        return (
          <div className="space-y-8">
            <div className="text-center content-reveal">
              <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">{chaitanyaContent.title}</h2>
              <p className="text-xl text-gray-600">{chaitanyaContent.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 content-reveal">
              <div>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-8 rounded-3xl text-white text-center mb-8">
                  <div className="text-6xl mb-4">🙏</div>
                  <h3 className="text-2xl font-bold mb-2">The Golden Avatar</h3>
                  <p className="text-lg opacity-90">Sri Chaitanya Mahaprabhu appeared in 1486 CE to spread the message of divine love through the chanting of the holy names.</p>
                </div>

                <div className="space-y-6">
                  {chaitanyaContent.content.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">{item.aspect}</h4>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Core Teachings</h3>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl mb-8">
                  <ul className="space-y-3">
                    {chaitanyaContent.teachings.map((teaching, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2"></span>
                        <span className="text-gray-700">{teaching}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-white">
                  <h4 className="text-xl font-bold mb-3">Eternal Legacy</h4>
                  <p className="leading-relaxed">{chaitanyaContent.legacy}</p>
                </div>
              </div>
            </div>

            {/* Video Interview Section */}
            <div className="content-reveal mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Community Voices</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-yellow-200 to-orange-300 rounded-xl flex items-center justify-center mb-4 cursor-pointer group relative">
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-gray-800">▶</span>
                      </div>
                    </div>
                    <span className="text-4xl">👨‍🦳</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Pandit Raghunath Das</h4>
                  <p className="text-sm text-gray-600 mb-3">Temple Priest & Scholar</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "Sri Chaitanya Mahaprabhu's teachings continue to guide our daily lives in Santipur. Every morning, as we perform the temple rituals, we feel His divine presence through Advaita Acharya's legacy."
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-blue-200 to-purple-300 rounded-xl flex items-center justify-center mb-4 cursor-pointer group relative">
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-gray-800">▶</span>
                      </div>
                    </div>
                    <span className="text-4xl">🎓</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Dr. Shyama Charan Goswami</h4>
                  <p className="text-sm text-gray-600 mb-3">Religious Studies Professor</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "The historical significance of Santipur in the Vaishnava movement cannot be overstated. It remains one of the most important pilgrimage sites for understanding Chaitanya's teachings."
                  </p>
                </div>
              </div>
            </div>

            {/* Sacred Sites Images */}
            <div className="content-reveal mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sacred Sites & Heritage</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-yellow-200 to-amber-300 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🛕</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-sm text-center px-2">Advaita Acharya Temple</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-orange-200 to-red-300 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🏺</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-sm text-center px-2">Sacred Artifacts</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-green-200 to-teal-300 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🌿</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-sm text-center px-2">Sacred Gardens</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-300 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">📿</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-sm text-center px-2">Prayer Gatherings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'culture':
        return (
          <div className="space-y-8">
            <div className="text-center content-reveal">
              <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">{cultureContent.title}</h2>
              <p className="text-xl text-gray-600">{cultureContent.subtitle}</p>
            </div>

            {/* Cultural Aspects */}
            <div className="content-reveal">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Cultural Heritage</h3>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {cultureContent.culturalAspects.map((aspect, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">{aspect.name}</h4>
                    <p className="text-gray-700 mb-4">{aspect.description}</p>
                    <div className="space-y-2">
                      {aspect.features.map((feature, idx) => (
                        <span key={idx} className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Handloom Tradition */}
            <div className="content-reveal bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Handloom Legacy</h3>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {cultureContent.handloomTradition.description}
                  </p>

                  <h4 className="text-xl font-bold text-gray-800 mb-4">Signature Specialties</h4>
                  <div className="space-y-4">
                    {cultureContent.handloomTradition.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2"></span>
                        <span className="text-gray-700">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Traditional Process</h4>
                  <div className="space-y-4 mb-6">
                    {cultureContent.handloomTradition.process.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 rounded-xl text-white">
                    <h5 className="text-lg font-bold mb-2">Cultural Significance</h5>
                    <p className="text-sm leading-relaxed">{cultureContent.handloomTradition.significance}</p>
                  </div>
                </div>
              </div>

              {/* Artisan Video Interviews */}
              <div className="mt-12">
                <h4 className="text-2xl font-bold text-gray-800 mb-8 text-center">Master Artisans Share Their Stories</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video bg-gradient-to-br from-amber-200 to-orange-300 rounded-lg flex items-center justify-center mb-3 cursor-pointer group relative">
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                          <span className="text-lg text-gray-800">▶</span>
                        </div>
                      </div>
                      <span className="text-3xl">👨‍🎨</span>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-1">Ramesh Kumar Das</h5>
                    <p className="text-xs text-gray-600 mb-2">Master Weaver - 40 years experience</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      "My grandfather taught me the art of weaving Santipuri sarees. Each thread carries our family's legacy."
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video bg-gradient-to-br from-pink-200 to-red-300 rounded-lg flex items-center justify-center mb-3 cursor-pointer group relative">
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                          <span className="text-lg text-gray-800">▶</span>
                        </div>
                      </div>
                      <span className="text-3xl">👩‍🎨</span>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-1">Radha Rani Devi</h5>
                    <p className="text-xs text-gray-600 mb-2">Pattern Designer</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      "Creating new patterns while preserving traditional motifs is my passion. Each design tells a story."
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video bg-gradient-to-br from-green-200 to-blue-300 rounded-lg flex items-center justify-center mb-3 cursor-pointer group relative">
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                          <span className="text-lg text-gray-800">▶</span>
                        </div>
                      </div>
                      <span className="text-3xl">👦</span>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-1">Ankit Mondal</h5>
                    <p className="text-xs text-gray-600 mb-2">Young Artisan</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      "I'm learning from my father to continue our family tradition. Technology helps us reach global markets."
                    </p>
                  </div>
                </div>
              </div>

              {/* Handloom Process Images */}
              <div className="mt-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">The Art of Weaving</h4>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-blue-200 to-indigo-300 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🧶</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-xs text-center px-2">Thread Preparation</span>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚙️</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-xs text-center px-2">Loom Setup</span>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-green-200 to-teal-300 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">✋</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-xs text-center px-2">Hand Weaving</span>
                    </div>
                  </div>
                  <div className="relative group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">👗</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-xs text-center px-2">Finished Sarees</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              About Santipur
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Discover the rich history, spiritual heritage, and cultural traditions that make 
              Santipur a unique center of devotion and craftsmanship in Bengal.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="flex space-x-2 bg-gray-100 p-2 rounded-full">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {renderContent()}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            Experience Santipur's Heritage
          </h2>
          <p className="text-xl text-purple-200 mb-10">
            Visit the sacred temples, witness traditional craftsmanship, and immerse yourself 
            in the spiritual atmosphere that has defined Santipur for centuries.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Plan Your Visit
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-700 transition-all duration-300">
              Explore More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}