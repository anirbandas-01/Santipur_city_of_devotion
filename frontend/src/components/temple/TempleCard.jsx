// frontend/src/components/temple/TempleCard.jsx
export default function TempleCard({ temple, onLearnMore }) {
  return (
    <div className="scroll-reveal group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
        {/* Temple Image */}
        <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
          
          {/* Check if image is a URL or emoji */}
          {temple.image.startsWith('http') ? (
            <img 
              src={temple.image} 
              alt={temple.name}
              className="w-full h-full object-cover relative z-10 transform group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <span className="text-8xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
              {temple.image}
            </span>
          )}
          
          {/* Period Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {temple.period}
            </div>
          </div>

          {/* Club Source Badge (if from club) */}
          {temple.isFromClub && (
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                🎭 Club Temple
              </div>
            </div>
          )}

          {/* Decorative elements */}
          <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/30 rounded-full blur-xl"></div>
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-white/30 rounded-full blur-lg"></div>
        </div>

        {/* Temple Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
            {temple.name}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-4 flex-1 text-base">
            {temple.shortDesc}
          </p>

          {/* Quick Feature Preview */}
          {temple.specialFeatures && temple.specialFeatures.length > 0 && (
            <div className="mb-4 p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-700 flex items-start">
                <span className="text-amber-600 mr-2">✦</span>
                <span className="font-semibold">{temple.specialFeatures[0]}</span>
              </p>
            </div>
          )}

          <button 
            onClick={() => onLearnMore(temple)}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Learn More</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}