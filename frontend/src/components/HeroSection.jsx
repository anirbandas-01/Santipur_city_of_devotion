import { useEffect, useState } from 'react'

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
      style={{ transform: `translateY(${offset * 0.5}px)`
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