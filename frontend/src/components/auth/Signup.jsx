// frontend/src/components/auth/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { X, Mail, Lock, User, Eye, EyeOff, ArrowLeft, UserPlus, Upload, Home } from "lucide-react";
import Toast from "../common/Toast";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showClubOptions, setShowClubOptions] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData);
      
      // Store user data and token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ name: formData.name, email: formData.email }));
      
      showToast("Account created successfully!", "success");
      
      // Show club upload options after successful signup
      setTimeout(() => {
        setShowClubOptions(true);
      }, 1500);
      
    } catch (error) {
      showToast(error.response?.data?.message || "Signup failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinueToClub = () => {
    navigate("/club-management");
  };

  const handleSkipToHome = () => {
    navigate("/");
    window.location.reload();
  };

  // Club Options Modal after successful signup
  if (showClubOptions) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
        
        <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-slideUp">
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Register Your Club?</h2>
            <p className="text-white/90">Would you like to add your club details now?</p>
          </div>

          <div className="p-8">
            <p className="text-gray-600 text-center mb-6">
              You can upload club photos, select festival types, and share your club's story with the community.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleContinueToClub}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
              >
                <Upload size={20} />
                <span>Continue to Upload</span>
              </button>

              <button
                onClick={handleSkipToHome}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
              >
                <Home size={20} />
                <span>Skip for Now</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Don't worry! You can always add your club details later from your profile menu.
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
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-slideUp">
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all z-10 group"
        >
          <ArrowLeft size={20} className="text-gray-600 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={handleBack}
          className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all hover:rotate-90 duration-300 z-10"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 p-10 text-center relative">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <UserPlus size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Join Santipur</h2>
          <p className="text-white/90 text-sm">Create your club account today</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Club Name</label>
            <div className="relative">
              <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter club name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Password must be at least 8 characters</p>
          </div>

          <div className="flex items-start space-x-2">
            <input 
              type="checkbox" 
              required
              className="w-4 h-4 mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
            />
            <label className="text-sm text-gray-600">
              I agree to the <button type="button" className="text-pink-600 hover:text-pink-700 font-medium">Terms & Conditions</button> and <button type="button" className="text-pink-600 hover:text-pink-700 font-medium">Privacy Policy</button>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full text-pink-600 hover:text-pink-700 font-semibold py-3 border-2 border-pink-200 rounded-xl hover:bg-pink-50 transition-all"
          >
            Sign In Instead
          </button>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
}