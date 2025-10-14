import React, { useState } from 'react';
import { ChevronRight, Play, X, Info, Calendar, Heart, Users, Award } from 'lucide-react';

// CLOUDINARY VIDEO - FULL ORIGINAL VIDEO (70MB, 7+ minutes)
const cloudinaryVideo = {
  santipurJourney: "https://res.cloudinary.com/dd5jhb6pf/video/upload/v1759861536/Santipur_full_umcwd0.mp4",
  santipurtath: "https://res.cloudinary.com/dd5jhb6pf/video/upload/v1760456854/santipur_tath.mp4"
};

export default function About() {
  const [activeSection, setActiveSection] = useState('history');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Navigation sections
  const sections = [
    { id: 'history', label: 'History', icon: Calendar },
    { id: 'mahaprabhu', label: 'Sri Chaitanya', icon: Heart },
    { id: 'culture', label: 'Culture & Handloom', icon: Award },
    { id: 'market', label: 'Saree Market', icon: Users }
  ];

  // Video data - THUMBNAILS AT DIFFERENT TIMES TO AVOID BLACK FRAMES
  const videos = {
    mahaprabhu: [
      {
        id: 1,
        title: 'Priests Discuss Mahaprabhu\'s Legacy',
        // Try thumbnail at 90 seconds (1.5 min into video)
        thumbnail: "https://res.cloudinary.com/dd5jhb6pf/video/upload/so_90,w_400,h_250,c_fill,f_jpg,q_80/v1759861536/Santipur_full_umcwd0.jpg",
        description: 'Local priests share insights about Sri Chaitanya Mahaprabhu',
        videoUrl: cloudinaryVideo.santipurJourney
      }
    ],
    artisans: [
      {
        id: 2,
        title: 'Master Weaver at Work',
        // Thumbnail at 180 seconds (3 min)
        thumbnail: "https://res.cloudinary.com/dd5jhb6pf/video/upload//so_180,w_400,h_250,c_fill,f_jpg,q_80/v1760456854/santipur_tath.jpg",
        description: 'Watch the intricate process of Tant saree weaving',
        videoUrl: cloudinaryVideo.santipurtath
      },
      {
        id: 3,
        title: 'Stories from the Loom',
        // Thumbnail at 300 seconds (5 min)
        thumbnail: "https://res.cloudinary.com/dd5jhb6pf/video/upload/so_300,w_400,h_250,c_fill,f_jpg,q_80/v1759861536/Santipur_full_umcwd0.jpg",
        description: 'Artisans share their family weaving traditions',
        videoUrl: cloudinaryVideo.santipurJourney
      }
    ],
    general: [
      {
        id: 4,
        title: 'Santipur: A Journey Through Time',
        // Thumbnail at 60 seconds (1 min) - should have content
        thumbnail: "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759867443/WhatsApp_Image_2025-10-08_at_01.31.30_230d8ce8_hrtjbm.jpg",
        description: 'Explore the heritage and culture of Santipur',
        videoUrl: cloudinaryVideo.santipurJourney
      }
    ]
  };

  // Timeline data
  const timeline = [
    { era: 'Ancient Period', period: 'Before 1400', description: 'Early settlements along the Ganges, Hindu cultural development' },
    { era: 'Medieval Era', period: '1486-1700', description: 'Sri Chaitanya Mahaprabhu\'s movement, Advaita Acharya\'s presence' },
    { era: 'Colonial Period', period: '1700-1947', description: 'Handloom industry flourishes, cultural renaissance' },
    { era: 'Modern Era', period: '1947-Present', description: 'Preservation of heritage, continued weaving traditions' }
  ];

  // Did You Know facts
  const funFacts = [
    { icon: '🎵', fact: 'Santipur is birthplace of Sankirtana, the devotional singing movement' },
    { icon: '🧵', fact: 'Santipur Tant sarees are worn by women across Bengal for their comfort' },
    { icon: '🏛️', fact: 'Advaita Acharya\'s house still stands as a pilgrimage site' },
    { icon: '📚', fact: 'The town has produced numerous scholars and literary figures' }
  ];

  // Historic images with hover info
  const historicImages = [
    { url: '/api/placeholder/300/200', caption: 'Advaita Acharya Temple - 15th Century', year: '1486' },
    { url: '/api/placeholder/300/200', caption: 'Traditional Weaving Workshop', year: '1920s' },
    { url: '/api/placeholder/300/200', caption: 'Ganges Ghat at Santipur', year: '1890' },
    { url: '/api/placeholder/300/200', caption: 'Colonial Era Market', year: '1935' }
  ];

  // Weaving process images
  const weavingImages = [
    { url: '/api/placeholder/300/200', caption: 'Preparing the yarn with natural dyes' },
    { url: '/api/placeholder/300/200', caption: 'Setting up the traditional handloom' },
    { url: '/api/placeholder/300/200', caption: 'Weaving the intricate patterns' },
    { url: '/api/placeholder/300/200', caption: 'Finished Jamdani saree masterpiece' }
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

  // Image Lightbox Component
  const ImageLightbox = ({ image, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-5xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-gray-300">
          <X size={32} />
        </button>
        <img src={image.url} alt={image.caption} className="max-h-[80vh] rounded-lg" />
        <div className="text-white text-center mt-4">
          <p className="text-xl">{image.caption}</p>
          {image.year && <p className="text-gray-400 mt-1">{image.year}</p>}
        </div>
      </div>
    </div>
  );

  // Video Thumbnail Component - WITH VIDEO ELEMENT FOR AUTO THUMBNAIL
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
            {/* Try Cloudinary thumbnail first */}
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
          // Fallback: Use video element to generate thumbnail
          <video 
            className="w-full h-48 object-cover"
            preload="metadata"
            muted
            playsInline
          >
            <source src={`${video.videoUrl}#t=60`} type="video/mp4" />
          </video>
        )}
        
        <div className="absolute inset-0  bg-opacity-10 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
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

  // Image with Hover Info Component
  const HoverInfoImage = ({ image, onClick }) => {
    const [showInfo, setShowInfo] = useState(false);
    
    return (
      <div 
        className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        onClick={() => onClick(image)}
      >
        <img src={image.url} alt={image.caption} className="w-full h-48 object-cover" />
        {showInfo && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 transition-all">
            <div className="text-white text-center">
              <Info className="mx-auto mb-2" size={24} />
              <p className="text-sm font-medium">{image.caption}</p>
              {image.year && <p className="text-xs text-gray-300 mt-1">{image.year}</p>}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Discover Santipur</h1>
          <p className="text-xl opacity-90">Where Heritage Weaves Stories Through Time</p>
        </div>
      </div>

      {/* Featured Videos Section */}
      <div className="container mx-auto px-4 -mt-12 mb-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Experience Santipur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.general.map(video => (
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
      <div className="container mx-auto px-4 py-12 space-y-20">
        
        {/* History Section */}
        <section id="history" className="scroll-mt-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">History of Santipur</h2>
          
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-300"></div>
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-orange-600 mb-2">{item.era}</h3>
                    <p className="text-gray-600 font-semibold mb-2">{item.period}</p>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                </div>
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>

          {/* Did You Know Cards */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Did You Know?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {funFacts.map((fact, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-100 to-pink-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-3 text-center">{fact.icon}</div>
                  <p className="text-gray-700 text-center">{fact.fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Historic Images Gallery */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Historic Glimpses</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {historicImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-80">
                  <HoverInfoImage image={image} onClick={setLightboxImage} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sri Chaitanya Mahaprabhu Section */}
        <section id="mahaprabhu" className="scroll-mt-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Sri Chaitanya Mahaprabhu</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">Connection to Santipur</h3>
              <p className="text-gray-700 mb-4">
                Santipur holds immense spiritual significance as the home of Advaita Acharya, one of the principal associates of Sri Chaitanya Mahaprabhu. It was here that the seeds of the Bhakti movement were nurtured, and the divine love of Lord Krishna was celebrated through Sankirtana.
              </p>
              <p className="text-gray-700">
                The town became a major center for Vaishnavism, attracting devotees from across Bengal and beyond. Advaita Acharya's house remains a sacred pilgrimage site where thousands gather to experience the divine atmosphere.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">Core Teachings</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" />
                  <span><strong>Bhakti (Devotion):</strong> Pure devotional love as the path to divine realization</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" />
                  <span><strong>Sankirtana:</strong> Congregational chanting of the holy names</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" />
                  <span><strong>Universal Love:</strong> Breaking social barriers through spiritual unity</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-orange-600 mt-1 flex-shrink-0" />
                  <span><strong>Humility:</strong> Considering oneself lower than a blade of grass</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Scholar Videos */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Voices of Devotion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.mahaprabhu.map(video => (
                <VideoThumbnail key={video.id} video={video} onClick={setSelectedVideo} />
              ))}
            </div>
          </div>
        </section>

        {/* Culture & Handloom Section */}
        <section id="culture" className="scroll-mt-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Culture & Handloom Heritage</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Living Traditions</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-4xl mb-3">🎵</div>
                <h4 className="font-bold text-lg mb-2">Music & Dance</h4>
                <p className="text-gray-700">Kirtan, Baul songs, and classical Bengali music form the soul of Santipur</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-3">📖</div>
                <h4 className="font-bold text-lg mb-2">Literature</h4>
                <p className="text-gray-700">Rich tradition of Bengali poetry, devotional literature, and folk tales</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-3">🎭</div>
                <h4 className="font-bold text-lg mb-2">Festivals</h4>
                <p className="text-gray-700">Durga Puja, Rash Yatra, and various religious celebrations</p>
              </div>
            </div>
          </div>

          {/* Handloom Legacy */}
          <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-8 rounded-lg shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">The Handloom Legacy</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg text-orange-600 mb-3">Tant Sarees</h4>
                <p className="text-gray-700">Light, comfortable cotton sarees perfect for Bengal's climate. Known for their vibrant colors and traditional borders.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg text-orange-600 mb-3">Jamdani</h4>
                <p className="text-gray-700">Intricate hand-woven patterns creating stunning motifs. A UNESCO recognized heritage craft.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-lg text-orange-600 mb-3">Dhakai Sarees</h4>
                <p className="text-gray-700">Fine muslin sarees with elaborate designs, representing centuries of weaving excellence.</p>
              </div>
            </div>
          </div>

          {/* Weaving Process Gallery */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">The Art of Weaving</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weavingImages.map((image, index) => (
                <HoverInfoImage key={index} image={image} onClick={setLightboxImage} />
              ))}
            </div>
          </div>

          {/* Artisan Videos */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Stories from the Loom</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.artisans.map(video => (
                <VideoThumbnail key={video.id} video={video} onClick={setSelectedVideo} />
              ))}
            </div>
          </div>
        </section>

        {/* Saree Market Section */}
        <section id="market" className="scroll-mt-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Saree Market & Weaver Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">Famous Markets</h3>
              <ul className="space-y-4">
                <li className="border-l-4 border-orange-600 pl-4">
                  <h4 className="font-bold text-lg">Santipur Haat</h4>
                  <p className="text-gray-700">Traditional weekly market showcasing authentic handloom sarees</p>
                </li>
                <li className="border-l-4 border-orange-600 pl-4">
                  <h4 className="font-bold text-lg">Tantuja Stores</h4>
                  <p className="text-gray-700">Government emporium supporting local weavers</p>
                </li>
                <li className="border-l-4 border-orange-600 pl-4">
                  <h4 className="font-bold text-lg">Local Cooperatives</h4>
                  <p className="text-gray-700">Direct purchase from weaver collectives ensuring fair prices</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">Supporting Weavers</h3>
              <p className="text-gray-700 mb-4">
                Behind every saree is a family's legacy, passed down through generations. Today's weavers face challenges from mechanization, but their dedication to craft remains unwavering.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-orange-600 mb-2">How You Can Help:</p>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Buy directly from weavers or cooperatives</li>
                  <li>✓ Choose handloom over powerloom products</li>
                  <li>✓ Share their stories and craftsmanship</li>
                  <li>✓ Support fair trade initiatives</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      {lightboxImage && <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}
    </div>
  );
}