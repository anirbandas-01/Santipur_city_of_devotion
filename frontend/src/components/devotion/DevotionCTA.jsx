export const DevotionCTA = () => {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-pink-600 text-white py-16">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Begin Your Spiritual Journey</h2>
        <p className="text-xl text-orange-100 mb-8">
          Visit Santipur and experience the divine grace that transforms lives
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-colors duration-300 shadow-lg">
            Plan Your Visit
          </button>
          <button className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/30 transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};