const DevotionSection = () => {
  const devotionFeatures = [
    {
      icon: "🏛️",
      title: "Sacred Temples",
      description: "Ancient temples that serve as pillars of spiritual strength for the community.",
      bgColor: "bg-blue-100"
    },
    {
      icon: "📿", 
      title: "Daily Rituals",
      description: "Community practices that keep the devotional energy alive and thriving.",
      bgColor: "bg-purple-100"
    },
    {
      icon: "👥",
      title: "Spiritual Community", 
      description: "A community united in faith, supporting each other's spiritual journey.",
      bgColor: "bg-pink-100"
    }
  ]

  return (
    <section id="devotion" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
            A Devotional Legacy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With deep roots in spirituality, Santipur has been home to poets, philosophers, and saints who spread the message of devotion and love.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="scroll-reveal">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-12 rounded-3xl text-white text-center">
              <div className="text-4xl mb-6">🕉️</div>
              <blockquote className="text-2xl font-serif italic mb-6">
                "In devotion, we find not just peace, but the very essence of our being."
              </blockquote>
              <p className="text-blue-100">- Sacred Teachings of Santipur</p>
            </div>
          </div>
          
          <div className="scroll-reveal space-y-8">
            {devotionFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
            
            <div className="flex gap-4 pt-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Explore Temples
              </button>
              <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DevotionSection