// frontend/src/components/festivals/ClubCard.jsx - ENHANCED VERSION
import { useState, useEffect } from 'react'
import { Mail, Calendar, Eye, MapPin, Phone, Users, Award, Globe, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react'

export default function ClubCard({ club, onViewDetails }) {
  const [showDetails, setShowDetails] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Guard clause
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

  const formatFestivalType = (festivalType) => {
    if (!festivalType) return 'Other';
    return festivalType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const getSocialIcon = (platform) => {
    const icons = {
      facebook: <Facebook size={16} className="text-blue-600" />,
      instagram: <Instagram size={16} className="text-pink-600" />,
      youtube: <Youtube size={16} className="text-red-600" />,
      website: <Globe size={16} className="text-purple-600" />
    };
    return icons[platform] || <Globe size={16} />;
  }

  const defaultImage = 'https://images.unsplash.com/photo-1583309122708-cde2cd665952?w=800';
  const images = club.images && club.images.length > 0 ? club.images : [defaultImage];
  const currentImage = images[currentImageIndex];

  // Check if social media links exist
  const hasSocialMedia = club.socialMedia && (
    club.socialMedia.facebook || 
    club.socialMedia.instagram || 
    club.socialMedia.youtube || 
    club.socialMedia.website
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
        {/* Club Name and Established Year */}
        <div className="mb-3">
          <h4 className="text-xl font-bold text-gray-800 mb-1">
            {club.clubName || 'Unnamed Club'}
          </h4>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>Added {formatDate(club.createdAt)}</span>
            </div>
            {club.establishedYear && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                Est. {club.establishedYear}
              </span>
            )}
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

        {/* Quick Info (Location & Members) */}
        <div className="flex flex-wrap gap-2 mb-3">
          {club.address && (
            <div className="flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
              <MapPin size={12} className="mr-1 text-gray-500" />
              <span className="line-clamp-1">{club.address.split(',')[0]}</span>
            </div>
          )}
          {club.memberCount && (
            <div className="flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
              <Users size={12} className="mr-1 text-gray-500" />
              <span>{club.memberCount} Members</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {club.description || 'No description provided'}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors"
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
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-slideDown">
            {/* Contact Info */}
            <div className="space-y-2">
              {club.email && (
                <div className="flex items-start text-sm text-gray-600">
                  <Mail size={16} className="mr-2 mt-0.5 text-purple-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <strong className="text-gray-700">Email:</strong><br />
                    <a href={`mailto:${club.email}`} className="text-purple-600 hover:underline break-all">
                      {club.email}
                    </a>
                  </div>
                </div>
              )}

              {club.phone && (
                <div className="flex items-start text-sm text-gray-600">
                  <Phone size={16} className="mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-700">Phone:</strong><br />
                    <a href={`tel:${club.phone}`} className="text-green-600 hover:underline">
                      {club.phone}
                    </a>
                  </div>
                </div>
              )}

              {club.address && (
                <div className="space-y-2">
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 mt-0.5 text-red-600 flex-shrink-0" />
                    <div className="flex-1">
                      <strong className="text-gray-700">Address:</strong><br />
                      <span className="text-gray-600">{club.address}</span>
                    </div>
                  </div>
                  <a 
                    href={
                      club.location?.latitude && club.location?.longitude
                        ? `https://www.google.com/maps?q=${club.location.latitude},${club.location.longitude}`
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(club.address)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-lg text-sm transition-all border border-red-200 group"
                  >
                    <MapPin size={16} className="text-red-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-semibold">
                      {club.location?.latitude && club.location?.longitude ? '📍 View Exact Location' : 'View on Google Maps'}
                    </span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Other Events */}
            {club.otherEvents && (
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-start text-sm">
                  <Award size={16} className="mr-2 mt-0.5 text-orange-600 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-700">Other Events:</strong><br />
                    <span className="text-gray-600">{club.otherEvents}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Links */}
            {hasSocialMedia && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                <strong className="text-sm text-gray-700 block mb-2">Connect with us:</strong>
                <div className="flex flex-wrap gap-2">
                  {club.socialMedia.facebook && (
                    <a 
                      href={club.socialMedia.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-blue-50 rounded-lg text-sm transition-colors border border-blue-200"
                    >
                      {getSocialIcon('facebook')}
                      <span className="text-gray-700">Facebook</span>
                    </a>
                  )}
                  {club.socialMedia.instagram && (
                    <a 
                      href={club.socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-pink-50 rounded-lg text-sm transition-colors border border-pink-200"
                    >
                      {getSocialIcon('instagram')}
                      <span className="text-gray-700">Instagram</span>
                    </a>
                  )}
                  {club.socialMedia.youtube && (
                    <a 
                      href={club.socialMedia.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-red-50 rounded-lg text-sm transition-colors border border-red-200"
                    >
                      {getSocialIcon('youtube')}
                      <span className="text-gray-700">YouTube</span>
                    </a>
                  )}
                  {club.socialMedia.website && (
                    <a 
                      href={club.socialMedia.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-purple-50 rounded-lg text-sm transition-colors border border-purple-200"
                    >
                      {getSocialIcon('website')}
                      <span className="text-gray-700">Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Gallery Count */}
            {images.length > 1 && (
              <div className="text-sm text-gray-600 text-center pt-2 border-t border-gray-100">
                📸 <strong>{images.length}</strong> photos in gallery
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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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