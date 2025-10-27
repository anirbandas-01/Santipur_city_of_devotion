// frontend/src/components/festivals/ClubCard.jsx
import { useState, useEffect } from 'react'
import { Mail, Calendar, Eye } from 'lucide-react'

export default function ClubCard({ club, onViewDetails }) {
  const [showDetails, setShowDetails] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Guard clause - return null if club is undefined
  if (!club) {
    console.error('ClubCard: club prop is undefined')
    return null
  }

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (!club.images || club.images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === club.images.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [club.images])

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
  const images = club.images && club.images.length > 0 ? club.images : [defaultImage];
  const currentImage = images[currentImageIndex];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      {/* Club Image with Carousel */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          key={currentImageIndex}
          src={currentImage}
          alt={`${club.clubName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-fadeIn"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        
        {/* Status Badge */}
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

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
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

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
          >
            {showDetails ? 'Show Less ▲' : 'Show More ▼'}
          </button>
          
          <button
            onClick={() => onViewDetails && onViewDetails(club)}
            className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
          >
            <Eye size={16} />
            <span>View Full</span>
          </button>
        </div>

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

            {/* Image Count */}
            {images.length > 1 && (
              <div className="text-sm text-gray-600">
                <strong className="text-gray-700">Gallery:</strong> {images.length} images
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}