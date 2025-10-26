// frontend/src/components/club/SuccessScreen.jsx
import { CheckCircle, Home, Eye } from 'lucide-react';

const SuccessScreen = ({ isUpdate, onGoHome, onViewFestivals }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 pt-24">
      <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md animate-scaleIn">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
          <CheckCircle size={40} className="text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {isUpdate ? 'Updated Successfully!' : 'Uploaded Successfully!'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {isUpdate 
            ? 'Your club details have been updated successfully.' 
            : 'Your club has been submitted for review. Once approved, it will be visible on the festivals page.'}
        </p>

        {!isUpdate && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Next Steps:</strong> Our team will review your submission. 
              You'll receive a notification once your club is approved!
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onGoHome}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            <Home size={20} />
            <span>Go to Home</span>
          </button>
          
          <button
            onClick={onViewFestivals}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all hover:scale-105"
          >
            <Eye size={20} />
            <span>View Festivals</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessScreen;