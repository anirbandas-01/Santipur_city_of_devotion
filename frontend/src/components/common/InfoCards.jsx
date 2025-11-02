export const InfoCards = ({ bestTime }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="text-4xl mb-3">📍</div>
        <h3 className="text-xl font-bold mb-2">Location</h3>
        <p className="text-orange-100">Santipur, West Bengal</p>
      </div>
      <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-6 text-white">
        <div className="text-4xl mb-3">🕐</div>
        <h3 className="text-xl font-bold mb-2">Best Time</h3>
        <p className="text-pink-100">{bestTime}</p>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
        <div className="text-4xl mb-3">🎭</div>
        <h3 className="text-xl font-bold mb-2">Experience</h3>
        <p className="text-blue-100">Spiritual & Cultural</p>
      </div>
    </div>
  );
};