// COMPONENT 5: ClubsList.jsx
// ============================================
function ClubsList({ clubs }) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-3xl mr-3">🏛️</span>
        Participating Clubs & Organizations
      </h3>
      <p className="text-gray-600 mb-6">
        Discover the various clubs and committees that organize and participate in this festival
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  )
}