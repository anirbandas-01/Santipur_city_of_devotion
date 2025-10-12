import { useEffect, useRef, useState } from 'react'

const HistorySection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState([])
  const sectionRef = useRef(null)

  const historyItems = [
    {
      icon: "🏛️",
      title: "Ancient Roots",
      description: "Santipur has been a center of devotion and learning for centuries. Known from ancient times for its rich traditions, it became a hub of scholars, saints, and artisans.",
      bgColor: "from-blue-50 to-purple-50",
      iconBg: "bg-blue-600",
      hoverColor: "hover:from-blue-100 hover:to-purple-100"
    },
    {
      icon: "🧵",
      title: "Handloom & Weaving",
      description: "World-famous for handloom sarees and traditional weaving techniques, passed down through generations. The unique Santipuri Saree represents the city's artistry.",
      bgColor: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-600",
      hoverColor: "hover:from-purple-100 hover:to-pink-100"
    },
    {
      icon: "🎭",
      title: "Festivals & Culture",
      description: "Festivals like Rash Utsav and Holi are celebrated with grandeur, attracting thousands of devotees and tourists. Cultural life blends music, art, and devotion.",
      bgColor: "from-pink-50 to-red-50",
      iconBg: "bg-pink-600",
      hoverColor: "hover:from-pink-100 hover:to-red-100"
    },
    {
      icon: "🙏",
      title: "Spiritual Influence",
      description: "Often called the 'City of Devotion.' Many saints and spiritual leaders have lived here, leaving behind a legacy of peace and devotion that continues to inspire.",
      bgColor: "from-red-50 to-orange-50",
      iconBg: "bg-red-600",
      hoverColor: "hover:from-red-100 hover:to-orange-100"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Trigger each card with staggered delay
          historyItems.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index])
            }, index * 200)
          })
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="history" 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-200/30 to-red-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
            The History of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Santipur</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A journey through centuries of devotion, culture, and spiritual awakening
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full mx-4"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {historyItems.map((item, index) => (
            <div 
              key={index}
              className={`group relative transition-all duration-700 ease-out ${
                visibleCards.includes(index)
                  ? 'opacity-100 transform translate-y-0 translate-z-0 scale-100'
                  : 'opacity-0 transform translate-y-16 translate-z-[-50px] scale-95'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                perspective: '1000px'
              }}
            >
              {/* Card */}
              <div 
                className={`bg-gradient-to-br ${item.bgColor} ${item.hoverColor} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 relative overflow-hidden border border-white/50 backdrop-blur-sm`}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Icon with enhanced animation */}
                <div className={`relative w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mb-6 mx-auto transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                  <span className="text-2xl text-white">{item.icon}</span>
                  
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 ${item.iconBg} rounded-full opacity-0 group-hover:opacity-30 blur-lg scale-150 transition-all duration-500`}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif group-hover:text-gray-900 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-1 ${item.iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                
                {/* Corner decorations */}
                <div className={`absolute top-2 right-2 w-4 h-4 ${item.iconBg} opacity-10 rounded-full`}></div>
                <div className={`absolute bottom-2 left-2 w-2 h-2 ${item.iconBg} opacity-20 rounded-full`}></div>
              </div>

              {/* Card shadow enhancement */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10 scale-105`}></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .transform {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  )
}

export default HistorySection