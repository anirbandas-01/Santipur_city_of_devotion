// COMPONENT 1: FestivalCard.jsx
// ============================================

export default function FestivalCard({ festival, onClick }) {
  return (
    <div
      className="scroll-reveal bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className={`bg-gradient-to-r ${festival.color} p-6 rounded-t-2xl text-white`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            {festival.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif">{festival.name}</h3>
            <p className="text-sm opacity-90">{festival.season} Festival</p>
          </div>
        </div>
        <p className="text-sm opacity-90">{festival.date}</p>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
          {festival.description}
        </p>

        <div className="flex justify-between items-center text-sm">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {festival.duration}
          </span>
          <button className="text-red-600 font-semibold hover:text-red-700 transition-colors">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  )
}