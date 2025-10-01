
  return(
    <Router>
      <div className='bg-gray-50 min-h-screen flex flex-col'>

        {/* Navbar + Sidebar*/}
        <Navbar toggleSidebar={toggleSidebar} scrollToSection={scrollToSection}/>
        <SidebarSection 
           isOpen={sidebarOpen}
           toggleSidebar={toggleSidebar}
           scrollToSection={scrollToSection}
        />
 
       {/* Routes */}
       <main className='flex-grow'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temples" element={<Temples />} />
        </Routes>
       </main>

       {/* Footer always visible */}
        <Footer />
      </div>  
    </Router>
  ); 








  import { useEffect, useState } from 'react'
import BgImage from '../assets/images/radhaKrishna.jpg'

const HeroSection = ({ scrollToSection }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden"
      style={{ 
      /*   backgroundImage: `url(${BgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover", */
        transform: `translateY(${offset * 0.5}px)`
       }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 floating-animation">
        <div className="w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-40 right-20 floating-animation-delay">
        <div className="w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif slide-in-left">
          City of <span className="text-yellow-300">Devotion</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto slide-in-right">
          Discover the spiritual heart of Bengal, where tradition meets devotion in the sacred city of Santipur
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => scrollToSection('history')}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 pulse-glow"
          >
            Explore Our Heritage
          </button>
          <button 
            onClick={() => scrollToSection('devotion')}
            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Spiritual Journey
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection


import { useState, useEffect, useRef } from 'react'

const SlideshowSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

/* const [offset, setOffset]= useState(0)
  
  useEffect(()=> {
    const handleScroll = () => setOffset(window.pageYOffset)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) */
  
  const slides = [
    {
      id: 1,
      title: "Sacred Temples of Santipur",
      subtitle: "Divine Architecture & Spiritual Heritage",
      description: "Explore the magnificent temples that have stood as pillars of faith for centuries, each telling a unique story of devotion and architectural brilliance.",
      image: "https://images.unsplash.com/photo-1580748208068-6e20c7c15a53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      bgGradient: "from-orange-400 via-red-500 to-pink-500"
    },
    {
      id: 2,
      title: "Artisan Traditions",
      subtitle: "Handloom Heritage & Craftsmanship",
      description: "Witness the intricate art of traditional weaving and handloom techniques that have made Santipur famous across the world for its exquisite textiles.",
      image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      bgGradient: "from-blue-400 via-purple-500 to-indigo-600"
    },
    {
      id: 3,
      title: "Festival Celebrations",
      subtitle: "Colors, Music & Community Spirit",
      description: "Experience the vibrant festivals that bring the entire community together in celebration of culture, tradition, and spiritual unity.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      bgGradient: "from-green-400 via-teal-500 to-blue-500"
    },
    {
      id: 4,
      title: "Spiritual Gatherings",
      subtitle: "Devotion & Community Harmony",
      description: "Join the spiritual congregations where devotees gather to share in prayer, meditation, and the timeless wisdom of ancient traditions.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      bgGradient: "from-purple-400 via-pink-500 to-red-500"
    }
  ]



  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section 
      ref={sectionRef}
      id="slideshow"
      className="relative z-0 min-h-screen  bg-gradient-to-br from-gray-900 via-slate-800 to-black overflow-hidden"
      /* style={{
        transform: `translateY(${offset * 0.5}px)`
      }}  */   
     
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Modern scrollable connector */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-1 h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
        <div className="w-6 h-6 bg-white rounded-full border-4 border-gray-300 animate-bounce mx-auto -mt-3"></div>
      </div>

      <div className="relative z-10 h-full">
        {/* Header */}
        <div className="text-center pt-20 pb-10">
          <h2 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4 font-serif transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Discover Santipur
          </h2>
          <p className={`text-xl text-gray-300 max-w-2xl mx-auto px-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Immerse yourself in the beauty and heritage of our sacred city
          </p>
        </div>

        {/* Main slideshow container */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            {/* Slideshow */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-80`}></div>
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-4xl mx-auto px-8 text-center">
                      <h3 className={`text-4xl md:text-6xl font-bold text-white mb-4 font-serif transition-all duration-1000 ${
                        index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        {slide.title}
                      </h3>
                      <p className={`text-xl md:text-2xl text-gray-200 mb-6 font-medium transition-all duration-1000 delay-200 ${
                        index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        {slide.subtitle}
                      </p>
                      <p className={`text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
                        index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-12 h-3 bg-white'
                      : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                  }`}
                >
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="flex justify-center mt-4">
              <div className={`text-sm text-gray-400 flex items-center space-x-2 ${isAutoPlaying ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Bottom connector to next section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="w-1 h-20 bg-gradient-to-b from-white/50 via-transparent to-transparent"></div>
      </div>
    </section>
  )
}

export default SlideshowSection



const HistorySection = () => {
  const historyItems = [
    {
      icon: "🏛️",
      title: "Ancient Roots",
      description: "Santipur has been a center of devotion and learning for centuries. Known from ancient times for its rich traditions, it became a hub of scholars, saints, and artisans.",
      bgColor: "from-blue-50 to-purple-50",
      iconBg: "bg-blue-600"
    },
    {
      icon: "🧵",
      title: "Handloom & Weaving",
      description: "World-famous for handloom sarees and traditional weaving techniques, passed down through generations. The unique Santipuri Saree represents the city's artistry.",
      bgColor: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-600"
    },
    {
      icon: "🎭",
      title: "Festivals & Culture",
      description: "Festivals like Rash Utsav and Holi are celebrated with grandeur, attracting thousands of devotees and tourists. Cultural life blends music, art, and devotion.",
      bgColor: "from-pink-50 to-red-50",
      iconBg: "bg-pink-600"
    },
    {
      icon: "🙏",
      title: "Spiritual Influence",
      description: "Often called the 'City of Devotion.' Many saints and spiritual leaders have lived here, leaving behind a legacy of peace and devotion that continues to inspire.",
      bgColor: "from-red-50 to-orange-50",
      iconBg: "bg-red-600"
    }
  ]

  return (
    <section id="history" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
            The History of Santipur
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A journey through centuries of devotion, culture, and spiritual awakening
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {historyItems.map((item, index) => (
            <div 
              key={index}
              className={`scroll-reveal bg-gradient-to-br ${item.bgColor} p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                <span className="text-2xl text-white">{item.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HistorySection




import { useState } from 'react'
import { Link } from 'react-router-dom'

const SidebarSection = ({ isOpen, toggleSidebar}) => {
  const [hoveredItem, setHoveredItem] = useState(null)

  const menuItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: '🏠',
      description: 'Return to homepage'
    },
        { 
      path: '/about', 
      label: 'About', 
      icon: 'ℹ️',
      description: 'Know our History'
    },
    { 
      path: '/temples', 
      label: 'Temples', 
      icon: '🏛️',
      description: 'Sacred places of worship'
    },
    { 
      path: '/festivals', 
      label: 'Festivals', 
      icon: '🎪',
      description: 'Cultural celebrations'
    },
    { 
      path: '/culture', 
      label: 'Culture', 
      icon: '🎭',
      description: 'Rich cultural heritage'
    },
    { 
      path: '/sareeMarket', 
      label: 'Sarees', 
      icon: '🧵',
      description: 'Traditional handloom art'
    },
    { 
      path: '/devotion', 
      label: 'Devotion', 
      icon: '🙏',
      description: 'Spiritual journey'
    },
     { 
      path: '/gallery', 
      label: 'Gallery', 
      icon: '🌅',
      description: 'Photos & videos of Santipur'
    },
    { 
      path: '/restaurants', 
      label: 'Restaurants', 
      icon: '🍽️',
      description: 'Restaurants & Dining'
    }
  ]

  return (
    <>
       {/* Overlay */}
      {/*{isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={toggleSidebar}
        />
      )} */}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 text-white">
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
          
          {/* Close Button */}
          <button 
            onClick={() => {
              toggleSidebar();
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200 z-50"
            type="button"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo/Brand */}
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-serif">Santipur</h2>
                <p className="text-blue-100 text-sm">City of Devotion</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  group relative block w-full p-4 rounded-xl transition-all duration-300
                  ${hoveredItem === index 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg transform -translate-y-1' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300
                    ${hoveredItem === index 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-110' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                    }
                  `}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1">
                    <h3 className={`
                      font-semibold text-lg transition-colors duration-300
                      ${hoveredItem === index ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-600'}
                    `}>
                      {item.label}
                    </h3>
                    <p className={`
                      text-sm transition-colors duration-300
                      ${hoveredItem === index ? 'text-blue-600' : 'text-gray-500'}
                    `}>
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                    <div className={`
                    transition-all duration-300
                    ${hoveredItem === index 
                      ? 'text-blue-600 transform translate-x-1' 
                      : 'text-gray-400 opacity-0 group-hover:opacity-100'
                    }
                  `}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover effect line */}
               <div className={`
                  absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full
                  transition-all duration-300 origin-top
                  ${hoveredItem === index ? 'scale-y-100' : 'scale-y-0'}
                `}></div>
              </Link>
            ))}
          </div>
        </nav>


        {/* Footer */}
          <div className="p-6 border-t border-gray-100">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✨</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Explore Heritage</p>
                <p className="text-xs text-gray-600">Discover spiritual traditions</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-4">
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
              <span className="text-sm">📱</span>
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
              <span className="text-sm">🐦</span>
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
              <span className="text-sm">📘</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarSection

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
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold">Ancient Temple Architecture</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-green-200 to-blue-300 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">🏘️</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold">Historic Neighborhoods</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-300 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">📜</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold">Ancient Manuscripts</span>
                  </div>
                </div>
              </div>
            </div>