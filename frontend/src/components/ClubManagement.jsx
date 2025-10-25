// frontend/src/components/ClubManagement.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ImagePlus, FileText, Calendar, Mail, Save, Trash2, Edit, CheckCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import Toast from './common/Toast';

export default function ClubManagement() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingClub, setExistingClub] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    clubName: '',
    festivalType: '',
    description: '',
    email: '',
    images: []
  });
  
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const festivalTypes = [
    { value: 'durga-puja', label: 'Durga Puja', icon: '🪔' },
    { value: 'kali-puja', label: 'Kali Puja', icon: '🌙' },
    { value: 'saraswati-puja', label: 'Saraswati Puja', icon: '📚' },
    { value: 'lakshmi-puja', label: 'Lakshmi Puja', icon: '💰' },
    { value: 'jagaddhatri-puja', label: 'Jagaddhatri Puja', icon: '🦁' },
    { value: 'kartik-puja', label: 'Kartik Puja', icon: '🏹' },
    { value: 'rath-yatra', label: 'Rath Yatra', icon: '🚩' },
    { value: 'dol-yatra', label: 'Dol Yatra (Holi)', icon: '🎨' },
    { value: 'janmashtami', label: 'Janmashtami', icon: '🪈' },
    { value: 'ganesh-puja', label: 'Ganesh Puja', icon: '🐘' },
    { value: 'cultural', label: 'Cultural Events', icon: '🎭' },
    { value: 'other', label: 'Other Festivals', icon: '🎊' }
  ];

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(savedUser);
    setUser(userData);
    setFormData(prev => ({ ...prev, email: userData.email }));
    
    // Fetch existing club data
    fetchExistingClub(userData.email);
  }, [navigate]);

  const fetchExistingClub = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/clubs?email=${email}`);
      if (res.data && res.data.length > 0) {
        const club = res.data[0];
        setExistingClub(club);
        setFormData({
          clubName: club.clubName,
          festivalType: club.festivalType,
          description: club.description,
          email: club.email,
          images: []
        });
        setPreviewImages(club.images || []);
      }
    } catch (error) {
      console.log('No existing club found');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + previewImages.length > 10) {
      showToast('You can upload maximum 10 images', 'error');
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData({ ...formData, images: newImages });
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.clubName || !formData.festivalType) {
      showToast('Please fill in club name and select festival type', 'error');
      return;
    }

    if (formData.images.length === 0 && previewImages.length === 0) {
      showToast('Please upload at least one image', 'error');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('clubName', formData.clubName);
      submitData.append('festivalType', formData.festivalType);
      submitData.append('description', formData.description);
      submitData.append('email', formData.email);
      
      formData.images.forEach(image => {
        submitData.append('images', image);
      });

      const endpoint = existingClub 
        ? `http://localhost:5000/api/clubs/${existingClub._id}` 
        : 'http://localhost:5000/api/clubs/add';
      
      const method = existingClub ? 'put' : 'post';

      await axios[method](endpoint, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setUploadSuccess(true);
      showToast(existingClub ? 'Club updated successfully!' : 'Club submitted for review!', 'success');
      
      setTimeout(() => {
        setUploadSuccess(false);
        if (!existingClub) {
          navigate('/');
        } else {
          setIsEditing(false);
          fetchExistingClub(formData.email);
        }
      }, 2000);

    } catch (error) {
      showToast(error.response?.data?.message || 'Upload failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your club? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/clubs/${existingClub._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      showToast('Club deleted successfully!', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      showToast('Failed to delete club', 'error');
    }
  };

  const handleBack = () => {
    if (existingClub && isEditing) {
      setIsEditing(false);
    } else {
      navigate('/');
    }
  };

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        {/* Back to Home Button - Fixed Position */}
        <button
          onClick={() => navigate('/')}
          className="fixed top-8 left-8 flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-50 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md animate-scaleIn">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {existingClub ? 'Updated Successfully!' : 'Uploaded Successfully!'}
          </h2>
          <p className="text-gray-600">
            {existingClub 
              ? 'Your club details have been updated.'
              : 'Your club has been submitted for review. You will be notified once approved.'}
          </p>
        </div>
      </div>
    );
  }

  // View mode when club exists and not editing
  if (existingClub && !isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Button - Enhanced */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{existingClub.clubName}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-white/90">
                    <span className="flex items-center space-x-2">
                      <Calendar size={18} />
                      <span>{festivalTypes.find(f => f.value === existingClub.festivalType)?.label}</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      existingClub.status === 'approved' ? 'bg-green-500/20' :
                      existingClub.status === 'rejected' ? 'bg-red-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      {existingClub.status?.charAt(0).toUpperCase() + existingClub.status?.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center space-x-2"
                  >
                    <Edit size={20} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-red-500/30 transition-all flex items-center space-x-2"
                  >
                    <Trash2 size={20} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {existingClub.description || 'No description provided'}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Club Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden">
                      <img 
                        src={img} 
                        alt={`Club ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  // Edit/Upload form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home Button - Enhanced */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>{existingClub ? 'Cancel & Go Home' : 'Back to Home'}</span>
        </button>

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

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
                  onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                  placeholder="Enter your club name"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Festival Type *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {festivalTypes.map((festival) => (
                  <button
                    key={festival.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, festivalType: festival.value })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      formData.festivalType === festival.value
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{festival.icon}</div>
                    <div className="text-sm font-medium text-gray-700">{festival.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about your club, its history, and activities..."
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
              />
            </div>

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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Club Images * (Max 10 images)
              </label>
              
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200">
                      <img 
                        src={img} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {previewImages.length < 10 && (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-300">
                    <ImagePlus size={48} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium mb-1">Click to upload images</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
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

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your club submission will be reviewed by our team. 
                You'll be notified once it's approved and visible on the website.
              </p>
            </div>
          </form>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}