// frontend/src/components/festivals/ClubDetailModal.jsx - WITH GOOGLE MAPS
import { useState } from 'react'
import { X, Mail, Calendar, Image as ImageIcon, ArrowLeft, ExternalLink, MapPin, Phone, Users, Award, Globe, Facebook, Instagram, Youtube } from 'lucide-react'

export default function ClubDetailModal({ club, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!club) return null

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
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
      facebook: <Facebook size={18} className="text-blue-600" />,
      instagram: <Instagram size={18} className="text-pink-600" />,
      youtube: <Youtube size={18} className="text-red-600" />,
      website: <Globe size={18} className="text-purple-600" />
    };
    return icons[platform] || <Globe size={18} />;
  }

  const defaultImage = 'https://images.unsplash.com/photo-1583309122708-cde2cd665952?w=800';
  const images = club.images && club.images.length > 0 ? club.images : [defaultImage];

  // Check if social media links exist
  const hasSocialMedia = club.socialMedia && (
    club.socialMedia.facebook || 
    club.socialMedia.instagram || 
    club.socialMedia.youtube || 
    club.socialMedia.website
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center pt-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              {getFestivalIcon(club.festivalType)}
            </div>
            <h2 className="text-3xl font-bold mb-2">{club.clubName}</h2>
            <p className="text-pink-100">{formatFestivalType(club.festivalType)}</p>
            {club.establishedYear && (
              <p className="text-pink-200 text-sm mt-2">Established in {club.establishedYear}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Status Badge */}
          <div className="mb-6 flex justify-center">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              club.status === 'approved' 
                ? 'bg-green-100 text-green-700' 
                : club.status === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              Status: {club.status || 'Active'}
            </span>
          </div>

          {/* Main Image Gallery */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <ImageIcon size={24} className="mr-2 text-purple-600" />
              Club Gallery
            </h3>
            
            {/* Selected Image */}
            <div className="relative rounded-xl overflow-hidden mb-4 bg-gray-100">
              <img 
                src={images[selectedImage]}
                alt={`${club.clubName} - Image ${selectedImage + 1}`}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-purple-600 scale-105 shadow-lg' 
                        : 'border-gray-200 hover:border-purple-400'
                    }`}
                  >
                    <img 
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-16 object-cover"
                      onError={(e) => {
                        e.target.src = defaultImage;
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Club Details */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">About the Club</h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  {club.description || 'No description provided for this club.'}
                </p>
              </div>
            </div>

            {/* Contact & Location Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Contact & Location</h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl space-y-3">
                {club.email && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 font-medium">Email Address</p>
                      <a 
                        href={`mailto:${club.email}`}
                        className="text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-1 break-all"
                      >
                        <span>{club.email}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                )}

                {club.phone && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Phone Number</p>
                      <a 
                        href={`tel:${club.phone}`}
                        className="text-green-600 hover:text-green-700 font-semibold"
                      >
                        {club.phone}
                      </a>
                    </div>
                  </div>
                )}

                {club.address && (
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 font-medium">Address</p>
                        <p className="text-gray-800 font-semibold">{club.address}</p>
                      </div>
                    </div>
                    
                    {/* Google Maps Button */}
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(club.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg group"
                    >
                      <MapPin size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">View on Google Maps</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Registered On</p>
                    <p className="text-gray-800 font-semibold">{formatDate(club.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Events */}
            {club.otherEvents && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <Award size={24} className="mr-2 text-orange-600" />
                  Other Events Organized
                </h3>
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                  <p className="text-gray-700 leading-relaxed">{club.otherEvents}</p>
                </div>
              </div>
            )}

            {/* Social Media Links */}
            {hasSocialMedia && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Connect With Us</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                  <div className="grid grid-cols-2 gap-3">
                    {club.socialMedia.facebook && (
                      <a 
                        href={club.socialMedia.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-3 bg-white hover:bg-blue-50 rounded-lg transition-all border border-blue-200 group"
                      >
                        {getSocialIcon('facebook')}
                        <span className="text-gray-700 font-semibold">Facebook</span>
                        <ExternalLink size={14} className="ml-auto text-gray-400 group-hover:text-blue-600" />
                      </a>
                    )}
                    {club.socialMedia.instagram && (
                      <a 
                        href={club.socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-3 bg-white hover:bg-pink-50 rounded-lg transition-all border border-pink-200 group"
                      >
                        {getSocialIcon('instagram')}
                        <span className="text-gray-700 font-semibold">Instagram</span>
                        <ExternalLink size={14} className="ml-auto text-gray-400 group-hover:text-pink-600" />
                      </a>
                    )}
                    {club.socialMedia.youtube && (
                      <a 
                        href={club.socialMedia.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-3 bg-white hover:bg-red-50 rounded-lg transition-all border border-red-200 group"
                      >
                        {getSocialIcon('youtube')}
                        <span className="text-gray-700 font-semibold">YouTube</span>
                        <ExternalLink size={14} className="ml-auto text-gray-400 group-hover:text-red-600" />
                      </a>
                    )}
                    {club.socialMedia.website && (
                      <a 
                        href={club.socialMedia.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-3 bg-white hover:bg-purple-50 rounded-lg transition-all border border-purple-200 group"
                      >
                        {getSocialIcon('website')}
                        <span className="text-gray-700 font-semibold">Website</span>
                        <ExternalLink size={14} className="ml-auto text-gray-400 group-hover:text-purple-600" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Additional Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Festival Category</p>
                  <p className="text-gray-800 font-semibold flex items-center">
                    <span className="mr-2">{getFestivalIcon(club.festivalType)}</span>
                    {formatFestivalType(club.festivalType)}
                  </p>
                </div>

                {club.memberCount && (
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Club Members</p>
                    <p className="text-gray-800 font-semibold flex items-center">
                      <Users size={20} className="mr-2 text-green-600" />
                      {club.memberCount} Members
                    </p>
                  </div>
                )}

                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Total Images</p>
                  <p className="text-gray-800 font-semibold">
                    {images.length} {images.length === 1 ? 'Photo' : 'Photos'}
                  </p>
                </div>

                {club.establishedYear && (
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Club Age</p>
                    <p className="text-gray-800 font-semibold">
                      {new Date().getFullYear() - club.establishedYear} Years Old
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Last Updated */}
            {club.updatedAt && club.updatedAt !== club.createdAt && (
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-600">
                  Last updated on <span className="font-semibold text-gray-800">{formatDate(club.updatedAt)}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}