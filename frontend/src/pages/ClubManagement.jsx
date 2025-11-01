// frontend/src/pages/ClubManagement.jsx - UPDATED WITH isTemple
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/common/Toast.jsx';
import ClubView from '../components/club/ClubView.jsx';
import ClubForm from '../components/club/ClubForm.jsx';
import SuccessScreen from "../components/club/SuccessScreen.jsx";
import { getCurrentUser, getAuthHeader, isClubUser } from '../utils/auth';

export default function ClubManagement() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [existingClub, setExistingClub] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    clubName: '',
    festivalType: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    location: {
      latitude: '',
      longitude: ''
    },
    establishedYear: '',
    memberCount: '',
    otherEvents: '',
    isTemple: false, // NEW FIELD
    socialMedia: {
      facebook: '',
      instagram: '',
      youtube: '',
      website: ''
    },
    images: []
  });
  
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
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
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!isClubUser()) {
      showToast('Access denied. This page is for club users only.', 'error');
      setTimeout(() => navigate('/'), 2000);
      return;
    }

    setUser(currentUser);
    setFormData(prev => ({ ...prev, email: currentUser.email }));
    
    fetchExistingClub(currentUser.id);
  }, [navigate]);

  const fetchExistingClub = async (userId) => {
    try {
      setLoading(true);
      
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubs?userId=${userId}`,
        { headers: getAuthHeader() }
      );
      
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        const club = res.data[0];
        
        setExistingClub(club);
        setFormData({
          clubName: club.clubName,
          festivalType: club.festivalType,
          description: club.description || '',
          email: club.email,
          phone: club.phone || '',
          address: club.address || '',
          location: {
            latitude: club.location?.latitude || '',
            longitude: club.location?.longitude || ''
          },
          establishedYear: club.establishedYear || '',
          memberCount: club.memberCount || '',
          otherEvents: club.otherEvents || '',
          isTemple: club.isTemple || false, // NEW FIELD
          socialMedia: {
            facebook: club.socialMedia?.facebook || '',
            instagram: club.socialMedia?.instagram || '',
            youtube: club.socialMedia?.youtube || '',
            website: club.socialMedia?.website || ''
          },
          images: []
        });
        setExistingImages(club.images || []);
        setPreviewImages(club.images || []);
        setNewImageFiles([]);
      } else {
        setExistingClub(null);
      }
    } catch (error) {
      console.error('Error fetching club:', error);
      if (error.response?.status !== 404) {
        showToast('Failed to load club data', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const totalImages = previewImages.length + files.length;
    if (totalImages > 10) {
      showToast(`You can upload maximum 10 images. You have ${previewImages.length} images already.`, 'error');
      return;
    }

    setNewImageFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const imageUrl = previewImages[index];
    
    if (existingImages.includes(imageUrl)) {
      setExistingImages(prev => prev.filter(img => img !== imageUrl));
    } else {
      const existingCount = existingImages.length;
      const newImageIndex = index - existingCount;
      setNewImageFiles(prev => prev.filter((_, i) => i !== newImageIndex));
    }
    
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Validation
    if (!formData.clubName || !formData.festivalType) {
      showToast('Please fill in club name and select festival type', 'error');
      return;
    }

    if (previewImages.length === 0) {
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
      submitData.append('isTemple', formData.isTemple); // NEW FIELD
      
      // Add other fields
      if (formData.phone) submitData.append('phone', formData.phone);
      if (formData.address) submitData.append('address', formData.address);
      
      // Add location if available
      if (formData.location?.latitude && formData.location?.longitude) {
        submitData.append('location', JSON.stringify(formData.location));
      }
      
      if (formData.establishedYear) submitData.append('establishedYear', formData.establishedYear);
      if (formData.memberCount) submitData.append('memberCount', formData.memberCount);
      if (formData.otherEvents) submitData.append('otherEvents', formData.otherEvents);
      
      // Add social media as JSON string
      submitData.append('socialMedia', JSON.stringify(formData.socialMedia));
      
      if (existingClub) {
        submitData.append('existingImages', JSON.stringify(existingImages));
      }
      
      newImageFiles.forEach(image => {
        submitData.append('images', image);
      });

      const endpoint = existingClub 
        ? `${import.meta.env.VITE_API_URL}/clubs/${existingClub._id}` 
        : `${import.meta.env.VITE_API_URL}/clubs/add`;
      
      const method = existingClub ? 'put' : 'post';

      await axios[method](endpoint, submitData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadSuccess(true);
      showToast(
        existingClub ? 'Club updated successfully!' : 'Club created successfully!', 
        'success'
      );

    } catch (error) {
      console.error('Submit error:', error);
      const message = error.response?.data?.message || 'Operation failed. Please try again.';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/clubs/${existingClub._id}`,
        { headers: getAuthHeader() }
      );
      
      showToast('Club deleted successfully!', 'success');
      setTimeout(() => navigate('/club-dashboard'), 1500);
    } catch (error) {
      showToast('Failed to delete club', 'error');
    }
  };

  const handleBack = () => {
    if (existingClub && isEditing) {
      setIsEditing(false);
      setPreviewImages(existingClub.images || []);
      setExistingImages(existingClub.images || []);
      setNewImageFiles([]);
    } else {
      navigate('/club-dashboard');
    }
  };

  const handleGoHome = () => {
    setUploadSuccess(false);
    if (!existingClub) {
      navigate('/club-dashboard');
    } else {
      setIsEditing(false);
      fetchExistingClub(user.id);
    }
  };

  const handleViewFestivals = () => {
    navigate('/festivals');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (uploadSuccess) {
    return (
      <SuccessScreen 
        isUpdate={!!existingClub}
        onGoHome={handleGoHome}
        onViewFestivals={handleViewFestivals}
      />
    );
  }

  if (existingClub && !isEditing) {
    return (
      <>
        <ClubView
          club={existingClub}
          festivalTypes={festivalTypes}
          previewImages={previewImages}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
          onBack={() => navigate('/club-dashboard')}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  return (
    <>
      <ClubForm
        formData={formData}
        previewImages={previewImages}
        loading={loading}
        existingClub={existingClub}
        festivalTypes={festivalTypes}
        existingImagesCount={existingImages.length}
        newImagesCount={newImageFiles.length}
        onFormChange={setFormData}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}