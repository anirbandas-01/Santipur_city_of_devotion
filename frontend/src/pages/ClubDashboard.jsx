// frontend/src/pages/ClubDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Upload, 
  Edit, 
  Eye, 
  Calendar, 
  Image as ImageIcon, 
  CheckCircle, 
  Clock,
  Plus,
  Home
} from 'lucide-react';
import { getCurrentUser, getAuthHeader, isClubUser } from '../utils/auth';
import Toast from '../components/common/Toast';

export default function ClubDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    
    // Check authentication and user type
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!isClubUser()) {
      navigate('/personal-dashboard');
      return;
    }

    setUser(currentUser);
    fetchClubData(currentUser.id);
  }, [navigate]);

  const fetchClubData = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubs?userId=${userId}`,
        { headers: getAuthHeader() }
      );

      if (res.data.clubs && res.data.clubs.length > 0) {
        setClub(res.data.clubs[0]);
      }
    } catch (error) {
      console.error('Failed to fetch club:', error);
      showToast('Failed to load club data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const festivalTypes = [
    { value: 'durga-puja', label: 'Durga Puja', icon: '🪔' },
    { value: 'kali-puja', label: 'Kali Puja', icon: '🌙' },
    { value: 'saraswati-puja', label: 'Saraswati Puja', icon: '📚' },
    { value: 'lakshmi-puja', label: 'Lakshmi Puja', icon: '💰' },
    { value: 'jagaddhatri-puja', label: 'Jagaddhatri Puja', icon: '🦁' },
    { value: 'kartik-puja', label: 'Kartik Puja', icon: '🏹' },
    { value: 'rath-yatra', label: 'Rath Yatra', icon: '🚩' },
    { value: 'dol-yatra', label: 'Dol Yatra', icon: '🎨' },
    { value: 'janmashtami', label: 'Janmashtami', icon: '🪈' },
    { value: 'ganesh-puja', label: 'Ganesh Puja', icon: '🐘' },
    { value: 'cultural', label: 'Cultural', icon: '🎭' },
    { value: 'other', label: 'Other', icon: '🎊' }
  ];

  const getFestivalInfo = (type) => {
    return festivalTypes.find(f => f.value === type) || festivalTypes[festivalTypes.length - 1];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // No club registered yet
  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-12 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to Santipur</h1>
              <p className="text-white/90">Set up your club profile to get started</p>
            </div>

            <div className="p-12 text-center">
              <p className="text-gray-600 mb-8 text-lg">
                You haven't registered your club yet. Let's create your club profile and showcase it to the community!
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-purple-50 rounded-xl">
                  <div className="text-3xl mb-3">📸</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Upload Photos</h3>
                  <p className="text-sm text-gray-600">Share your club's memorable moments</p>
                </div>
                <div className="p-6 bg-pink-50 rounded-xl">
                  <div className="text-3xl mb-3">🎭</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Share Details</h3>
                  <p className="text-sm text-gray-600">Tell your club's story</p>
                </div>
                <div className="p-6 bg-orange-50 rounded-xl">
                  <div className="text-3xl mb-3">🌟</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Get Discovered</h3>
                  <p className="text-sm text-gray-600">Connect with the community</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/club-management')}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all inline-flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Register Your Club</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Club registered - show dashboard
  const festivalInfo = getFestivalInfo(club.festivalType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors mb-4"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Club Dashboard</h1>
          <p className="text-gray-600">Manage your club and track performance</p>
        </div>

        {/* Club Overview Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
                  {festivalInfo.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{club.clubName}</h2>
                  <p className="text-white/80">{festivalInfo.label}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/club-management')}
                  className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/30 transition-all flex items-center space-x-2"
                >
                  <Edit size={20} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ImageIcon size={24} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{club.images?.length || 0}</p>
              <p className="text-sm text-gray-600">Photos</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Eye size={24} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{club.views || 0}</p>
              <p className="text-sm text-gray-600">Views</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                {club.status === 'approved' ? (
                  <CheckCircle size={24} className="text-green-600" />
                ) : (
                  <Clock size={24} className="text-yellow-600" />
                )}
              </div>
              <p className="text-2xl font-bold text-gray-800 capitalize">{club.status}</p>
              <p className="text-sm text-gray-600">Status</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar size={24} className="text-pink-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {new Date(club.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-600">Joined</p>
            </div>
          </div>
        </div>

        {/* Club Details */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Description */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About Your Club</h3>
            <p className="text-gray-600 leading-relaxed">
              {club.description || 'No description added yet. Edit your club to add a description.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/club-management')}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all"
              >
                <Edit size={20} className="text-purple-600" />
                <span className="font-medium text-gray-800">Edit Club Details</span>
              </button>

              <button
                onClick={() => navigate(`/festivals?club=${club._id}`)}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all"
              >
                <Eye size={20} className="text-green-600" />
                <span className="font-medium text-gray-800">View Public Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Preview */}
        {club.images && club.images.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Photo Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {club.images.slice(0, 8).map((img, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden group">
                  <img 
                    src={img} 
                    alt={`Club ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}