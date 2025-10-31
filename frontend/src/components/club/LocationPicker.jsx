// frontend/src/components/club/LocationPicker.jsx
import { useState, useEffect } from 'react';
import { MapPin, Navigation, Check, AlertCircle } from 'lucide-react';

const LocationPicker = ({ formData, onFormChange }) => {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [locationSuccess, setLocationSuccess] = useState(false);

  useEffect(() => {
    // Clear success message after 3 seconds
    if (locationSuccess) {
      const timer = setTimeout(() => setLocationSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [locationSuccess]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setLocationError('');
    setLocationSuccess(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        onFormChange({
          ...formData,
          location: {
            ...formData.location,
            latitude: latitude.toFixed(7),
            longitude: longitude.toFixed(7)
          }
        });
        
        setIsLocating(false);
        setLocationSuccess(true);
        setLocationError('');
      },
      (error) => {
        setIsLocating(false);
        setLocationSuccess(false);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied. Please enable location access in your browser.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('An unknown error occurred while getting location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const clearLocation = () => {
    onFormChange({
      ...formData,
      location: {
        latitude: '',
        longitude: ''
      }
    });
    setLocationSuccess(false);
    setLocationError('');
  };

  const hasLocation = formData.location?.latitude && formData.location?.longitude;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Exact Temple/Club Location (GPS Coordinates)
          </label>
          <p className="text-xs text-gray-500">
            For precise location on Google Maps, capture your temple's exact GPS coordinates
          </p>
        </div>
      </div>

      {/* Coordinates Display/Input */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Latitude
          </label>
          <input
            type="text"
            value={formData.location?.latitude || ''}
            onChange={(e) => onFormChange({
              ...formData,
              location: {
                ...formData.location,
                latitude: e.target.value
              }
            })}
            placeholder="e.g., 23.4431"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Longitude
          </label>
          <input
            type="text"
            value={formData.location?.longitude || ''}
            onChange={(e) => onFormChange({
              ...formData,
              location: {
                ...formData.location,
                longitude: e.target.value
              }
            })}
            placeholder="e.g., 88.4351"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isLocating}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLocating ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Getting Location...</span>
            </>
          ) : (
            <>
              <Navigation size={18} />
              <span>Use Current Location</span>
            </>
          )}
        </button>

        {hasLocation && (
          <>
            <button
              type="button"
              onClick={clearLocation}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all"
            >
              Clear
            </button>
            
            <a
              href={`https://www.google.com/maps?q=${formData.location.latitude},${formData.location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-semibold transition-all flex items-center space-x-2"
            >
              <MapPin size={18} />
              <span>Preview</span>
            </a>
          </>
        )}
      </div>

      {/* Success Message */}
      {locationSuccess && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
          <Check size={20} className="text-green-600" />
          <span className="text-sm text-green-700 font-medium">
            Location captured successfully! Coordinates: {formData.location.latitude}, {formData.location.longitude}
          </span>
        </div>
      )}

      {/* Error Message */}
      {locationError && (
        <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-red-700">{locationError}</span>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">📍 How to get exact location:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <strong>Option 1:</strong> Click "Use Current Location" button while you're AT the temple/club</li>
          <li>• <strong>Option 2:</strong> Find your location on Google Maps, right-click → "What's here?" → Copy coordinates</li>
          <li>• <strong>Option 3:</strong> Use your phone's GPS app to get coordinates, then enter manually</li>
        </ul>
        <p className="text-xs text-blue-700 mt-3">
          💡 <strong>Tip:</strong> Having exact coordinates ensures visitors find your temple precisely on Google Maps!
        </p>
      </div>

      {/* Visual Guide */}
      {hasLocation && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <MapPin size={24} className="text-green-600 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-green-900 mb-1">Location Set Successfully!</h4>
              <p className="text-xs text-green-700 mb-2">
                Your exact location is now saved. Visitors will be directed to this precise spot on Google Maps.
              </p>
              <div className="bg-white p-2 rounded border border-green-200">
                <p className="text-xs text-gray-600 font-mono">
                  📍 {formData.location.latitude}, {formData.location.longitude}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LocationPicker;