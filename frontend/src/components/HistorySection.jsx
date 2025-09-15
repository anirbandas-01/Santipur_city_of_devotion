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