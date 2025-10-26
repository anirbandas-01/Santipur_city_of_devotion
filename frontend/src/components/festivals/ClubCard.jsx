// frontend/src/components/festivals/ClubCard.jsx
import { useState } from 'react'
import { Mail, Calendar } from 'lucide-react'

export default function ClubCard({ club }) {
  const [showDetails, setShowDetails] = useState(false)

  // Guard clause - return null if club is undefined
  if (!club) {
    console.error('ClubCard: club prop is undefined')
    return null
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'N/A';
    }
  }

  // Get festival icon
  const getFestivalIcon = (festivalType) => {
    const icons = {
      'durga-puja': '🏺',
      'kali-puja': '🌙',
      'saraswati-puja': '📚',
      'lakshmi-puja': '💰',
      'jagaddhatri-puja': '🦁',
      'kartik-puja': '🏹',
      'rath-yatra': '🚂',
      'dol-yatra': '🎨',
      'janmashtami': '🪈',
      'ganesh-puja': '🐘',
      'cultural': '🎭',
      'other': '🎊'
    };
    return icons[festivalType] || '🎉';
  }

  // Format festival type
  const formatFestivalType = (festivalType) => {
    if (!festivalType) return 'Other';
    return festivalType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Get default image
  const defaultImage = 'https://images.unsplash.com/photo-1583309122708-cde2cd665952?w=800';
  const primaryImage = (club.images && club.images.length > 0) ? club.images[0] : defaultImage;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      {/* Club Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={primaryImage}
          alt={club.clubName || 'Club'}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            club.status === 'approved' 
              ? 'bg-green-500 text-white' 
              : club.status === 'pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            {club.status || 'Active'}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        {/* Club Name and Date */}
        <div className="mb-3">
          <h4 className="text-xl font-bold text-gray-800 mb-1">
            {club.clubName || 'Unnamed Club'}
          </h4>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>Added {formatDate(club.createdAt)}</span>
          </div>
        </div>

        {/* Festival Type Badge */}
        {club.festivalType && (
          <div className="mb-3">
            <span className="inline-flex items-center text-sm text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              {getFestivalIcon(club.festivalType)} {formatFestivalType(club.festivalType)}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {club.description || 'No description provided'}
        </p>

        {/* Toggle Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
        >
          {showDetails ? 'Show Less ▲' : 'Show More ▼'}
        </button>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            {/* Contact Email */}
            {club.email && (
              <div className="flex items-start text-sm text-gray-600">
                <Mail size={16} className="mr-2 mt-0.5 text-purple-600 flex-shrink-0" />
                <div>
                  <strong className="text-gray-700">Contact:</strong>
                  <br />
                  <a href={`mailto:${club.email}`} className="text-purple-600 hover:underline break-all">
                    {club.email}
                  </a>
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {club.images && club.images.length > 1 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Gallery:</p>
                <div className="grid grid-cols-3 gap-2">
                  {club.images.slice(1, 4).map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`${club.clubName} ${index + 2}`}
                      className="w-full h-20 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                      onClick={() => window.open(img, '_blank')}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ))}
                </div>
                {club.images.length > 4 && (
                  <p className="text-xs text-gray-500 mt-1">
                    +{club.images.length - 4} more images
                  </p>
                )}
              </div>
            )}

            {/* Full Description */}
            {showDetails && club.description && club.description.length > 100 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Full Description:</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {club.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}