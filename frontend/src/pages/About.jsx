import React, { useState } from 'react';
import { ChevronRight, Play, X, Info, Calendar, Heart, Users, Award, MapPin, Book, Sunrise, Building } from 'lucide-react';

// CLOUDINARY VIDEO
const cloudinaryVideo = {
  santipurJourney: "https://res.cloudinary.com/dd5jhb6pf/video/upload/v1759861536/Santipur_full_umcwd0.mp4",
  santipurtath: "https://res.cloudinary.com/dd5jhb6pf/video/upload/v1760456854/santipur_tath.mp4"
};

export default function About() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Navigation sections
  const sections = [
    { id: 'welcome', label: 'Welcome', icon: Heart },
    { id: 'legacy', label: 'Legacy', icon: Calendar },
    { id: 'culture', label: 'Culture', icon: Award },
    { id: 'landmarks', label: 'Landmarks', icon: MapPin },
    { id: 'modern', label: 'Modern', icon: Building },
    { id: 'spirit', label: 'Spirit', icon: Users }
  ];

  // Video data
  const videos = {
    heritage: [
      {
        id: 1,
        title: 'Santipur: A Journey Through Time',
        thumbnail: "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759867443/WhatsApp_Image_2025-10-08_at_01.31.30_230d8ce8_hrtjbm.jpg",
        description: 'Explore the rich heritage and culture of Santipur',
        videoUrl: cloudinaryVideo.santipurJourney
      }
    ],
    weaving: [
      {
        id: 2,
        title: 'Master Weaver at Work',
        thumbnail: "https://res.cloudinary.com/dd5jhb6pf/video/upload/so_180,w_400,h_250,c_fill,f_jpg,q_80/v1760456854/santipur_tath.jpg",
        description: 'Watch the intricate process of Tant saree weaving',
        videoUrl: cloudinaryVideo.santipurtath
      }
    ]
  };

  // Timeline data
  const timeline = [
    { 
      era: 'Ancient Era', 
      period: 'Before 1400', 
      description: 'Settlements along the holy Ganga, development of Hindu cultural traditions and religious practices',
      icon: '🕉️'
    },
    { 
      era: 'Medieval Glory', 
      period: '1381-1486', 
      description: 'Birth of Krittibas Ojha (1381) in Bathna. Advaita Acharya establishes Santipur as spiritual center. Sri Chaitanya Mahaprabhu visits and blesses the town',
      icon: '📜'
    },
    { 
      era: 'Colonial Period', 
      period: '1700-1947', 
      description: 'Handloom industry flourishes, Santipur becomes renowned for Tant sarees and Jamdani weaving. Cultural renaissance period',
      icon: '🧵'
    },
    { 
      era: 'Modern Era', 
      period: '1947-Present', 
      description: 'Preservation of heritage while embracing development. Educational institutions flourish, weaving tradition continues',
      icon: '🌟'
    }
  ];

  // Cultural highlights
  const culturalHighlights = [
    { 
      icon: '🎵', 
      title: 'Sankirtana Movement',
      description: 'Birthplace of congregational devotional singing that transformed Bengali spirituality'
    },
    { 
      icon: '🧵', 
      title: 'Handloom Capital',
      description: 'Famous across Bengal for exquisite Tant, Jamdani, and Dhakai sarees woven with love'
    },
    { 
      icon: '📚', 
      title: 'Literary Heritage',
      description: 'Home to Krittibas Ojha, who translated Ramayana into Bengali, and many scholars'
    },
    { 
      icon: '🏛️', 
      title: 'Spiritual Center',
      description: 'Advaita Acharya\'s birthplace, making it a major pilgrimage site for Vaishnavas'
    }
  ];

  // Landmarks
  const landmarks = [
    {
      name: 'Advaita Acharya Temple',
      description: 'Sacred 15th-century temple where Advaita Acharya lived and practiced devotion',
      icon: '🛕',
      location: 'Central Santipur'
    },
    {
      name: 'Ganga Ghats',
      description: 'Serene river ghats where pilgrims perform rituals and connect with divinity',
      icon: '🌊',
      location: 'Along the Ganges'
    },
    {
      name: 'Bathna Village',
      description: 'Birthplace of Mahakavi Krittibas Ojha, the medieval Bengali poet',
      icon: '📖',
      location: 'Near Santipur'
    },
    {
      name: 'Santipur Haat',
      description: 'Historic weekly market showcasing authentic handloom sarees and local crafts',
      icon: '🏪',
      location: 'Town Center'
    }
  ];

  // Modern institutions
  const institutions = [
    { name: 'Educational Institutes', icon: '🎓', description: 'Schools and colleges nurturing future generations' },
    { name: 'Weaver Cooperatives', icon: '🤝', description: 'Supporting artisans with fair trade and training' },
    { name: 'Cultural Centers', icon: '🎭', description: 'Preserving traditions through music, dance, and art' },
    { name: 'Heritage Projects', icon: '🏛️', description: 'Digitizing and protecting Santipur\'s rich legacy' }
  ];

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Video Modal Component
  const VideoModal = ({ video, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
     onClick={onClose}>
      <div className="relative w-full max-w-4xl"
       onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X size={32} />
        </button>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <video 
            controls
            autoPlay
            className="w-full"
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{video.title}</h3>
            <p className="text-gray-300 text-lg">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Video Thumbnail Component
  const VideoThumbnail = ({ video, onClick }) => {
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    const [useVideoElement, setUseVideoElement] = useState(false);
    
    return (
      <div 
        className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 bg-gray-900"
        onClick={() => onClick(video)}
      >
        {!useVideoElement ? (
          <>
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className={`w-full h-48 object-cover ${thumbnailLoaded ? 'block' : 'hidden'}`}
              onLoad={() => setThumbnailLoaded(true)}
              onError={() => setUseVideoElement(true)}
            />
            {!thumbnailLoaded && (
              <div className="w-full h-48 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 animate-pulse flex items-center justify-center">
                <Play size={48} className="text-white opacity-70" />
              </div>
            )}
          </>
        ) : (
          <video 
            className="w-full h-48 object-cover"
            preload="metadata"
            muted
            playsInline
          >
            <source src={`${video.videoUrl}#t=60`} type="video/mp4" />
          </video>
        )}
        
        <div className="absolute inset-0 bg-opacity-10 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
          <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform shadow-xl">
            <Play size={32} className="text-red-600 fill-red-600" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
          <h4 className="text-white font-semibold text-lg">{video.title}</h4>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Hero Section - Welcome to Santipur */}
      <div className="relative bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-white/20 rounded-full backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wider">Where Heritage Meets Devotion</p>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">Santipur</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-4 opacity-90 font-light">
            A Sacred Town on the Banks of the Holy Ganga
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-80">
            Nadia District, West Bengal • 80 km from Kolkata
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <span className="text-2xl">🕉️</span>
              <span>Spiritual Heritage</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <span className="text-2xl">🧵</span>
              <span>Weaving Tradition</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <span className="text-2xl">📚</span>
              <span>Literary Legacy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Video Section */}
      <div className="container mx-auto px-4 -mt-16 mb-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Experience Santipur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.heritage.map(video => (
              <VideoThumbnail key={video.id} video={video} onClick={setSelectedVideo} />
            ))}
            {videos.weaving.map(video => (
              <VideoThumbnail key={video.id} video={video} onClick={setSelectedVideo} />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? 'text-orange-600 border-b-4 border-orange-600'
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  <Icon size={20} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-24">
        
        {/* Welcome Section - Emotional Intro */}
        <section id="welcome" className="scroll-mt-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              A Town Where Every Thread Tells a Story
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Santipur is not just a place on the map—it's a living testament to centuries of devotion, artistry, and culture. 
              Nestled along the sacred Ganges in <strong>Nadia District, West Bengal</strong>, just 80 kilometers from Kolkata, 
              this historic town has been the cradle of spiritual awakening and artistic excellence for over six centuries.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From the devotional songs of the Sankirtana movement to the rhythmic clatter of handlooms weaving dreams into fabric, 
              from the sacred footsteps of <strong>Sri Chaitanya Mahaprabhu</strong> to the literary genius of <strong>Krittibas Ojha</strong>, 
              Santipur embodies the soul of Bengal.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {culturalHighlights.map((highlight, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-4 text-center">{highlight.icon}</div>
                <h3 className="text-xl font-bold text-orange-600 mb-3 text-center">{highlight.title}</h3>
                <p className="text-gray-700 text-center">{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legacy Section - Timeline */}
        <section id="legacy" className="scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Legacy Through Ages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Journey through the rich tapestry of Santipur's history, where every era has left an indelible mark
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-400 via-pink-400 to-purple-400"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-3xl font-bold text-orange-600 mb-3">{item.era}</h3>
                    <p className="text-gray-600 font-semibold mb-3 text-lg">{item.period}</p>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>

          {/* Krittibas Ojha Highlight */}
          <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 p-12 rounded-2xl shadow-xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-5xl shadow-lg">
                  📜
                </div>
              </div>
              <h3 className="text-4xl font-bold text-center text-orange-600 mb-4">
                Mahakavi Krittibas Ojha (1381-1461)
              </h3>
              <p className="text-xl text-gray-700 text-center mb-6 leading-relaxed">
                Born in <strong>Bathna, Santipur</strong>, Krittibas Ojha brought the sacred Ramayana to the Bengali masses 
                through his masterpiece <strong>Śrīrām Pāñcālī</strong> (Krittivasi Ramayan). His work transformed Bengali 
                literature and made epic stories accessible to common people in their mother tongue.
              </p>
              <div className="text-center">
                <span className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg">
                  Literary Pioneer of Medieval Bengal
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section id="culture" className="scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Culture & Craftsmanship</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Where ancient traditions meet skilled hands, creating beauty that transcends time
            </p>
          </div>

          {/* Handloom Heritage */}
          <div className="bg-white p-12 rounded-2xl shadow-xl mb-12">
            <h3 className="text-3xl font-bold text-orange-600 mb-8 text-center">The Art of Handloom Weaving</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
                <div className="text-5xl mb-4">🧵</div>
                <h4 className="text-xl font-bold text-orange-600 mb-3">Tant Sarees</h4>
                <p className="text-gray-700">
                  Light, breathable cotton sarees loved across Bengal. Perfect for the tropical climate with vibrant colors and traditional borders.
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                <div className="text-5xl mb-4">✨</div>
                <h4 className="text-xl font-bold text-pink-600 mb-3">Jamdani</h4>
                <p className="text-gray-700">
                  UNESCO recognized heritage craft. Intricate hand-woven patterns creating stunning floral and geometric motifs.
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl">
                <div className="text-5xl mb-4">👑</div>
                <h4 className="text-xl font-bold text-purple-600 mb-3">Dhakai Sarees</h4>
                <p className="text-gray-700">
                  Fine muslin sarees with elaborate designs, representing centuries of weaving excellence and royal heritage.
                </p>
              </div>
            </div>
          </div>

          {/* Cultural Traditions */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4 text-center">🎵</div>
              <h4 className="text-2xl font-bold text-orange-600 mb-4 text-center">Music & Kirtan</h4>
              <p className="text-gray-700 text-center">
                Home of the Sankirtana movement. Devotional songs, Baul music, and classical Bengali compositions echo through the streets.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4 text-center">🎭</div>
              <h4 className="text-2xl font-bold text-pink-600 mb-4 text-center">Festivals</h4>
              <p className="text-gray-700 text-center">
                Durga Puja, Rash Yatra, Dol Utsav, and various religious celebrations unite the community in joy and devotion.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-orange-100 p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4 text-center">📚</div>
              <h4 className="text-2xl font-bold text-purple-600 mb-4 text-center">Literature</h4>
              <p className="text-gray-700 text-center">
                Rich tradition of Bengali poetry, devotional literature, folk tales, and scholarly works that shaped regional identity.
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Stories from the Loom</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.weaving.map(video => (
                <VideoThumbnail key={video.id} video={video} onClick={setSelectedVideo} />
              ))}
            </div>
          </div>
        </section>

        {/* Landmarks Section */}
        <section id="landmarks" className="scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Landmarks & Life by the Ganga</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sacred spaces and scenic spots that define the spiritual and cultural landscape of Santipur
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {landmarks.map((landmark, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl flex-shrink-0">{landmark.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-600 mb-2">{landmark.name}</h3>
                    <p className="text-sm text-gray-500 mb-3 font-semibold">{landmark.location}</p>
                    <p className="text-gray-700 leading-relaxed">{landmark.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* River Life */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 p-12 rounded-2xl shadow-xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-6">🌊</div>
              <h3 className="text-3xl font-bold text-blue-600 mb-4">Life Along the Holy Ganga</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                The Ganges isn't just a river—it's the lifeblood of Santipur. From dawn prayers at the ghats to evening aartis 
                that illuminate the waters, from fishermen casting their nets to pilgrims seeking spiritual cleansing, the river 
                connects every aspect of life in this sacred town. The serene ghats offer breathtaking views of sunrise and sunset, 
                where the golden light dances on gentle waves, creating moments of divine beauty.
              </p>
            </div>
          </div>
        </section>

        {/* Modern Santipur Section */}
        <section id="modern" className="scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Modern Santipur</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Honoring tradition while embracing progress—building a brighter future for generations to come
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {institutions.map((inst, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
                <div className="text-5xl mb-4">{inst.icon}</div>
                <h4 className="text-lg font-bold text-orange-600 mb-3">{inst.name}</h4>
                <p className="text-gray-700 text-sm">{inst.description}</p>
              </div>
            ))}
          </div>

          {/* Development & Economy */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-12 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold text-green-600 mb-8 text-center">Economy & Development</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-5xl mb-4">🧵</div>
                <h4 className="font-bold text-xl mb-2 text-gray-800">Handloom Industry</h4>
                <p className="text-gray-700">
                  Primary economic driver, employing thousands of weavers and their families in creating world-class textiles.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🌾</div>
                <h4 className="font-bold text-xl mb-2 text-gray-800">Agriculture</h4>
                <p className="text-gray-700">
                  Fertile lands along the Ganges support rice cultivation, vegetables, and traditional farming practices.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🏪</div>
                <h4 className="font-bold text-xl mb-2 text-gray-800">Trade & Commerce</h4>
                <p className="text-gray-700">
                  Vibrant markets, weaver cooperatives, and emerging small businesses driving local economy.
                </p>
              </div>
            </div>
          </div>

          {/* Transport & Connectivity */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">Connectivity</h3>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl">🚂</div>
                <p className="text-gray-700">
                  <strong>Rail:</strong> Well-connected railway station on the Sealdah-Ranaghat line
                </p>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl">🚌</div>
                <p className="text-gray-700">
                  <strong>Road:</strong> Regular bus services from Kolkata, Krishnanagar, and neighboring towns
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-3xl">📍</div>
                <p className="text-gray-700">
                  <strong>Distance:</strong> Just 80 km from Kolkata, making it easily accessible for pilgrims and visitors
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spirit of the People Section */}
        <section id="spirit" className="scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">The Spirit of the People</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What makes Santipur truly special isn't just its heritage—it's the warmth, devotion, and resilience of its people
            </p>
          </div>

          {/* Community Values */}
          <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-12 rounded-2xl shadow-xl mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="text-6xl mb-6">❤️</div>
                <h3 className="text-3xl font-bold text-orange-600 mb-4">A Community United by Faith and Craft</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Walk through the narrow lanes of Santipur, and you'll hear the rhythmic clatter of looms, the melodious strains 
                  of kirtan, and the laughter of children playing by the ghats. This is a community where neighbors are family, 
                  where weavers take pride in every thread they weave, where elders pass down centuries-old traditions to eager 
                  young hands, and where devotion to the divine permeates every aspect of daily life.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl mb-4">🙏</div>
                  <h4 className="font-bold text-lg text-orange-600 mb-3">Devotion</h4>
                  <p className="text-gray-700 text-sm">
                    Deep spiritual roots and unwavering faith that has sustained the community through centuries
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl mb-4">✋</div>
                  <h4 className="font-bold text-lg text-pink-600 mb-3">Craftsmanship</h4>
                  <p className="text-gray-700 text-sm">
                    Generations of weavers dedicating their lives to creating beauty, one thread at a time
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="font-bold text-lg text-purple-600 mb-3">Unity</h4>
                  <p className="text-gray-700 text-sm">
                    A close-knit community that celebrates together, supports each other, and preserves heritage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Weavers */}
          <div className="bg-white p-12 rounded-2xl shadow-xl mb-12">
            <h3 className="text-3xl font-bold text-orange-600 mb-8 text-center">Supporting Our Weavers</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">The Challenge</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Behind every exquisite saree is a weaver's family, often working long hours for modest earnings. 
                  Mechanization and market competition threaten their livelihood, yet their dedication to this ancient 
                  craft remains unshaken.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These artisans don't just create fabric—they weave dreams, preserve heritage, and keep alive a 
                  tradition that has defined Santipur for centuries.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-orange-600 mb-4">How You Can Help</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                    <span>Buy directly from weavers or authorized cooperatives</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                    <span>Choose handloom over powerloom products—each purchase makes a difference</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                    <span>Share their stories and craftsmanship on social media</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                    <span>Support fair trade initiatives and artisan welfare programs</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                    <span>Visit Santipur and witness the magic of handloom weaving firsthand</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Famous Markets */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4 text-center">🏪</div>
              <h4 className="text-xl font-bold text-orange-600 mb-3 text-center">Santipur Haat</h4>
              <p className="text-gray-700 text-center">
                Traditional weekly market where authentic handloom sarees and local crafts come alive
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4 text-center">🏛️</div>
              <h4 className="text-xl font-bold text-pink-600 mb-3 text-center">Tantuja Stores</h4>
              <p className="text-gray-700 text-center">
                Government emporium ensuring fair prices and supporting local weaver communities
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-orange-100 p-8 rounded-xl shadow-lg">
              <div className="text-5xl mb-4 text-center">🤝</div>
              <h4 className="text-xl font-bold text-purple-600 mb-3 text-center">Cooperatives</h4>
              <p className="text-gray-700 text-center">
                Direct purchase from weaver collectives, ensuring artisans receive fair compensation
              </p>
            </div>
          </div>

          {/* Closing Message */}
          <div className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 text-white p-12 rounded-2xl shadow-2xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-6">🙏</div>
              <h3 className="text-4xl font-bold mb-6">Come, Experience Santipur</h3>
              <p className="text-xl leading-relaxed mb-8 opacity-90">
                Whether you seek spiritual solace at the ghats, wish to witness the artistry of handloom weaving, 
                want to explore centuries-old temples, or simply experience the warmth of Bengali hospitality—
                Santipur welcomes you with open arms.
              </p>
              <p className="text-2xl font-semibold mb-4">
                This is more than a town. This is a legacy. This is Santipur.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                  📍 Nadia District, West Bengal
                </div>
                <div className="bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                  🚂 80 km from Kolkata
                </div>
                <div className="bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                  🕉️ Where Devotion Meets Heritage
                </div>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-12 text-center">
            <blockquote className="text-2xl italic text-gray-600 max-w-3xl mx-auto">
              "In Santipur, every loom tells a story, every temple echoes with prayers, 
              and every street resonates with the soul of Bengal."
            </blockquote>
          </div>
        </section>
      </div>

      {/* Modals */}
      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      {lightboxImage && <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}
    </div>
  );
}