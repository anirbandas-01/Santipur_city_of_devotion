// COMPONENT 4: ClubCard.jsx
// ============================================
function ClubCard({ club }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <img 
        src={club.images[0]} 
        alt={club.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-bold text-gray-800">{club.name}</h4>
          <span className="text-sm text-gray-500">Est. {club.established}</span>
        </div>

        <div className="mb-3">
          <span className="inline-flex items-center text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
            🕉️ {club.deity}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{club.description}</p>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
        >
          {showDetails ? 'Show Less ▲' : 'Show More ▼'}
        </button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              <strong>Location:</strong> {club.location}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Contact:</strong> {club.contactPerson}
            </p>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
              <ul className="space-y-1">
                {club.specialties.map((specialty, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
