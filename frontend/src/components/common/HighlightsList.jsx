export const HighlightsList = ({ highlights }) => {
  return (
    <div className="space-y-3">
      {highlights.map((highlight, idx) => (
        <div key={idx} className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-orange-600 text-sm">✓</span>
          </div>
          <p className="text-gray-600 text-sm">{highlight}</p>
        </div>
      ))}
    </div>
  );
};