export const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['about', 'gallery', 'videos'];
  
  return (
    <div className="sticky top-0 bg-white shadow-md z-30">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 font-semibold capitalize transition-all duration-300 border-b-4 ${
                activeTab === tab
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-orange-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};