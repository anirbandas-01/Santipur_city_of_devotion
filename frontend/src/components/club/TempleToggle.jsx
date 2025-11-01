// frontend/src/components/club/TempleToggle.jsx
import { Home } from 'lucide-react';

const TempleToggle = ({ isTemple, onChange }) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Home size={24} className="text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
            Is this a Temple (Mandir)?
            <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">Optional</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            If your club is associated with a permanent temple/mandir, enable this option. 
            Your temple will be displayed in the <strong>Sacred Temples</strong> section along with festivals.
          </p>
          
          {/* Toggle Switch */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => onChange(!isTemple)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                isTemple ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                  isTemple ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            
            <span className={`text-sm font-semibold ${isTemple ? 'text-amber-700' : 'text-gray-600'}`}>
              {isTemple ? '✓ Yes, this is a Temple' : 'No, only a Festival Club'}
            </span>
          </div>
          
          {/* Info when enabled */}
          {isTemple && (
            <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>🕉️ Temple Mode Enabled:</strong> Your club will appear in both:
              </p>
              <ul className="text-xs text-amber-700 mt-2 space-y-1 ml-4">
                <li>• <strong>Sacred Temples</strong> page (based on your festival type)</li>
                <li>• <strong>Festivals</strong> page (as usual)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TempleToggle;