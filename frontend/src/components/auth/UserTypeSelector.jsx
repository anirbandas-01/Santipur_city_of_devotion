// frontend/src/components/auth/UserTypeSelector.jsx
import { Building2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelector = ({ onSelectType }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
      
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Join Santipur Community</h1>
          <p className="text-white/90 text-lg">Choose how you want to participate</p>
        </div>

        {/* Options */}
        <div className="p-8 grid md:grid-cols-2 gap-6">
          {/* Club Registration */}
          <button
            onClick={() => onSelectType('club')}
            className="group relative bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 text-left"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 size={32} className="text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Register as Club</h3>
            
            <p className="text-gray-600 mb-4">
              Perfect for Puja committees, cultural organizations, and community clubs who want to showcase their activities and events.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Upload club photos & videos</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Manage events & announcements</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Connect with community members</span>
              </div>
            </div>

            <div className="text-purple-600 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
              <span>Continue as Club</span>
              <span>→</span>
            </div>
          </button>

          {/* Personal Registration */}
          <button
            onClick={() => onSelectType('personal')}
            className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 text-left opacity-60 cursor-not-allowed"
            disabled
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
              <User size={32} className="text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Join as Member</h3>
            
            <p className="text-gray-600 mb-4">
              Ideal for individuals who want to explore Santipur's culture, join clubs, and participate in community events.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Browse all clubs & festivals</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Join multiple clubs</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Get event notifications</span>
              </div>
            </div>

            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium mb-4">
              Coming Soon - Phase 2
            </div>

            <div className="text-blue-600 font-semibold flex items-center space-x-2 opacity-50">
              <span>Join as Member</span>
              <span>→</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserTypeSelector;