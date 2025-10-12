// import { useEffect, useState } from 'react'
// const BgImage = "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759417104/DIP_0204_10000_cn294r_omiwz4.jpg";

// const HeroSection = ({ scrollToSection }) => {
//   const [offset, setOffset] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => setOffset(window.pageYOffset)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <section 
//       id="home"
//       className="relative min-h-screen flex items-center justify-center overflow-hidden"
//       style={{
//         background: `
//           linear-gradient(135deg, 
//             rgba(15, 23, 42, 0.95) 0%, 
//             rgba(30, 41, 59, 0.9) 25%, 
//             rgba(51, 65, 85, 0.95) 50%, 
//             rgba(71, 85, 105, 0.9) 75%, 
//             rgba(15, 23, 42, 0.95) 100%
//           ),
//           radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.3) 0%, transparent 50%),
//           radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
//           radial-gradient(circle at 40% 80%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)
//         `,
//         transform: `translateY(${offset * 0.3}px)`
//       }}
//     >
//       {/* Animated background particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
//         <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
//         <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
//       </div>

//       {/* Main container with card layout */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
          
//           {/* Image Card */}
//           <div className="relative order-2 lg:order-1">
//             <div className="relative group">
//               {/* Card background with glow effect */}
//               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
//               {/* Main card */}
//               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
//                 <div className="aspect-[4/5] relative">
//                   <img 
//                     src={BgImage} 
//                     alt="Radha Krishna" 
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                   {/* Image overlay gradient */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
//                   {/* Floating spiritual symbols on image */}
//                   <div className="absolute top-4 right-4 floating-animation">
//                     <div className="w-8 h-8 bg-yellow-300/30 rounded-full blur-sm"></div>
//                   </div>
//                   <div className="absolute bottom-4 left-4 floating-animation-delay">
//                     <svg className="w-6 h-6 text-yellow-300/50" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                     </svg>
//                   </div>
//                 </div>
                
//                 {/* Card bottom section */}
//                 <div className="p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
//                   <div className="flex items-center justify-center space-x-2">
//                     <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
//                     <span className="text-white/80 text-sm font-medium">Sacred Devotion</span>
//                     <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="text-center lg:text-left order-1 lg:order-2">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif slide-in-right">
//               City of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 drop-shadow-lg">Devotion</span>
//             </h1>
            
//             <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed slide-in-right-delay max-w-2xl">
//               Discover the spiritual heart of Bengal, where tradition meets devotion in the sacred city of Santipur. Experience the divine connection through centuries of faith and culture.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center slide-in-right-delay-2">
//               <button 
//                 onClick={() => scrollToSection('history')}
//                 className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl border border-white/20 backdrop-blur-sm"
//               >
//                 <span className="flex items-center gap-2">
//                   Explore Our Heritage
//                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </span>
//               </button>
              
//               <button 
//                 onClick={() => scrollToSection('devotion')}
//                 className="group px-8 py-4 border-2 border-gradient border-white/60 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/80 transition-all duration-300 transform hover:scale-105 shadow-2xl"
//               >
//                 <span className="flex items-center gap-2">
//                   Spiritual Journey
//                   <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </span>
//               </button>
//             </div>

//             {/* Decorative elements */}
//             <div className="mt-8 flex justify-center lg:justify-start items-center gap-4 opacity-60">
//               <div className="w-12 h-px bg-gradient-to-r from-transparent to-yellow-300"></div>
//               <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//               </svg>
//               <div className="w-12 h-px bg-gradient-to-r from-yellow-300 to-transparent"></div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Enhanced scroll indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
//         <div className="flex flex-col items-center">
//           <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
//             <div className="w-1 h-3 bg-gradient-to-b from-yellow-300 to-pink-300 rounded-full mt-2 animate-bounce"></div>
//           </div>
//           <p className="text-white/50 text-xs mt-2 font-light">Scroll to explore</p>
//         </div>
//       </div>

//       <style jsx>{`
//         .floating-animation {
//           animation: float 4s ease-in-out infinite;
//         }
        
//         .floating-animation-delay {
//           animation: float 4s ease-in-out infinite;
//           animation-delay: -2s;
//         }
        
//         .slide-in-right {
//           animation: slideInRight 1s ease-out;
//         }
        
//         .slide-in-right-delay {
//           animation: slideInRight 1s ease-out 0.3s both;
//         }
        
//         .slide-in-right-delay-2 {
//           animation: slideInRight 1s ease-out 0.6s both;
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) scale(1); }
//           50% { transform: translateY(-10px) scale(1.1); }
//         }
        
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//       `}</style>
//     </section>
//   )
// }

// export default HeroSection

import { useEffect, useState } from 'react'
const BgImage = "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759417104/DIP_0204_10000_cn294r_omiwz4.jpg";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(139, 0, 0, 0.92) 0%, 
            rgba(178, 34, 34, 0.88) 20%, 
            rgba(220, 20, 60, 0.85) 40%, 
            rgba(255, 140, 0, 0.82) 60%, 
            rgba(218, 165, 32, 0.75) 80%, 
            rgba(210, 180, 140, 0.35) 100%
          ),
          radial-gradient(circle at 15% 25%, rgba(255, 140, 0, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 85% 75%, rgba(218, 165, 32, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(178, 34, 34, 0.2) 0%, transparent 60%)
        `,
        transform: `translateY(${offset * 0.3}px)`
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-yellow-400/15 to-amber-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Main container with card layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Card */}
          <div className="relative order-2 lg:order-1">
            <div className="relative group">
              {/* Card background with glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] relative">
                  <img 
                    src={BgImage} 
                    alt="Radha Krishna" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Floating spiritual symbols on image */}
                  <div className="absolute top-4 right-4 floating-animation">
                    <div className="w-8 h-8 bg-yellow-300/30 rounded-full blur-sm"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 floating-animation-delay">
                    <svg className="w-6 h-6 text-yellow-300/50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Card bottom section */}
                <div className="p-4 bg-gradient-to-r from-orange-900/50 to-amber-900/50">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-sm font-medium">Sacred Devotion</span>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif slide-in-right">
              City of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 drop-shadow-lg">Devotion</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed slide-in-right-delay max-w-2xl">
              Discover the spiritual heart of Bengal, where tradition meets devotion in the sacred city of Santipur. Experience the divine connection through centuries of faith and culture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center slide-in-right-delay-2">
              <button 
                onClick={() => scrollToSection('history')}
                className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl border border-white/20 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  Explore Our Heritage
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection('devotion')}
                className="group px-8 py-4 border-2 border-gradient border-white/60 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/80 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  Spiritual Journey
                  <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Decorative elements */}
            <div className="mt-8 flex justify-center lg:justify-start items-center gap-4 opacity-60">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-yellow-300"></div>
              <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <div className="w-12 h-px bg-gradient-to-r from-yellow-300 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <div className="w-1 h-3 bg-gradient-to-b from-yellow-300 to-orange-300 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-white/50 text-xs mt-2 font-light">Scroll to explore</p>
        </div>
      </div>

      <style jsx>{`
        .floating-animation {
          animation: float 4s ease-in-out infinite;
        }
        
        .floating-animation-delay {
          animation: float 4s ease-in-out infinite;
          animation-delay: -2s;
        }
        
        .slide-in-right {
          animation: slideInRight 1s ease-out;
        }
        
        .slide-in-right-delay {
          animation: slideInRight 1s ease-out 0.3s both;
        }
        
        .slide-in-right-delay-2 {
          animation: slideInRight 1s ease-out 0.6s both;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection