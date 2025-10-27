// frontend/src/components/festivals/ClubsList.jsx
import { useState } from 'react'
import ClubCard from './ClubCard.jsx'
import ClubDetailModal from './ClubDetailModal.jsx'

export default function ClubsList({ clubs }) {
  const [selectedClub, setSelectedClub] = useState(null)

  // Validate clubs prop
  if (!clubs) {
    console.error('ClubsList: clubs prop is undefined')
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: Unable to load clubs data</p>
      </div>
    )
  }

  if (!Array.isArray(clubs)) {
    console.error('ClubsList: clubs prop is not an array', typeof clubs)
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: Invalid clubs data format</p>
      </div>
    )
  }

  if (clubs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No clubs registered for this festival yet.</p>
      </div>
    )
  }

  // Filter out any invalid club objects
  const validClubs = clubs.filter(club => {
    if (!club || typeof club !== 'object') {
      console.warn('Invalid club object found:', club)
      return false
    }
    return true
  })

  if (validClubs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No valid clubs found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-3xl mr-3">🏛️</span>
          Participating Clubs & Organizations
        </h3>
        <p className="text-gray-600 mb-6">
          Discover the various clubs and committees that organize and participate in this festival
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validClubs.map((club, index) => {
            // Use _id if available, otherwise use index as fallback
            const key = club._id || club.id || `club-${index}`
            return (
              <ClubCard 
                key={key} 
                club={club}
                onViewDetails={(club) => setSelectedClub(club)}
              />
            )
          })}
        </div>

        {/* Info box */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">ℹ️</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Want to add your club?</h4>
              <p className="text-gray-600 text-sm mb-3">
                If you're organizing a club or committee for this festival, register now to showcase 
                your activities and connect with the community.
              </p>
              <a 
                href="/club-management"
                className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
              >
                Register Your Club
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Club Detail Modal */}
      {selectedClub && (
        <ClubDetailModal 
          club={selectedClub}
          onClose={() => setSelectedClub(null)}
        />
      )}
    </>
  )
}