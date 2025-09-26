import { useState, useEffect } from 'react'

export default function SareeMarket() {
  const [selectedMarket, setSelectedMarket] = useState(null)
  const [selectedSareeType, setSelectedSareeType] = useState(null)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [activeGalleryTab, setActiveGalleryTab] = useState('all')

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

  const marketplaces = [
    {
      id: 1,
      name: "Santipur Main Bazaar",
      description: "The heart of handloom trade with over 200 shops selling authentic Santipuri sarees",
      location: {
        address: "College Road, Central Santipur",
        landmark: "Near Advaita Acharya Temple",
        phone: "+91 98765 43210",
        bestTime: "Morning 9 AM - 6 PM"
      },
      specialties: ["Tant Sarees", "Jamdani Work", "Handloom Cotton", "Silk Blends"],
      established: "Since 1800s",
      shopCount: "200+ shops",
      gradient: "from-blue-200 to-cyan-300",
      icon: "🏪",
      mediaCount: "25 photos, 4 videos",
      priceRange: "₹800 - ₹5000",
      features: [
        "Largest collection of traditional sarees",
        "Direct from weavers - authentic quality",
        "Custom orders and bulk purchases available",
        "Heritage shops with generations of experience"
      ],
      mediaCollection: [
        { type: 'photo', title: 'Bazaar Entrance', description: 'Main entrance bustling with shoppers' },
        { type: 'photo', title: 'Saree Displays', description: 'Colorful sarees hanging in shop fronts' },
        { type: 'photo', title: 'Traditional Weaver', description: 'Master weaver demonstrating techniques' },
        { type: 'photo', title: 'Tant Saree Collection', description: 'Wide variety of tant sarees' },
        { type: 'photo', title: 'Customer Shopping', description: 'Families selecting sarees' },
        { type: 'video', title: 'Bazaar Tour', description: 'Walking tour of the main market', duration: '12:30' },
        { type: 'video', title: 'Weaving Demo', description: 'Live weaving demonstration', duration: '8:45' }
      ]
    },
    {
      id: 2,
      name: "Hatkhola Market",
      description: "Traditional market known for premium Jamdani and Dhakai sarees with intricate patterns",
      location: {
        address: "Hatkhola Road, Old Santipur",
        landmark: "Near Railway Station",
        phone: "+91 97654 32108",
        bestTime: "Tuesday, Friday, Sunday (Market Days)"
      },
      specialties: ["Jamdani Sarees", "Dhakai Patterns", "Premium Silk", "Bridal Collections"],
      established: "Since 1850s",
      shopCount: "80+ stalls",
      gradient: "from-purple-200 to-pink-300",
      icon: "🧵",
      mediaCount: "18 photos, 3 videos",
      priceRange: "₹1500 - ₹8000",
      features: [
        "Specialized in Jamdani weaving techniques",
        "Weekly market with fresh collections",
        "Expert artisans available for consultation",
        "Competitive prices due to direct sales"
      ],
      mediaCollection: [
        { type: 'photo', title: 'Market Scene', description: 'Bustling weekly market atmosphere' },
        { type: 'photo', title: 'Jamdani Patterns', description: 'Intricate geometric designs' },
        { type: 'photo', title: 'Weaver at Work', description: 'Artisan creating Jamdani patterns' },
        { type: 'photo', title: 'Premium Collection', description: 'High-end bridal sarees' },
        { type: 'video', title: 'Jamdani Technique', description: 'Traditional weaving methods', duration: '15:20' }
      ]
    },
    {
      id: 3,
      name: "Phulia Handloom Center",
      description: "Modern cooperative showcasing contemporary designs while preserving traditional techniques",
      location: {
        address: "Phulia Village, 8km from Santipur",
        landmark: "Near Phulia Bus Stand",
        phone: "+91 96543 21087",
        bestTime: "10 AM - 5 PM (Closed Sundays)"
      },
      specialties: ["Contemporary Designs", "Export Quality", "Organic Cotton", "Designer Collections"],
      established: "Since 1990s",
      shopCount: "50+ cooperatives",
      gradient: "from-green-200 to-emerald-300",
      icon: "🌿",
      mediaCount: "22 photos, 2 videos",
      priceRange: "₹1200 - ₹6000",
      features: [
        "Modern designs with traditional base",
        "Fair trade practices with weavers",
        "Quality certification and export facilities",
        "Workshop visits and educational tours"
      ],
      mediaCollection: [
        { type: 'photo', title: 'Cooperative Center', description: 'Modern facility with traditional looms' },
        { type: 'photo', title: 'Contemporary Designs', description: 'Fusion of modern and traditional patterns' },
        { type: 'photo', title: 'Quality Control', description: 'Checking finished products' },
        { type: 'photo', title: 'Export Collection', description: 'International quality handloom sarees' },
        { type: 'video', title: 'Cooperative Story', description: 'How modern cooperatives work', duration: '11:40' }
      ]
    }
  ]

  const sareeTypes = [
    {
      id: 1,
      name: "Tant Saree",
      description: "Traditional handwoven cotton sarees known for their comfort and durability",
      origin: "Bengal's signature handloom creation",
      characteristics: ["Lightweight cotton fabric", "Distinctive borders", "Natural comfort", "Everyday wear"],
      priceRange: "₹800 - ₹2500",
      weavingTime: "3-5 days",
      gradient: "from-yellow-200 to-orange-300",
      icon: "🧡",
      colors: ["Traditional Red & White", "Blue & White", "Green & Gold", "Multicolored"],
      occasions: ["Daily wear", "Festivals", "Casual events", "Office wear"],
      careInstructions: "Hand wash recommended, dry in shade, medium iron heat"
    },
    {
      id: 2,
      name: "Jamdani Saree",
      description: "Intricate geometric patterns woven into fine cotton, UNESCO heritage craft",
      origin: "Ancient Dhaka tradition preserved in Bengal",
      characteristics: ["Geometric motifs", "Fine cotton base", "Supplementary weft", "Labor intensive"],
      priceRange: "₹2000 - ₹10000",
      weavingTime: "2-4 weeks",
      gradient: "from-blue-200 to-purple-300",
      icon: "💎",
      colors: ["White with colored motifs", "Natural cotton base", "Gold thread work", "Silver accents"],
      occasions: ["Weddings", "Special ceremonies", "Cultural events", "Formal occasions"],
      careInstructions: "Dry clean preferred, store flat, avoid direct sunlight"
    },
    {
      id: 3,
      name: "Dhakai Saree",
      description: "Fine muslin sarees with elaborate borders and traditional patterns",
      origin: "Heritage of ancient Dhaka weavers",
      characteristics: ["Ultra-fine cotton", "Elaborate borders", "Traditional motifs", "Premium quality"],
      priceRange: "₹3000 - ₹15000",
      weavingTime: "3-6 weeks",
      gradient: "from-pink-200 to-rose-300",
      icon: "👑",
      colors: ["Ivory white", "Pastel shades", "Rich borders", "Metallic threads"],
      occasions: ["Bridal wear", "Formal events", "Cultural functions", "Special celebrations"],
      careInstructions: "Professional cleaning only, careful storage, minimal handling"
    },
    {
      id: 4,
      name: "Handloom Silk",
      description: "Pure silk sarees with traditional patterns and contemporary designs",
      origin: "Modern Bengal silk weaving tradition",
      characteristics: ["Pure silk threads", "Rich texture", "Lustrous finish", "Durability"],
      priceRange: "₹2500 - ₹8000",
      weavingTime: "1-3 weeks",
      gradient: "from-amber-200 to-gold-300",
      icon: "✨",
      colors: ["Rich jewel tones", "Traditional combinations", "Modern palettes", "Zari work"],
      occasions: ["Weddings", "Festivals", "Evening events", "Special occasions"],
      careInstructions: "Dry clean only, proper storage, avoid moisture"
    }
  ]

  const galleryImages = [
    { category: 'tant', title: 'Traditional Tant Collection', description: 'Classic red and white tant sarees', type: 'photo' },
    { category: 'tant', title: 'Modern Tant Designs', description: 'Contemporary colors and patterns', type: 'photo' },
    { category: 'jamdani', title: 'Jamdani Masterpiece', description: 'Intricate geometric patterns', type: 'photo' },
    { category: 'jamdani', title: 'Weaving Process', description: 'Creating jamdani motifs', type: 'video', duration: '6:30' },
    { category: 'dhakai', title: 'Dhakai Elegance', description: 'Fine muslin with gold borders', type: 'photo' },
    { category: 'silk', title: 'Silk Collection', description: 'Rich silk sarees with zari work', type: 'photo' },
    { category: 'process', title: 'Loom Setup', description: 'Traditional pit loom preparation', type: 'photo' },
    { category: 'process', title: 'Master Weaver', description: 'Experienced artisan at work', type: 'video', duration: '9:15' },
    { category: 'market', title: 'Bazaar Shopping', description: 'Customers selecting sarees', type: 'photo' },
    { category: 'heritage', title: 'Heritage Display', description: 'Antique sarees in museum', type: 'photo' }
  ]

  const filteredGallery = activeGalleryTab === 'all' 
    ? galleryImages 
    : galleryImages.filter(item => item.category === activeGalleryTab)

  // Market Detail Modal
  const MarketModal = ({ market, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview')
    
    if (!market) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className={`bg-gradient-to-r ${market.gradient} p-6 rounded-t-3xl relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <span className="text-2xl text-white">×</span>
            </button>
            
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-3xl">
                {market.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold font-serif text-gray-800 mb-2">{market.name}</h2>
                <p className="text-lg text-gray-700 mb-2">{market.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-700">
                  <span>{market.shopCount}</span>
                  <span>{market.established}</span>
                  <span>{market.priceRange}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'photos', label: 'Photos & Videos' },
                { id: 'location', label: 'Location & Contact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {market.specialties.map((specialty, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Market Features</h3>
                  <ul className="space-y-2">
                    {market.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {market.mediaCollection.map((media, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-3 cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => setSelectedMedia({ ...media, market })}
                  >
                    <div className={`aspect-video bg-gradient-to-br ${market.gradient} rounded-lg flex items-center justify-center mb-3 relative group`}>
                      <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                          <span className="text-sm text-gray-800">{media.type === 'video' ? '▶' : '👁'}</span>
                        </div>
                      </div>
                      <span className="text-2xl opacity-60">{media.type === 'video' ? '🎥' : '📸'}</span>
                      {media.duration && (
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                          {media.duration}
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{media.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{media.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                      <p className="text-gray-700">{market.location.address}</p>
                      <p className="text-sm text-gray-600 mt-1">{market.location.landmark}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Contact & Hours</h4>
                      <p className="text-gray-700">{market.location.phone}</p>
                      <p className="text-gray-700">{market.location.bestTime}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-green-100 h-64 rounded-lg flex items-center justify-center cursor-pointer">
                  <div className="text-center">
                    <span className="text-4xl">🗺️</span>
                    <p className="text-gray-600 mt-2">View on Map</p>
                    <p className="text-sm text-gray-500">Get directions to {market.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Saree Type Detail Modal
  const SareeTypeModal = ({ sareeType, onClose }) => {
    if (!sareeType) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className={`bg-gradient-to-r ${sareeType.gradient} p-8 rounded-t-3xl relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <span className="text-2xl text-white">×</span>
            </button>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-3xl">
                {sareeType.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold font-serif text-gray-800">{sareeType.name}</h2>
                <p className="text-lg text-gray-700">{sareeType.origin}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{sareeType.description}</p>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">Characteristics</h3>
                <ul className="space-y-2 mb-6">
                  {sareeType.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                      <span className="text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-gray-800 mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {sareeType.colors.map((color, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Price Range</p>
                    <p className="font-bold text-blue-700">{sareeType.priceRange}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Weaving Time</p>
                    <p className="font-bold text-green-700">{sareeType.weavingTime}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">Best Occasions</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {sareeType.occasions.map((occasion, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {occasion}
                    </span>
                  ))}
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Care Instructions</h4>
                  <p className="text-sm text-gray-700">{sareeType.careInstructions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Santipur Saree Markets
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover the heritage of handloom sarees in Santipur, known for centuries for exquisite 
              Tant and Jamdani weaving since the time of Sri Chaitanya Mahaprabhu.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-6">Heritage of Handloom</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Santipur has been renowned for its handloom sarees for centuries, particularly the lightweight 
              Tant sarees and intricate Jamdani work. The weaving community here has preserved ancient 
              techniques while adapting to contemporary designs, creating a perfect blend of tradition and modernity.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="scroll-reveal">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🏪</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">300+</h3>
              <p className="text-gray-600">Active Shops</p>
            </div>
            <div className="scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">5000+</h3>
              <p className="text-gray-600">Skilled Weavers</p>
            </div>
            <div className="scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🧵</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">200+</h3>
              <p className="text-gray-600">Years Heritage</p>
            </div>
            <div className="scroll-reveal" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">50+</h3>
              <p className="text-gray-600">Countries Export</p>
            </div>
          </div>
        </div>
      </section>

      {/* Saree Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-6">
              Types of Santipuri Sarees
            </h2>
            <p className="text-xl text-gray-600">
              Each type represents centuries of weaving expertise and cultural heritage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sareeTypes.map((saree, index) => (
              <div
                key={saree.id}
                className="scroll-reveal bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedSareeType(saree)}
              >
                <div className={`h-40 bg-gradient-to-br ${saree.gradient} rounded-t-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                  <span className="text-4xl">{saree.icon}</span>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{saree.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{saree.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-green-600 font-medium">{saree.priceRange}</span>
                    <span className="text-gray-500">{saree.weavingTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-6">
              Saree Gallery
            </h2>
            <p className="text-xl text-gray-600">
              Visual journey through Santipur's handloom heritage
            </p>
          </div>

          {/* Gallery Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 scroll-reveal">
            {[
              { id: 'all', label: 'All', icon: '🎨' },
              { id: 'tant', label: 'Tant', icon: '🧡' },
              { id: 'jamdani', label: 'Jamdani', icon: '💎' },
              { id: 'dhakai', label: 'Dhakai', icon: '👑' },
              { id: 'silk', label: 'Silk', icon: '✨' },
              { id: 'process', label: 'Weaving', icon: '🧵' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveGalleryTab(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeGalleryTab === filter.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={index}
                className="scroll-reveal bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedMedia({ ...item, gallery: true })}
              >
                <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                      <span className="text-lg text-gray-800">{item.type === 'video' ? '▶' : '👁'}</span>
                    </div>
                  </div>
                  <span className="text-4xl opacity-60">{item.type === 'video' ? '🎥' : '📸'}</span>
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {item.duration}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-1 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            Experience Handloom Heritage
          </h2>
          <p className="text-xl text-purple-200 mb-10">
            Visit Santipur's markets to witness the artistry of traditional weaving and take home 
            a piece of Bengal's cultural heritage. Support local artisans and preserve ancient crafts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Plan Market Visit
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-700 transition-all duration-300">
              Contact Weavers
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <MarketModal 
        market={selectedMarket} 
        onClose={() => setSelectedMarket(null)} 
      />
      
      <SareeTypeModal 
        sareeType={selectedSareeType} 
        onClose={() => setSelectedSareeType(null)} 
      />

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span className="text-xl">←</span>
                  <span className="font-medium">Back</span>
                </button>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="text-lg">×</span>
                </button>
              </div>

              <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-300 rounded-xl flex items-center justify-center mb-4 relative cursor-pointer group">
                <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gray-800">{selectedMedia.type === 'video' ? '▶' : '🔍'}</span>
                  </div>
                </div>
                <span className="text-6xl opacity-70">{selectedMedia.type === 'video' ? '🎥' : '📸'}</span>
                {selectedMedia.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded text-sm">
                    {selectedMedia.duration}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedMedia.title}</h3>
              <p className="text-gray-600 mb-4">{selectedMedia.description}</p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {selectedMedia.market ? `From: ${selectedMedia.market.name}` : 'Santipur Handloom Gallery'}
                  </span>
                  <span>{selectedMedia.type === 'video' ? '🎥' : '📸'} {selectedMedia.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
      {/* Marketplaces Section - removed invalid HTML and comments */}
            
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-6">
              Major Saree Markets
            </h2>
            <p className="text-xl text-gray-600">
              Explore the traditional marketplaces where authentic handloom sarees are sold
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           
            <div className="scroll-reveal bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <span className="block text-2xl mb-2">👁️</span>
                    <span className="text-sm font-medium">View Details</span>
                  </div>
                </div>
                <span className="text-6xl opacity-70">🛍️</span>
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                  50 Shops
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Bazaar Name</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  Description of the market goes here.
                </p>
                
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-gray-500">₹500 - ₹5000</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    10 Media
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <span>📍 Near Main Road</span>
                  </div>
                </div>
              </div>
            </div>
         
          </div>
        </div>
      </section>