// import { useState, useEffect, useRef } from 'react'

// const santiPurVideoLink = "https://res.cloudinary.com/dd5jhb6pf/video/upload/v1759417286/santipur_zxkgfi_lhperh.mp4";
// const gopalLink = "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759417234/gopal_aqxwuj_c1rn4z.jpg";
// const jagaDhatriLink = "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759417253/jagadhatri_qqfyhz_lan8xp.jpg"; 
// const kaliLink = "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759417242/ma-agomeshori_ikzqje_ibofvh.jpg";



 
// const SlideshowSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
//   const [isVisible, setIsVisible] = useState(false)
//   const [isMuted, setIsMuted] = useState(true)
//   const sectionRef = useRef(null)
//   const videoRefs = useRef([])

//   const slides = [
//     { 
//       id: 1, 
//       title: "Sacred Temples of Santipur", 
//       subtitle: "Divine Architecture & Spiritual Heritage", 
//       description: "Explore the magnificent temples that have stood as pillars of faith for centuries, each telling a unique story of devotion and architectural brilliance.", 
//       image: gopalLink, 
//       objectPosition: 'center', 
//       bgGradient: "from-orange-400 via-red-500 to-pink-500" 
//     },
//     { 
//       id: 2, 
//       title: "Artisan Traditions", 
//       subtitle: "Handloom Heritage & Craftsmanship", 
//       description: "Witness the intricate art of traditional weaving and handloom techniques that have made Santipur famous across the world for its exquisite textiles.", 
//       image: kaliLink, 
//       objectPosition: 'center top', 
//       bgGradient: "from-blue-400 via-purple-500 to-indigo-600" 
//     },
//     { 
//       id: 3, 
//       title: "Festival Celebrations", 
//       subtitle: "Colors, Music & Community Spirit", 
//       description: "Experience the vibrant festivals that bring the entire community together in celebration of culture, tradition, and spiritual unity.", 
//       video: santiPurVideoLink
//     },
//     { 
//       id: 4, 
//       title: "Spiritual Gatherings", 
//       subtitle: "Devotion & Community Harmony", 
//       description: "Join the spiritual congregations where devotees gather to share in prayer, meditation, and the timeless wisdom of ancient traditions.", 
//       image: jagaDhatriLink, 
//       objectPosition: 'center', 
//       bgGradient: "from-purple-400 via-pink-500 to-red-500" 
//     }
//   ]

//   // Auto-slide for image slides
//   useEffect(() => {
//     if (!isAutoPlaying) return
//     if (slides[currentSlide].video) return

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [isAutoPlaying, currentSlide, slides])

//   // Intersection Observer for fade-in
//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.3 })
//     if (sectionRef.current) observer.observe(sectionRef.current)
//     return () => observer.disconnect()
//   }, [])

//   // Play/pause videos for active slide
//   useEffect(() => {
//     slides.forEach((slide, i) => {
//       const video = videoRefs.current[i]
//       if (!video) return

//       if (i === currentSlide && slide.video) {
//         video.currentTime = 0
//         video.muted = isMuted
//         video.play().catch(err => console.warn('video.play() failed:', err))
//         setIsAutoPlaying(false)
//       } else if (slide.video) {
//         video.pause()
//         video.currentTime = 0
//       }
//     })
//   }, [currentSlide, isMuted, slides])

//   const goToSlide = (index) => {
//     setCurrentSlide(index)
//     setIsAutoPlaying(!slides[index].video)
//   }

//   const nextSlide = () => goToSlide((currentSlide + 1) % slides.length)
//   const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length)

//   const toggleMuted = () => setIsMuted(prev => !prev)

//   return (
//     <section 
//       ref={sectionRef}
//       id="slideshow"
//       className="relative z-0 min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black overflow-hidden"
//     >
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
//       </div>

//       {/* Header */}
//       <div className="text-center pt-20 pb-10">
//         <h2 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4 font-serif transition-all duration-1000 ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}>
//           Discover Santipur
//         </h2>
//         <p className={`text-xl text-gray-300 max-w-2xl mx-auto px-6 transition-all duration-1000 delay-300 ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}>
//           Immerse yourself in the beauty and heritage of our sacred city
//         </p>
//       </div>

//       {/* Slideshow */}
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="relative">
//           <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
//             {slides.map((slide, index) => (
//               <div 
//                 key={slide.id} 
//                 className={`absolute inset-0 transition-all duration-700 ease-in-out ${
//                   index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
//                 }`}
//               >
                
