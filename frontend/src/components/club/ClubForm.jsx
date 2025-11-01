// frontend/src/components/club/ClubForm.jsx - WITH TEMPLE TOGGLE
import { Upload, FileText, Mail, Save, MapPin, Calendar, Users, Link as LinkIcon, Award } from 'lucide-react';
import FestivalTypeSelector from './FestivalTypeSelector';
import ImageUploader from './ImageUploader';
import BackButton from './BackButton';
import LocationPicker from './LocationPicker';
import TempleToggle from './TempleToggle';

const ClubForm = ({ 
  formData, 
  previewImages, 
  loading, 
  existingClub,
  festivalTypes,
  existingImagesCount = 0,
  newImagesCount = 0,
  onFormChange,
  onImageUpload,
  onRemoveImage,
  onSubmit,
  onBack
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton 
          onClick={onBack}
          text={existingClub ? 'Cancel & Go Home' : 'Back to Home'}
        />

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {existingClub ? 'Update Your Club' : 'Register Your Club'}
            </h1>
            <p className="text-white/90">
              {existingClub ? 'Modify your club details and images' : 'Share your club details with the community'}
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* SECTION 1: Basic Information */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText size={24} className="mr-2 text-blue-600" />
                Basic Information
              </h3>
              
              <div className="space-y-4">
                {/* Club Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Club Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clubName}
                    onChange={(e) => onFormChange({ ...formData, clubName: e.target.value })}
                    placeholder="Enter your club name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Festival Type Selector */}
                <FestivalTypeSelector
                  festivalTypes={festivalTypes}
                  selectedType={formData.festivalType}
                  onChange={(type) => onFormChange({ ...formData, festivalType: type })}
                />

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
                    placeholder="Tell us about your club, its history, and activities..."
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* NEW SECTION: Temple Toggle */}
            <TempleToggle
              isTemple={formData.isTemple || false}
              onChange={(value) => onFormChange({ ...formData, isTemple: value })}
            />

            {/* SECTION 2: Contact & Location */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MapPin size={24} className="mr-2 text-green-600" />
                Contact & Location
              </h3>
              
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Email *
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => onFormChange({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address / Location
                  </label>
                  <textarea
                    value={formData.address || ''}
                    onChange={(e) => onFormChange({ ...formData, address: e.target.value })}
                    placeholder="e.g., Near Railway Station, Santipur, Nadia - 741404"
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Provide a short address for visitors</p>
                </div>

                {/* GPS Location Picker */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <LocationPicker 
                    formData={formData}
                    onFormChange={onFormChange}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Club Details */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar size={24} className="mr-2 text-orange-600" />
                Club Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Established Year */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Established Year
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={currentYear}
                    value={formData.establishedYear || ''}
                    onChange={(e) => onFormChange({ ...formData, establishedYear: e.target.value })}
                    placeholder="e.g., 1985"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Member Count */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Members (Optional)
                  </label>
                  <div className="relative">
                    <Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      value={formData.memberCount || ''}
                      onChange={(e) => onFormChange({ ...formData, memberCount: e.target.value })}
                      placeholder="e.g., 50"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Other Events Organized */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Award size={18} className="mr-2 text-orange-600" />
                  Other Events Organized
                </label>
                <textarea
                  value={formData.otherEvents || ''}
                  onChange={(e) => onFormChange({ ...formData, otherEvents: e.target.value })}
                  placeholder="e.g., Blood Donation Camp, Cultural Programs, Sports Events..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">List other events or activities your club organizes</p>
              </div>
            </div>

            {/* SECTION 4: Social Media Links */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <LinkIcon size={24} className="mr-2 text-pink-600" />
                Social Media Links
              </h3>
              
              <div className="space-y-4">
                {/* Facebook */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">📘</span> Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia?.facebook || ''}
                    onChange={(e) => onFormChange({ 
                      ...formData, 
                      socialMedia: { ...formData.socialMedia, facebook: e.target.value }
                    })}
                    placeholder="https://facebook.com/yourclub"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">📷</span> Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia?.instagram || ''}
                    onChange={(e) => onFormChange({ 
                      ...formData, 
                      socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                    })}
                    placeholder="https://instagram.com/yourclub"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* YouTube */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">📺</span> YouTube
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia?.youtube || ''}
                    onChange={(e) => onFormChange({ 
                      ...formData, 
                      socialMedia: { ...formData.socialMedia, youtube: e.target.value }
                    })}
                    placeholder="https://youtube.com/@yourclub"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">🌐</span> Website
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia?.website || ''}
                    onChange={(e) => onFormChange({ 
                      ...formData, 
                      socialMedia: { ...formData.socialMedia, website: e.target.value }
                    })}
                    placeholder="https://yourclub.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: Image Uploader */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl">
              <ImageUploader
                previewImages={previewImages}
                onImageUpload={onImageUpload}
                onRemoveImage={onRemoveImage}
                existingImagesCount={existingImagesCount}
                newImagesCount={newImagesCount}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={onSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{existingClub ? 'Updating...' : 'Uploading...'}</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>{existingClub ? 'Update Club' : 'Submit for Review'}</span>
                </>
              )}
            </button>

            {/* Info Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> {existingClub 
                  ? 'Changes will be saved when you click "Update Club".'
                  : 'Your club submission will be reviewed by our team. You\'ll be notified once it\'s approved and visible on the website.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubForm;