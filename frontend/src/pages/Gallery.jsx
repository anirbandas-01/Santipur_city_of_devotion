import { useState, useEffect } from 'react'

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('photos')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMedia, setSelectedMedia] = useState(null)

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

  // Reset animations when category changes
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('.media-reveal').forEach(el => {
        el.classList.remove('visible')
      })
      
      setTimeout(() => {
        document.querySelectorAll('.media-reveal').forEach(el => {
          el.classList.add('visible')
        })
      }, 50)
    }, 100)
  }, [selectedCategory, activeTab])

  const photoCategories = [
    { id: 'all', label: 'All Photos', icon: '📸' },
    { id: 'heritage', label: 'Heritage Places', icon: '🏛️' },
    { id: 'temples', label: 'Temples', icon: '🛕' },
    { id: 'statues', label: 'Statues & Monuments', icon: '🗿' },
    { id: 'places', label: 'Normal Places', icon: '🏞️' },
    { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
    { id: 'parks', label: 'Parks & Gardens', icon: '🌳' }
  ]

  const videoCategories = [
    { id: 'all', label: 'All Videos', icon: '🎥' },
    { id: 'festivals', label: 'Festivals', icon: '🎭' },
    { id: 'temples', label: 'Temple Tours', icon: '🛕' },
    { id: 'culture', label: 'Cultural Events', icon: '🎪' },
    { id: 'handloom', label: 'Handloom Process', icon: '🧵' },
    { id: 'interviews', label: 'Interviews', icon: '🎤' }
  ]

  const photos = [
    // Heritage Places
    {
      id: 1,
      category: 'heritage',
      title: 'Advaita Acharya Temple Complex',
      description: 'Historic temple complex dating back to the 16th century',
      location: 'Central Santipur',
      gradient: 'from-amber-200 to-orange-300',
      icon: '🏛️',
      mediaCount: '12 photos',
      collection: [
        { type: 'photo', title: 'Temple Exterior', description: 'Main entrance and architectural facade' },
        { type: 'photo', title: 'Inner Sanctum', description: 'Sacred altar and deity chamber' },
        { type: 'photo', title: 'Courtyard View', description: 'Traditional temple courtyard with devotees' },
        { type: 'photo', title: 'Ancient Carvings', description: 'Detailed stone work and sculptures' },
        { type: 'photo', title: 'Evening Aarti', description: 'Daily evening prayer ceremony' },
        { type: 'photo', title: 'Festival Decorations', description: 'Temple adorned during Ras Yatra' },
        { type: 'photo', title: 'Samadhi Shrine', description: 'Sacred resting place of Advaita Acharya' },
        { type: 'photo', title: 'Prayer Hall', description: 'Devotees gathered for kirtan' },
        { type: 'photo', title: 'Temple Bell', description: 'Ancient brass bell used in ceremonies' },
        { type: 'photo', title: 'Sacred Tulsi Garden', description: 'Holy basil plants in temple premises' },
        { type: 'photo', title: 'Manuscript Collection', description: 'Ancient texts preserved in temple' },
        { type: 'photo', title: 'Dawn Prayers', description: 'Early morning devotional activities' }
      ]
    },
    {
      id: 2,
      category: 'heritage',
      title: 'Ancient Ghat Architecture',
      description: 'Traditional river ghat with centuries-old stone work',
      location: 'Hooghly River Bank',
      gradient: 'from-blue-200 to-cyan-300',
      icon: '🏗️',
      mediaCount: '8 photos',
      collection: [
        { type: 'photo', title: 'Stone Steps', description: 'Ancient stone steps leading to river' },
        { type: 'photo', title: 'River View', description: 'Panoramic view of Hooghly River' },
        { type: 'photo', title: 'Morning Rituals', description: 'Devotees performing river prayers' },
        { type: 'photo', title: 'Sunset Reflection', description: 'Beautiful evening light on water' },
        { type: 'photo', title: 'Architectural Details', description: 'Intricate stonework and carvings' },
        { type: 'photo', title: 'Boat Activities', description: 'Traditional boats at the ghat' },
        { type: 'photo', title: 'Festival Gathering', description: 'Community celebrations at ghat' },
        { type: 'photo', title: 'Historical Inscriptions', description: 'Ancient text carved in stone' }
      ]
    },

    // Temples
    {
      id: 3,
      category: 'temples',
      title: 'Madana Gopala Temple',
      description: 'Beautiful temple dedicated to young Krishna',
      location: 'Temple Street',
      gradient: 'from-purple-200 to-pink-300',
      icon: '🕌',
      mediaCount: '9 photos',
      collection: [
        { type: 'photo', title: 'Main Deity', description: 'Beautiful murti of Madana Gopala' },
        { type: 'photo', title: 'Temple Architecture', description: 'Traditional Bengali temple design' },
        { type: 'photo', title: 'Decorative Elements', description: 'Intricate terracotta work' },
        { type: 'photo', title: 'Prayer Ceremony', description: 'Daily worship rituals' },
        { type: 'photo', title: 'Festival Celebration', description: 'Janmashtami decorations' },
        { type: 'photo', title: 'Devotee Gathering', description: 'Community prayers and kirtan' },
        { type: 'photo', title: 'Temple Gardens', description: 'Beautiful landscaped surroundings' },
        { type: 'photo', title: 'Sacred Offerings', description: 'Flowers and prasadam preparation' },
        { type: 'photo', title: 'Evening Lighting', description: 'Temple illuminated at dusk' }
      ]
    },
    {
      id: 4,
      category: 'temples',
      title: 'Gopal Jiu Mandir',
      description: 'Community temple with regular cultural programs',
      location: 'Community Center',
      gradient: 'from-indigo-200 to-blue-300',
      icon: '🏮',
      mediaCount: '7 photos',
      collection: [
        { type: 'photo', title: 'Temple Facade', description: 'Modern renovation with traditional elements' },
        { type: 'photo', title: 'Community Hall', description: 'Large space for gatherings' },
        { type: 'photo', title: 'Cultural Performance', description: 'Dance program during festival' },
        { type: 'photo', title: 'Kitchen Area', description: 'Community kitchen serving prasadam' },
        { type: 'photo', title: 'Musical Instruments', description: 'Traditional dhol and khol' },
        { type: 'photo', title: 'Children\'s Programs', description: 'Young devotees learning' },
        { type: 'photo', title: 'Community Service', description: 'Volunteer activities and charity' }
      ]
    },

    // Restaurants
    {
      id: 5,
      category: 'restaurants',
      title: 'Bengali Bhojanalaya',
      description: 'Traditional Bengali cuisine restaurant',
      location: 'Main Street',
      gradient: 'from-yellow-200 to-orange-300',
      icon: '🍽️',
      mediaCount: '6 photos',
      collection: [
        { type: 'photo', title: 'Restaurant Interior', description: 'Traditional decor with wooden furniture' },
        { type: 'photo', title: 'Fish Curry Special', description: 'Famous Bengali fish preparation' },
        { type: 'photo', title: 'Kitchen Area', description: 'Traditional cooking methods' },
        { type: 'photo', title: 'Dining Experience', description: 'Families enjoying meals' },
        { type: 'photo', title: 'Chef at Work', description: 'Master chef preparing specialties' },
        { type: 'photo', title: 'Local Ingredients', description: 'Fresh fish and vegetables' }
      ]
    },
    {
      id: 6,
      category: 'restaurants',
      title: 'Sweets Corner',
      description: 'Famous for traditional Bengali sweets',
      location: 'Market Complex',
      gradient: 'from-pink-200 to-rose-300',
      icon: '🍰',
      mediaCount: '5 photos',
      collection: [
        { type: 'photo', title: 'Sweet Display', description: 'Variety of Bengali sweets showcase' },
        { type: 'photo', title: 'Rasgulla Making', description: 'Traditional preparation process' },
        { type: 'photo', title: 'Shop Interior', description: 'Traditional sweet shop atmosphere' },
        { type: 'photo', title: 'Festival Specials', description: 'Special sweets for celebrations' },
        { type: 'photo', title: 'Customer Experience', description: 'Locals enjoying fresh sweets' }
      ]
    },

    // Parks
    {
      id: 7,
      category: 'parks',
      title: 'Community Garden',
      description: 'Peaceful garden for morning walks',
      location: 'Residential Area',
      gradient: 'from-green-200 to-lime-300',
      icon: '🌳',
      mediaCount: '8 photos',
      collection: [
        { type: 'photo', title: 'Garden Entrance', description: 'Welcome gate and pathway' },
        { type: 'photo', title: 'Lotus Pond', description: 'Beautiful water feature with lotuses' },
        { type: 'photo', title: 'Walking Path', description: 'Paved walkway through gardens' },
        { type: 'photo', title: 'Morning Exercises', description: 'Community yoga and walking' },
        { type: 'photo', title: 'Flower Beds', description: 'Seasonal flower arrangements' },
        { type: 'photo', title: 'Meditation Area', description: 'Quiet space for reflection' },
        { type: 'photo', title: 'Children Playing', description: 'Kids enjoying garden activities' },
        { type: 'photo', title: 'Evening Gathering', description: 'Community socializing at sunset' }
      ]
    }
  ]

  const videos = [
    {
      id: 1,
      category: 'festivals',
      title: 'Ras Yatra Celebration',
      description: 'Grand Ras Yatra festival with thousands of devotees',
      gradient: 'from-purple-200 to-pink-300',
      icon: '🎭',
      mediaCount: '6 videos',
      collection: [
        { type: 'video', title: 'Opening Ceremony', description: 'Festival inauguration and prayers', duration: '8:45' },
        { type: 'video', title: 'Ras Leela Performance', description: 'Traditional dance drama depicting Krishna\'s life', duration: '15:30' },
        { type: 'video', title: 'Community Kirtan', description: 'Mass devotional singing', duration: '12:20' },
        { type: 'video', title: 'Temple Procession', description: 'Decorated chariots through streets', duration: '18:15' },
        { type: 'video', title: 'Cultural Programs', description: 'Music and dance performances', duration: '22:10' },
        { type: 'video', title: 'Prasadam Distribution', description: 'Community feast and sharing', duration: '9:30' }
      ]
    },
    {
      id: 2,
      category: 'temples',
      title: 'Advaita Acharya Temple Tour',
      description: 'Complete guided tour of the main temple',
      gradient: 'from-amber-200 to-orange-300',
      icon: '🛕',
      mediaCount: '4 videos',
      collection: [
        { type: 'video', title: 'Temple History', description: 'Historical background and significance', duration: '12:45' },
        { type: 'video', title: 'Architecture Tour', description: 'Detailed look at temple structure', duration: '8:30' },
        { type: 'video', title: 'Daily Rituals', description: 'Morning and evening ceremonies', duration: '15:20' },
        { type: 'video', title: 'Devotee Testimonials', description: 'Pilgrims sharing their experiences', duration: '10:15' }
      ]
    },
    {
      id: 3,
      category: 'handloom',
      title: 'Santipuri Saree Weaving',
      description: 'Master weaver demonstrates traditional techniques',
      gradient: 'from-teal-200 to-cyan-300',
      icon: '🧵',
      mediaCount: '5 videos',
      collection: [
        { type: 'video', title: 'Thread Preparation', description: 'Preparing cotton threads for weaving', duration: '6:20' },
        { type: 'video', title: 'Loom Setup', description: 'Setting up traditional pit loom', duration: '8:45' },
        { type: 'video', title: 'Weaving Process', description: 'Master weaver at work', duration: '18:30' },
        { type: 'video', title: 'Pattern Creation', description: 'Creating intricate border designs', duration: '12:15' },
        { type: 'video', title: 'Final Product', description: 'Completed saree showcase', duration: '5:40' }
      ]
    }
  ]

  const currentCategories = activeTab === 'photos' ? photoCategories : videoCategories
  const currentMedia = activeTab === 'photos' ? photos : videos
  const filteredMedia = selectedCategory === 'all' 
    ? currentMedia 
    : currentMedia.filter(item => item.category === selectedCategory)

  const MediaModal = ({ media, onClose }) => {
    if (!media) return null
    const [selectedItem, setSelectedItem] = useState(null)

    const MediaDetailModal = ({ item, onBack }) => {
      if (!item) return null

      return (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={onBack}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span className="text-xl">←</span>
                  <span className="font-medium">Back</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="text-lg">&times;</span>
                </button>
              </div>

              <div className={`aspect-video bg-gradient-to-br ${media.gradient} rounded-xl flex items-center justify-center mb-4 relative cursor-pointer group`}>
                <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gray-800">{item.type === 'video' ? '▶' : '🔍'}</span>
                  </div>
                </div>
                <span className="text-6xl opacity-70">{media.icon}</span>
                {item.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded text-sm">
                    {item.duration}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>From: {media.title}</span>
                  <span>{item.type === 'video' ? '🎥' : '📸'} {item.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (selectedItem) {
      return <MediaDetailModal item={selectedItem} onBack={() => setSelectedItem(null)} />
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
          <div className={`bg-gradient-to-r ${media.gradient} p-6 text-gray-800 rounded-t-3xl relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <span className="text-2xl text-white">&times;</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center text-2xl">
                {media.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold font-serif">{media.title}</h2>
                <p className="text-sm opacity-80">{media.description}</p>
                <p className="text-sm opacity-70 mt-1">{media.location} • {media.mediaCount}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.collection.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-3 cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className={`aspect-video bg-gradient-to-br ${media.gradient} rounded-lg flex items-center justify-center mb-3 relative group`}>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                        <span className="text-sm text-gray-800">{item.type === 'video' ? '▶' : '👁'}</span>
                      </div>
                    </div>
                    <span className="text-2xl opacity-60">{item.type === 'video' ? '🎥' : '📸'}</span>
                    {item.duration && (
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                        {item.duration}
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{item.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Click on any item to view details • Total: {media.collection.length} {activeTab === 'photos' ? 'photos' : 'videos'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-slate-800 to-zinc-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore Santipur through stunning photographs and captivating videos that showcase 
              our rich heritage, vibrant culture, and timeless traditions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-gray-100 p-2 rounded-full">
              <button
                onClick={() => {
                  setActiveTab('photos')
                  setSelectedCategory('all')
                }}
                className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'photos'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                }`}
              >
                <span className="text-lg">📸</span>
                <span>Photos</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('videos')
                  setSelectedCategory('all')
                }}
                className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'videos'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                }`}
              >
                <span className="text-lg">🎥</span>
                <span>Videos</span>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {currentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-bold font-serif text-gray-800 mb-4">
              {activeTab === 'photos' ? 'Photo Gallery' : 'Video Collection'}
            </h2>
            <p className="text-lg text-gray-600">
              {filteredMedia.length} {activeTab} in {currentCategories.find(cat => cat.id === selectedCategory)?.label}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((media, index) => (
              <div
                key={media.id}
                className="media-reveal bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedMedia(media)}
              >
                <div className={`aspect-video bg-gradient-to-br ${media.gradient} flex items-center justify-center relative group`}>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                      <span className="text-lg text-gray-800">{activeTab === 'videos' ? '▶' : '🔍'}</span>
                    </div>
                  </div>
                  <span className="text-4xl opacity-70">{media.icon}</span>
                  {activeTab === 'videos' && media.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {media.duration}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{media.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{media.description}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{media.location}</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                      {media.mediaCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Modal */}
      <MediaModal 
        media={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
      />
    </div>
  )
}