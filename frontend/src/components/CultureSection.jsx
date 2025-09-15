const CultureSection = () => {
  const cultureItems = [
    {
      icon: "🎪",
      title: "Rash Utsav",
      description: "The grand festival celebrating Lord Krishna with elaborate decorations, music, and devotional performances that captivate thousands."
    },
    {
      icon: "🎨",
      title: "Holi Celebration",
      description: "The festival of colors brings the entire community together in joyous celebration of spring and spiritual renewal."
    },
    {
      icon: "🎵",
      title: "Devotional Music",
      description: "Traditional kirtans and bhajans fill the air, creating an atmosphere of divine connection and spiritual awakening."
    }
  ]

  return (
    <section id="culture" className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">
            Cultural Heritage
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where tradition dances with devotion in every celebration
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cultureItems.map((item, index) => (
            <div 
              key={index}
              className="scroll-reveal glass-card p-8 rounded-2xl text-center"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="text-6xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-serif">{item.title}</h3>
              <p className="text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CultureSection