//                 {slide.video ? (
//                   <div className="relative w-full h-full">
//                     <video
//                       ref={el => videoRefs.current[index] = el}
//                       src={slide.video}
//                       autoPlay
//                       playsInline
//                       muted={isMuted}
//                       className="w-full h-full object-cover"
//                       onEnded={nextSlide}
//                     />
//                     {/* Mute/Unmute Button */}
//                     <button
//                       onClick={toggleMuted}
//                       className="absolute bottom-4 right-4 z-20 bg-black/60 text-white px-3 py-2 rounded-lg text-sm hover:bg-black/80 transition-all"
//                     >
//                       {isMuted ? "🔇 Unmute" : "🔊 Mute"}
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="absolute inset-0">
//                     <div className='relative w-full h-full'>
//                       <img 
//                         src={slide.image} 
//                         alt={slide.title} 
//                         className="w-full h-full object-cover" 
//                         style={{ objectPosition: slide.objectPosition || 'center'}} 
//                       />
//                       {/* Gradient overlay */}
//                       <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-10`}></div>
//                       {/* Dark overlay for contrast */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Slide Content */}
//                 <div className="relative z-20 h-full flex items-center">
//                   <div className="max-w-4xl mx-auto px-8 text-center">
//                     <h3 className={`text-4xl md:text-6xl font-bold text-white mb-4 font-serif transition-all duration-1000 ${
//                       index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                     }`}>
//                       {slide.title}
//                     </h3>
//                     <p className={`text-xl md:text-2xl text-gray-200 mb-6 font-medium transition-all duration-1000 delay-200 ${
//                       index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                     }`}>
//                       {slide.subtitle}
//                     </p>
//                     <p className={`text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
//                       index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                     }`}>
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Navigation Arrows */}
//             <button 
//               onClick={prevSlide} 
//               className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 group z-30"
//             >
//               <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button 
//               onClick={nextSlide} 
//               className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 group z-30"
//             >
//               <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>

//           {/* Indicators */}
//           <div className="flex justify-center mt-8 space-x-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`relative overflow-hidden rounded-full transition-all duration-300 ${
//                   index === currentSlide ? 'w-12 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/60'
//                 }`}
//               >
//                 {index === currentSlide && (
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"></div>
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Auto-play indicator */}
//           <div className="flex justify-center mt-4">
//             <div className={`text-sm text-gray-400 flex items-center space-x-2 transition-opacity duration-300 ${isAutoPlaying ? 'opacity-100' : 'opacity-50'}`}>
//               <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
//               <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SlideshowSection

import { useState, useEffect, useRef } from 'react'

const santiPurVideoLink = "https://res.cloudinary.com/dd5jhb6pf/video/upload/v1759417286/santipur_zxkgfi_lhperh.mp4";
const gopalLink = "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759417234/gopal_aqxwuj_c1rn4z.jpg";
const jagaDhatriLink = "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759417253/jagadhatri_qqfyhz_lan8xp.jpg"; 
const kaliLink = "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759417242/ma-agomeshori_ikzqje_ibofvh.jpg";

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
      image: gopalLink, 
      objectPosition: 'center', 
      bgGradient: "from-orange-400 via-red-500 to-pink-500" 
    },
    { 
      id: 2, 
      title: "Artisan Traditions", 
      subtitle: "Handloom Heritage & Craftsmanship", 
      description: "Witness the intricate art of traditional weaving and handloom techniques that have made Santipur famous across the world for its exquisite textiles.", 
      image: kaliLink, 
      objectPosition: 'center top', 
      bgGradient: "from-blue-400 via-purple-500 to-indigo-600" 
    },
    { 
      id: 3, 
      title: "Festival Celebrations", 
      subtitle: "Colors, Music & Community Spirit", 
      description: "Experience the vibrant festivals that bring the entire community together in celebration of culture, tradition, and spiritual unity.", 
      video: santiPurVideoLink
    },
    { 
      id: 4, 
      title: "Spiritual Gatherings", 
      subtitle: "Devotion & Community Harmony", 
      description: "Join the spiritual congregations where devotees gather to share in prayer, meditation, and the timeless wisdom of ancient traditions.", 
      image: jagaDhatriLink, 
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
      className="relative z-0 min-h-screen overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(210, 180, 140, 0.35) 0%,
            rgba(218, 165, 32, 0.75) 20%, 
            rgba(255, 140, 0, 0.82) 40%, 
            rgba(220, 20, 60, 0.85) 60%, 
            rgba(178, 34, 34, 0.88) 80%, 
            rgba(139, 0, 0, 0.92) 100%
          ),
          radial-gradient(circle at 85% 25%, rgba(218, 165, 32, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 15% 75%, rgba(255, 140, 0, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(178, 34, 34, 0.2) 0%, transparent 60%)
        `
      }}
    >
      {/* Smooth wave transition from hero */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ transform: 'translateY(-1px)' }}>
        <svg className="relative block w-full h-32 md:h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block' }}>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="rgba(210, 180, 140, 0.5)"
          ></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="rgba(218, 165, 32, 0.7)"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="rgba(139, 0, 0, 0.92)"
          ></path>
        </svg>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="text-center pt-32 pb-10 relative z-10">
        <h2 className={`text-5xl md:text-6xl font-bold text-white mb-4 font-serif transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Discover Santipur
        </h2>
        <p className={`text-xl text-gray-100 max-w-2xl mx-auto px-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Immerse yourself in the beauty and heritage of our sacred city
        </p>
      </div>

      {/* Slideshow */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4 pb-8">
            <div className={`text-sm text-gray-200 flex items-center space-x-2 transition-opacity duration-300 ${isAutoPlaying ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-yellow-300 animate-pulse' : 'bg-gray-400'}`}></div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SlideshowSection