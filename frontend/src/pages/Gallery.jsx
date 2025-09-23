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
      year: '16th Century',
      photographer: 'Heritage Documentation Team',
      gradient: 'from-amber-200 to-orange-300',
      icon: '🏛️'
    },
    {
      id: 2,
      category: 'heritage',
      title: 'Ancient Ghat Architecture',
      description: 'Traditional river ghat with centuries-old stone work',
      location: 'Hooghly River Bank',
      year: '18th Century',
      photographer: 'Cultural Heritage Society',
      gradient: 'from-blue-200 to-cyan-300',
      icon: '🏗️'
    },
    {
      id: 3,
      category: 'heritage',
      title: 'Historical Residential Quarter',
      description: 'Traditional Bengali architecture in old town area',
      location: 'Heritage District',
      year: '17th-19th Century',
      photographer: 'Architecture Documentation',
      gradient: 'from-green-200 to-teal-300',
      icon: '🏘️'
    },

    // Temples
    {
      id: 4,
      category: 'temples',
      title: 'Advaita Acharya Samadhi',
      description: 'Sacred resting place of the great devotee',
      location: 'Main Temple Complex',
      deity: 'Advaita Acharya',
      gradient: 'from-yellow-200 to-gold-300',
      icon: '🛕'
    },
    {
      id: 5,
      category: 'temples',
      title: 'Madana Gopala Temple',
      description: 'Beautiful temple dedicated to young Krishna',
      location: 'Temple Street',
      deity: 'Madana Gopala (Krishna)',
      gradient: 'from-purple-200 to-pink-300',
      icon: '🕌'
    },
    {
      id: 6,
      category: 'temples',
      title: 'Gopal Jiu Mandir',
      description: 'Community temple with regular cultural programs',
      location: 'Community Center',
      deity: 'Gopal Jiu (Krishna)',
      gradient: 'from-indigo-200 to-blue-300',
      icon: '🏮'
    },
    {
      id: 7,
      category: 'temples',
      title: 'Nityananda Temple',
      description: 'Sacred temple of Lord Nityananda',
      location: 'Spiritual Quarter',
      deity: 'Lord Nityananda',
      gradient: 'from-rose-200 to-pink-300',
      icon: '⛩️'
    },

    // Statues & Monuments
    {
      id: 8,
      category: 'statues',
      title: 'Sri Chaitanya Mahaprabhu Statue',
      description: 'Magnificent statue of the great saint',
      location: 'Town Square',
      material: 'White Marble',
      gradient: 'from-gray-200 to-slate-300',
      icon: '🗿'
    },
    {
      id: 9,
      category: 'statues',
      title: 'Advaita Acharya Memorial',
      description: 'Memorial statue in the temple courtyard',
      location: 'Temple Courtyard',
      material: 'Stone Carving',
      gradient: 'from-orange-200 to-red-300',
      icon: '⚱️'
    },

    // Normal Places
    {
      id: 10,
      category: 'places',
      title: 'Santipur Railway Station',
      description: 'Historic railway station connecting to Kolkata',
      location: 'Station Road',
      built: '1950s',
      gradient: 'from-blue-200 to-indigo-300',
      icon: '🚉'
    },
    {
      id: 11,
      category: 'places',
      title: 'Local Market Square',
      description: 'Bustling marketplace with traditional goods',
      location: 'Market Area',
      speciality: 'Handloom Products',
      gradient: 'from-green-200 to-emerald-300',
      icon: '🏪'
    },
    {
      id: 12,
      category: 'places',
      title: 'Hooghly River View',
      description: 'Scenic view of the holy river',
      location: 'River Bank',
      timing: 'Best at Sunrise',
      gradient: 'from-sky-200 to-blue-300',
      icon: '🏞️'
    },

    // Restaurants
    {
      id: 13,
      category: 'restaurants',
      title: 'Bengali Bhojanalaya',
      description: 'Traditional Bengali cuisine restaurant',
      location: 'Main Street',
      specialty: 'Fish Curry & Rice',
      gradient: 'from-yellow-200 to-orange-300',
      icon: '🍽️'
    },
    {
      id: 14,
      category: 'restaurants',
      title: 'Sweets Corner',
      description: 'Famous for traditional Bengali sweets',
      location: 'Market Complex',
      specialty: 'Rasgulla & Sandesh',
      gradient: 'from-pink-200 to-rose-300',
      icon: '🍰'
    },

    // Parks & Gardens
    {
      id: 15,
      category: 'parks',
      title: 'Community Garden',
      description: 'Peaceful garden for morning walks',
      location: 'Residential Area',
      features: 'Lotus Pond & Walking Path',
      gradient: 'from-green-200 to-lime-300',
      icon: '🌳'
    },
    {
      id: 16,
      category: 'parks',
      title: 'Children\'s Park',
      description: 'Family-friendly park with play area',
      location: 'New Town',
      features: 'Playground & Open Space',
      gradient: 'from-teal-200 to-cyan-300',
      icon: '🎠'
    }
  ]

  const videos = [
    {
      id: 1,
      category: 'festivals',
      title: 'Ras Yatra Celebration 2023',
      description: 'Grand Ras Yatra festival with thousands of devotees',
      duration: '12:45',
      views: '25K',
      gradient: 'from-purple-200 to-pink-300',
      icon: '🎭'
    },
    {
      id: 2,
      category: 'festivals',
      title: 'Dol Jatra (Holi) Colors',
      description: 'Vibrant Holi celebration in temple premises',
      duration: '8:30',
      views: '18K',
      gradient: 'from-red-200 to-yellow-300',
      icon: '🎨'
    },
    {
      id: 3,
      category: 'temples',
      title: 'Advaita Acharya Temple Tour',
      description: 'Complete guided tour of the main temple',
      duration: '15:20',
      views: '42K',
      gradient: 'from-amber-200 to-orange-300',
      icon: '🛕'
    },
    {
      id: 4,
      category: 'temples',
      title: 'Morning Aarti Ceremony',
      description: 'Daily morning prayers at various temples',
      duration: '6:15',
      views: '12K',
      gradient: 'from-yellow-200 to-gold-300',
      icon: '🕯️'
    },
    {
      id: 5,
      category: 'culture',
      title: 'Traditional Kirtan Session',
      description: 'Community devotional singing gathering',
      duration: '22:10',
      views: '8.5K',
      gradient: 'from-blue-200 to-indigo-300',
      icon: '🎵'
    },
    {
      id: 6,
      category: 'culture',
      title: 'Classical Dance Performance',
      description: 'Bharatanatyam performance during festival',
      duration: '9:45',
      views: '15K',
      gradient: 'from-pink-200 to-rose-300',
      icon: '💃'
    },
    {
      id: 7,
      category: 'handloom',
      title: 'Santipuri Saree Weaving',
      description: 'Master weaver demonstrates traditional techniques',
      duration: '18:30',
      views: '35K',
      gradient: 'from-teal-200 to-cyan-300',
      icon: '🧵'
    },
    {
      id: 8,
      category: 'handloom',
      title: 'From Thread to Saree',
      description: 'Complete process of handloom saree creation',
      duration: '25:15',
      views: '28K',
      gradient: 'from-green-200 to-emerald-300',
      icon: '👗'
    },
    {
      id: 9,
      category: 'interviews',
      title: 'Temple Priest Interview',
      description: 'Pandit shares insights about temple history',
      duration: '14:20',
      views: '9K',
      gradient: 'from-orange-200 to-red-300',
      icon: '🎤'
    },
    {
      id: 10,
      category: 'interviews',
      title: 'Master Artisan Story',
      description: 'Veteran weaver talks about his craft',
      duration: '11:40',
      views: '12K',
      gradient: 'from-indigo-200 to-purple-300',
      icon: '👨‍🎨'
    }
  ]

  const currentCategories = activeTab === 'photos' ? photoCategories : videoCategories
  const currentMedia = activeTab === 'photos' ? photos : videos
  const filteredMedia = selectedCategory === 'all' 
    ? currentMedia 
    : currentMedia.filter(item => item.category === selectedCategory)

  const MediaModal = ({ media, onClose }) => {
    if (!media) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className={`bg-gradient-to-r ${media.gradient} p-8 text-gray-800 rounded-t-3xl relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <span className="text-2xl text-white">&times;</span>
            </button>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-3xl">
                {media.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold font-serif">{media.title}</h2>
                <p className="text-lg opacity-80">{media.description}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className={`aspect-video bg-gradient-to-br ${media.gradient} rounded-xl flex items-center justify-center mb-6 relative cursor-pointer group`}>
                  <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-gray-800">{activeTab === 'videos' ? '▶' : '🔍'}</span>
                    </div>
                  </div>
                  <span className="text-6xl opacity-70">{media.icon}</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Details</h3>
                <div className="space-y-4">
                  {media.location && (
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span className="text-gray-700"><strong>Location:</strong> {media.location}</span>
                    </div>
                  )}
                  {media.year && (
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      <span className="text-gray-700"><strong>Year:</strong> {media.year}</span>
                    </div>
                  )}
                  {media.deity && (
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <span className="text-gray-700"><strong>Deity:</strong> {media.deity}</span>
                    </div>
                  )}
                  {media.photographer && (
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      <span className="text-gray-700"><strong>Photographer:</strong> {media.photographer}</span>
                    </div>
                  )}
                  {media.duration && (
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      <span className="text-gray-700"><strong>Duration:</strong> {media.duration}</span>
                    </div>
                  )}
                  {media.views && (
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                      <span className="text-gray-700"><strong>Views:</strong> {media.views}</span>
                    </div>
                  )}
                  {media.specialty && (
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                      <span className="text-gray-700"><strong>Specialty:</strong> {media.specialty}</span>
                    </div>
                  )}
                  {media.features && (
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                      <span className="text-gray-700"><strong>Features:</strong> {media.features}</span>
                    </div>
                  )}
                </div>
              </div>
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
                    <span>{media.location || media.views}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded capitalize">
                      {currentCategories.find(cat => cat.id === media.category)?.label.replace(/s$/, '') || media.category}
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