// COMPONENT 3: FairInformation.jsx
// ============================================

export default function FairInformation({ fairInfo }) {
  return (
    <div className="mb-8 bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-3xl mr-3">🎪</span>
        Festival Fair
      </h3>
      
      <p className="text-gray-700 mb-6">{fairInfo.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Fair Stalls</h4>
          <div className="flex flex-wrap gap-2">
            {fairInfo.stalls.map((stall, index) => (
              <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm">
                {stall}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Special Attractions</h4>
          <ul className="space-y-2">
            {fairInfo.specialAttractions.map((attraction, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-600 mr-2">★</span>
                <span className="text-gray-700">{attraction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 bg-white p-3 rounded-lg inline-block">
        <p className="text-sm text-gray-600">
          <strong>Timings:</strong> {fairInfo.timings}
        </p>
      </div>
    </div>
  )
}