export const DevotionStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <div className="text-4xl font-bold mb-2">{stat.value}</div>
          <div className="text-orange-200">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};