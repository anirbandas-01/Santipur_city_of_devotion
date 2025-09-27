import { useState, useEffect, useRef } from 'react'

import KrishnaImage from '../assets/images/krishna.jpg'
import MombatiImage from '../assets/images/mombati.jpg'
import EnviromentImage from '../assets/images/env.jpg'
import EnviromentImage2 from '../assets/images/env2.jpg'
import SantipurVideo from '../assets/videos/santipur.mp4'

const SlideshowSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [videoStates, setVideoStates] = useState({}) // Track video play states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false) // Global video playing state
  const sectionRef = useRef(null)
  const videoRefs = useRef([])
  const autoPlayIntervalRef = useRef(null)
  
  // Import your local images and videos here
  // import KrishnaImage from '../assets/images/krishna.jpg'
  // import TempleVideo from '../assets/videos/temple.mp4'
  // import FestivalVideo from '../assets/videos/festival.mp4'
  
  const slides = [
    {
      id: 1,
      title: "Sacred Temples of Santipur",
      subtitle: "Divine Architecture & Spiritual Heritage",
      description: "Explore the magnificent temples that have stood as pillars of faith for centuries, each telling a unique story of devotion and architectural brilliance.",
      type: "image",
      media: KrishnaImage,
      backgroundColor: "bg-gradient-to-br from-orange-100 via-red-50 to-pink-100",
      accentColor: "from-orange-600 to-red-600"
    },
    {
      id: 2,
      title: "Temple Rituals & Ceremonies",
      subtitle: "Sacred Traditions in Motion",
      description: "Experience the divine atmosphere of daily prayers, special ceremonies, and spiritual gatherings that bring the community together in devotion.",
      type: "video",
      media: SantipurVideo,
      poster: "https://images.unsplash.com/photo-1580748208068-6e20c7c15a53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      backgroundColor: "bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100",
      accentColor: "from-blue-600 to-purple-600"
    },
    {
      id: 3,
      title: "Festival Celebrations",
      subtitle: "Colors, Music & Community Spirit",
      description: "Experience the vibrant festivals that bring the entire community together in celebration of culture, tradition, and spiritual unity.",
      type: "video",
      media: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      backgroundColor: "bg-gradient-to-br from-green-100 via-teal-50 to-blue-100",
      accentColor: "from-green-600 to-teal-600"
    },
    {
      id: 4,
      title: "Artisan Traditions",
      subtitle: "Handloom Heritage & Craftsmanship",
      description: "Witness the intricate art of traditional weaving and handloom techniques that have made Santipur famous across the world for its exquisite textiles.",
      type: "image",
      media: EnviromentImage,
      backgroundColor: "bg-gradient-to-br from-purple-100 via-pink-50 to-red-100",
      accentColor: "from-purple-600 to-pink-600"
    }
  ]

  // Auto-slide functionality - stops when video is playing
  useEffect(() => {
    if (!isAutoPlaying || isVideoPlaying) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
      return
    }
    
    autoPlayIntervalRef.current = setInterval(() => {
      // Don't auto-advance if current slide is a video that hasn't been played
      const currentSlideData = slides[currentSlide]
      if (currentSlideData?.type === 'video' && !videoStates[currentSlide]?.hasPlayed) {
        return // Stay on video slide until user interacts
      }
      
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setVideoStates(prev => ({ ...prev, [currentSlide]: { ...prev[currentSlide], hasPlayed: false } }))
    }, 5000)
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [isAutoPlaying, isVideoPlaying, currentSlide, videoStates, slides])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        stopCurrentVideoAndGoToPrev()
      } else if (event.key === 'ArrowRight') {
        stopCurrentVideoAndGoToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  // Video event handlers
  const handleVideoPlay = (slideIndex) => {
    setIsVideoPlaying(true)
    setIsAutoPlaying(false)
    setVideoStates(prev => ({
      ...prev,
      [slideIndex]: { ...prev[slideIndex], isPlaying: true, hasPlayed: true }
    }))
  }

  const handleVideoEnded = (slideIndex) => {
    setIsVideoPlaying(false)
    setIsAutoPlaying(true)
    setVideoStates(prev => ({
      ...prev,
      [slideIndex]: { ...prev[slideIndex], isPlaying: false, hasEnded: true }
    }))
    // Auto advance to next slide after video ends
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 1000)
  }

  const handleVideoPause = (slideIndex) => {
    setVideoStates(prev => ({
      ...prev,
      [slideIndex]: { ...prev[slideIndex], isPlaying: false }
    }))
  }

  // Manual video control
  const toggleVideoPlayback = (slideIndex) => {
    const video = videoRefs.current[slideIndex]
    if (video) {
      if (video.paused) {
        video.play().catch(error => {
          console.log('Video play failed:', error)
        })
      } else {
        video.pause()
        setIsVideoPlaying(false)
        setIsAutoPlaying(true)
      }
    }
  }

  // Navigation with video control
  const stopCurrentVideoAndGoToNext = () => {
    const currentVideo = videoRefs.current[currentSlide]
    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause()
      setIsVideoPlaying(false)
    }
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(true)
  }

  const stopCurrentVideoAndGoToPrev = () => {
    const currentVideo = videoRefs.current[currentSlide]
    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause()
      setIsVideoPlaying(false)
    }
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(true)
  }

  const goToSlide = (index) => {
    // Stop current video if playing
    const currentVideo = videoRefs.current[currentSlide]
    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause()
      setIsVideoPlaying(false)
    }
    
    setCurrentSlide(index)
    setIsAutoPlaying(true)
    setVideoStates(prev => ({ ...prev, [index]: { ...prev[index], hasPlayed: false } }))
  }

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

  return (
    <section 
      ref={sectionRef}
      id="slideshow"
      className="relative z-0 min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black overflow-hidden"
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
                  {/* Slide Background Color */}
                  <div className={`absolute inset-0 ${slide.backgroundColor}`}></div>
                  
                  {/* Media Container - Fixed size */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative">
                      {slide.type === 'video' ? (
                        <div className="relative">
                          <video
                            ref={el => videoRefs.current[index] = el}
                            className="rounded-2xl shadow-2xl"
                            style={{ 
                              width: '800px',
                              height: '450px'
                            }}
                            poster={slide.poster}
                            muted
                            playsInline
                            onPlay={() => handleVideoPlay(index)}
                            onPause={() => handleVideoPause(index)}
                            onEnded={() => handleVideoEnded(index)}
                          >
                            <source src={slide.media} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          {/* Custom Video Play Button */}
                          {!videoStates[index]?.isPlaying && (
                            <button
                              type='button' 
                              className="absolute inset-0 flex items-center justify-center cursor-pointer"
                              onClick={() => toggleVideoPlayback(index)}
                            >
                              <div className="bg-black/60 hover:bg-black/80 
                              backdrop-blur-sm text-white rounded-full p-6 transition-all duration-300 transform hover:scale-110 group">
                                <svg className="w-12 h-12 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </button>
                          )}
                          
                          {/* Video Controls Overlay */}
                          {videoStates[index]?.isPlaying && (
                            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
                              <button
                                onClick={() => toggleVideoPlayback(index)}
                                className="text-white hover:text-gray-300 transition-colors"
                              >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                </svg>
                              </button>
                              <span className="text-white text-sm">Playing video...</span>
                              <span className="text-white/70 text-sm">Use ← → to navigate</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <img
                          src={slide.media}
                          alt={slide.title}
                          className="object-cover rounded-2xl shadow-2xl"
                          style={{ 
                            width: '800px',
                            height: '450px'
                          }}
                        />
                      )}
                      
                      {/* Media shadow/glow effect */}
                      <div className={`absolute -inset-2 bg-gradient-to-r ${slide.accentColor} opacity-25 blur-xl rounded-2xl -z-10`}></div>
                      
                      {/* Video indicator */}
                      {slide.type === 'video' && (
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          <span className="text-sm font-medium">Video</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
                    <div className="max-w-4xl mx-auto text-center">
                      <h3 className={`text-3xl md:text-4xl font-bold text-white mb-2 font-serif transition-all duration-1000 ${
                        index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        {slide.title}
                      </h3>
                      <p className={`text-lg md:text-xl text-gray-200 mb-3 font-medium transition-all duration-1000 delay-200 ${
                        index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        {slide.subtitle}
                      </p>
                      <p className={`text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
                        index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}>
                        {slide.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner elements */}
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-r ${slide.accentColor} opacity-30 rounded-full blur-sm`}></div>
                  <div className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r ${slide.accentColor} opacity-25 rounded-full blur-sm`}></div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={stopCurrentVideoAndGoToPrev}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-300 hover:scale-110 group shadow-xl"
              >
                <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={stopCurrentVideoAndGoToNext}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-300 hover:scale-110 group shadow-xl"
              >
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden rounded-full transition-all duration-300 flex items-center ${
                    index === currentSlide
                      ? 'w-16 h-3'
                      : 'w-3 h-3 hover:w-6'
                  }`}
                  title={slide.type === 'video' ? `${slide.title} (Video)` : slide.title}
                >
                  <div className={`w-full h-full rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? `bg-gradient-to-r ${slide.accentColor}`
                      : 'bg-white/40 hover:bg-white/60'
                  }`}></div>
                  
                  {/* Video indicator on dot */}
                  {slide.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Status indicator */}
            <div className="flex justify-center mt-4">
              <div className="text-sm text-gray-400 flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${isAutoPlaying && !isVideoPlaying ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`w-2 h-2 rounded-full ${isAutoPlaying && !isVideoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span>{isAutoPlaying && !isVideoPlaying ? 'Auto-playing' : 'Paused'}</span>
                </div>
                
                {isVideoPlaying && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400">Video Playing</span>
                  </div>
                )}
                
                <span className="text-gray-500">Use ← → keys to navigate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className={`h-full bg-gradient-to-r ${slides[currentSlide]?.accentColor || 'from-blue-400 to-purple-500'} transition-all duration-300`}
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