const cloudinaryImg =  {
  sareeImg: "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1759867443/WhatsApp_Image_2025-10-08_at_01.31.30_12717eea_wzodjt.jpg"
}

  const SareeSection = () => {
  const features = [
    {
      number: "1",
      title: "Traditional Craftsmanship",
      description: "Passed down through generations, each piece represents centuries of refined technique."
    },
    {
      number: "2", 
      title: "Cultural Symbol",
      description: "More than clothing - it's a representation of Bengal's rich textile heritage."
    },
    {
      number: "3",
      title: "Global Recognition", 
      description: "Celebrated worldwide for its quality, design, and cultural significance."
    }
  ]

  return (
    <section id="sarees" className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
              Santipuri Saree
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              World-famous handloom weaving tradition that represents the artistic soul of Santipur. Each saree tells a story of generations of skilled artisans.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">{feature.number}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-8 px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105">
              Explore Our Sarees
            </button>
          </div>
          
          <div className="scroll-reveal">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl flex items-center justify-center">
                {/*<div className="text-8xl opacity-50">🧵</div>*/}

                <img 
                 src={cloudinaryImg.sareeImg}
                 alt="Santi puri Saree"
                 className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-3xl text-white">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SareeSection