// ============================================
// FILE: components/club/ClubForm.jsx
// ============================================
import { Upload, FileText, Mail, Save } from 'lucide-react';
import FestivalTypeSelector from './FestivalTypeSelector';
import ImageUploader from './ImageUploader';
import BackButton from './BackButton';

const ClubForm = ({ 
  formData, 
  previewImages, 
  loading, 
  existingClub,
  festivalTypes,
  onFormChange,
  onImageUpload,
  onRemoveImage,
  onSubmit,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton 
          onClick={onBack}
          text={existingClub ? 'Cancel & Go Home' : 'Back to Home'}
        />

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
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

          <div className="p-8 space-y-6">
            {/* Club Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Club Name *
              </label>
              <div className="relative">
                <FileText size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.clubName}
                  onChange={(e) => onFormChange({ ...formData, clubName: e.target.value })}
                  placeholder="Enter your club name"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
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

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Email
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

            {/* Image Uploader */}
            <ImageUploader
              previewImages={previewImages}
              onImageUpload={onImageUpload}
              onRemoveImage={onRemoveImage}
            />

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
                <strong>Note:</strong> Your club submission will be reviewed by our team. 
                You'll be notified once it's approved and visible on the website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubForm;
