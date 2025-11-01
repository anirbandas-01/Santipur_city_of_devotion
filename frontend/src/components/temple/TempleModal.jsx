// frontend/src/components/temple/TempleModal.jsx
export default function TempleModal({ temple, onClose }) {
  if (!temple) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto my-8">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white rounded-t-3xl z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <span className="text-3xl leading-none">&times;</span>
          </button>
          
          <div className="flex items-center space-x-6 pr-16">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl overflow-hidden">
              {temple.image.startsWith('http') ? (
                <img src={temple.image} alt={temple.name} className="w-full h-full object-cover" />
              ) : (
                temple.image
              )}
            </div>
            <div>
              <h2 className="text-4xl font-bold font-serif mb-2">{temple.name}</h2>
              <p className="text-amber-100 text-lg">{temple.period}</p>
              {temple.isFromClub && (
                <p className="text-green-200 text-sm mt-1">🎭 Registered Club Temple</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          {/* Temple Gallery */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Temple Gallery</h3>
            <div className="relative group">
              <button
                onClick={() => {
                  const container = document.getElementById(`gallery-${temple.id}`);
                  if (container) container.scrollBy({ left: -350, behavior: 'smooth' });
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  const container = document.getElementById(`gallery-${temple.id}`);
                  if (container) container.scrollBy({ left: 350, behavior: 'smooth' });
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div 
                id={`gallery-${temple.id}`}
                className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {temple.gallery?.map((img, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 h-64 bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer snap-start overflow-hidden"
                  >
                    {img.startsWith('http') ? (
                      <img 
                        src={img} 
                        alt={`${temple.name} gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-8xl">{img}</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-4 gap-2">
                {temple.gallery?.map((_, index) => (
                  <div key={index} className="w-2 h-2 rounded-full bg-amber-300"></div>
                ))}
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              ← Scroll horizontally to view all images →
            </p>
          </div>

          {/* Temple Description */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Temple</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{temple.fullDesc}</p>
          </div>

          {/* Special Features */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Special Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {temple.specialFeatures?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
                >
                  <span className="text-amber-600 text-xl mt-1">✦</span>
                  <span className="text-gray-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Location Information (for club temples) */}
          {temple.isFromClub && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact & Location</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-lg">
                <div>
                  {temple.address && (
                    <p className="mb-3"><span className="font-semibold">📍 Address:</span> {temple.address}</p>
                  )}
                  {temple.phone && (
                    <p className="mb-3"><span className="font-semibold">📞 Phone:</span> {temple.phone}</p>
                  )}
                </div>
                <div>
                  {temple.email && (
                    <p className="mb-3"><span className="font-semibold">📧 Email:</span> {temple.email}</p>
                  )}
                  {temple.location?.latitude && temple.location?.longitude && (
                    <p className="mb-3">
                      <a 
                        href={`https://www.google.com/maps?q=${temple.location.latitude},${temple.location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        🗺️ View on Google Maps
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Social Media Links */}
              {temple.socialMedia && Object.values(temple.socialMedia).some(link => link) && (
                <div className="mt-6 pt-6 border-t border-green-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Connect With Us</h4>
                  <div className="flex flex-wrap gap-3">
                    {temple.socialMedia.facebook && (
                      <a href={temple.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        📘 Facebook
                      </a>
                    )}
                    {temple.socialMedia.instagram && (
                      <a href={temple.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                        📷 Instagram
                      </a>
                    )}
                    {temple.socialMedia.youtube && (
                      <a href={temple.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        📺 YouTube
                      </a>
                    )}
                    {temple.socialMedia.website && (
                      <a href={temple.socialMedia.website} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                        🌐 Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Visitor Information */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Visitor Information</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-lg">
              <div>
                <p className="mb-3"><span className="font-semibold">📍 Location:</span> Santipur, Nadia District</p>
                <p className="mb-3"><span className="font-semibold">🕐 Best Time:</span> Early morning or evening aarti</p>
              </div>
              <div>
                <p className="mb-3"><span className="font-semibold">🎟️ Entry:</span> Free for all devotees</p>
                <p className="mb-3"><span className="font-semibold">📸 Photography:</span> Allowed in courtyard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-8 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}