// frontend/src/components/festivals/ClubDetailModal.jsx
import { useState } from 'react'
import { X, Mail, Calendar, Image as ImageIcon, ArrowLeft, ExternalLink } from 'lucide-react'

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

  const defaultImage = 'https://images.unsplash.com/photo-1583309122708-cde2cd665952?w=800';
  const images = club.images && club.images.length > 0 ? club.images : [defaultImage];

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

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Contact Information</h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl space-y-3">
                {club.email && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Email Address</p>
                      <a 
                        href={`mailto:${club.email}`}
                        className="text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-1"
                      >
                        <span>{club.email}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Calendar size={20} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Registered On</p>
                    <p className="text-gray-800 font-semibold">{formatDate(club.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

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

                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Total Images</p>
                  <p className="text-gray-800 font-semibold">
                    {images.length} {images.length === 1 ? 'Photo' : 'Photos'}
                  </p>
                </div>
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