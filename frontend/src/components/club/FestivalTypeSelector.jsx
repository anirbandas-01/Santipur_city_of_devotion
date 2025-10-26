// ============================================
// FILE: components/club/FestivalTypeSelector.jsx
// ============================================
const FestivalTypeSelector = ({ festivalTypes, selectedType, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-3">
      Festival Type *
    </label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {festivalTypes.map((festival) => (
        <button
          key={festival.value}
          type="button"
          onClick={() => onChange(festival.value)}
          className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            selectedType === festival.value
              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-3xl mb-2">{festival.icon}</div>
          <div className="text-sm font-medium text-gray-700">{festival.label}</div>
        </button>
      ))}
    </div>
  </div>
);

export default FestivalTypeSelector;