
import { useState, useEffect, useRef } from 'react'

import santiPurVideo from '../assets/videos/santipur.mp4'
import gopal from '../assets/images/slide/gopal.jpg'
import jagaDhatri from '../assets/images/slide/jagadhatri.jpg'
import kali from '../assets/images/slide/ma-agomeshori.jpg'
 
const SlideshowSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const sectionRef = useRef(null)
  const videoRefs = useRef([])

  const slides = [
    { 
      id: 1, 
      title: "Sacred Temples of Santipur", 
      subtitle: "Divine Architecture & Spiritual Heritage", 
      description: "Explore the magnificent temples that have stood as pillars of faith for centuries, each telling a unique story of devotion and architectural brilliance.", 
      image: gopal, 
      objectPosition: 'center', 
      bgGradient: "from-orange-400 via-red-500 to-pink-500" 
    },
    { 
      id: 2, 
      title: "Artisan Traditions", 
      subtitle: "Handloom Heritage & Craftsmanship", 
      description: "Witness the intricate art of traditional weaving and handloom techniques that have made Santipur famous across the world for its exquisite textiles.", 
      image: kali, 
      objectPosition: 'center top', 
      bgGradient: "from-blue-400 via-purple-500 to-indigo-600" 
    },
    { 
      id: 3, 
      title: "Festival Celebrations", 
      subtitle: "Colors, Music & Community Spirit", 
      description: "Experience the vibrant festivals that bring the entire community together in celebration of culture, tradition, and spiritual unity.", 
      video: santiPurVideo
    },
    { 
      id: 4, 
      title: "Spiritual Gatherings", 
      subtitle: "Devotion & Community Harmony", 
      description: "Join the spiritual congregations where devotees gather to share in prayer, meditation, and the timeless wisdom of ancient traditions.", 
      image: jagaDhatri, 
      objectPosition: 'center', 
      bgGradient: "from-purple-400 via-pink-500 to-red-500" 
    }
  ]

  // Auto-slide for image slides
  useEffect(() => {
    if (!isAutoPlaying) return
    if (slides[currentSlide].video) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentSlide, slides])

  // Intersection Observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.3 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Play/pause videos for active slide
  useEffect(() => {
    slides.forEach((slide, i) => {
      const video = videoRefs.current[i]
      if (!video) return

      if (i === currentSlide && slide.video) {
        video.currentTime = 0
        video.muted = isMuted
        video.play().catch(err => console.warn('video.play() failed:', err))
        setIsAutoPlaying(false)
      } else if (slide.video) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [currentSlide, isMuted, slides])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(!slides[index].video)
  }

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length)

  const toggleMuted = () => setIsMuted(prev => !prev)

  return (
    <section 
      ref={sectionRef}
      id="slideshow"
      className="relative z-0 min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

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

      {/* Slideshow */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                }`}
              >
                
                {slide.video ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={el => videoRefs.current[index] = el}
                      src={slide.video}
                      autoPlay
                      playsInline
                      muted={isMuted}
                      className="w-full h-full object-cover"
                      onEnded={nextSlide}
                    />
                    {/* Mute/Unmute Button */}
                    <button
                      onClick={toggleMuted}
                      className="absolute bottom-4 right-4 z-20 bg-black/60 text-white px-3 py-2 rounded-lg text-sm hover:bg-black/80 transition-all"
                    >
                      {isMuted ? "🔇 Unmute" : "🔊 Mute"}
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <div className='relative w-full h-full'>
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover" 
                        style={{ objectPosition: slide.objectPosition || 'center'}} 
                      />
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-10`}></div>
                      {/* Dark overlay for contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                    </div>
                  </div>
                )}

                {/* Slide Content */}
                <div className="relative z-20 h-full flex items-center">
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
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 group z-30"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide} 
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 group z-30"
            >
              <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-12 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/60'
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
            <div className={`text-sm text-gray-400 flex items-center space-x-2 transition-opacity duration-300 ${isAutoPlaying ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SlideshowSection
