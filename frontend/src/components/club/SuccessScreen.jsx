// ============================================
// FILE: components/club/SuccessScreen.jsx
// ============================================
import { CheckCircle } from 'lucide-react';

const SuccessScreen = ({ isUpdate, onGoHome }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 pt-24">
    <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md animate-scaleIn">
      <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} className="text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">
        {isUpdate ? 'Updated Successfully!' : 'Uploaded Successfully!'}
      </h2>
      <p className="text-gray-600 mb-6">
        {isUpdate 
          ? 'Your club details have been updated.'
          : 'Your club has been submitted for review. You will be notified once approved.'}
      </p>
      <button
        onClick={onGoHome}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
      >
        Go to Home
      </button>
    </div>
  </div>
);

export default SuccessScreen;