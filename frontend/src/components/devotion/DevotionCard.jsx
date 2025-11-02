import { ImageCarousel } from '../common/ImageCarousel';
import { HighlightsList } from '../common/HighlightsList';

export const DevotionCard = ({ title, subtitle, icon, images, videos, description, highlights, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
    >
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
        
        <ImageCarousel images={images} alt={title} />

        <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
          <span className="text-3xl">{icon}</span>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-orange-600 font-medium text-lg">{subtitle}</p>
        </div>

        <p className="text-gray-700 text-base leading-relaxed mb-6">
          {description}
        </p>

        <HighlightsList highlights={highlights} />

        {videos.length > 0 && (
          <div className="flex items-center space-x-2 mt-6 mb-6">
            <div className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center space-x-2">
              <span className="text-white text-sm">🎥</span>
              <span className="text-white text-sm font-medium">{videos.length} Videos Available</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <span className="text-orange-600 font-semibold group-hover:underline">
            Explore More →
          </span>
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
              <span className="text-orange-600 text-xs">📖</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
              <span className="text-orange-600 text-xs">🙏</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};
