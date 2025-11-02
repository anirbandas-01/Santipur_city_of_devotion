export const VideoCard = ({ video, index }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">▶</span>
          </div>
          <p className="text-lg font-semibold">{video.title}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700">{video.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Duration: {video.duration}</span>
          <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors duration-300">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};