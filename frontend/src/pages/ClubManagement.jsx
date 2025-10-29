/* // frontend/src/pages/ClubManagement.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/common/Toast.jsx';
import ClubView from '../components/club/ClubView.jsx';
import ClubForm from '../components/club/ClubForm.jsx';
import SuccessScreen from "../components/club/SuccessScreen.jsx"

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
  const [existingImages, setExistingImages] = useState([]); // Track existing images from server
  const [newImageFiles, setNewImageFiles] = useState([]); // Track new files to upload
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
    
    fetchExistingClub(userData.email);
  }, [navigate]);

  const fetchExistingClub = async (email) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs?email=${email}`);
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
        setExistingImages(club.images || []);
        setPreviewImages(club.images || []);
        setNewImageFiles([]);
      }
    } catch (error) {
      console.log('No existing club found');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Check total image count (existing + new)
    const totalImages = previewImages.length + files.length;
    if (totalImages > 10) {
      showToast(`You can upload maximum 10 images. You have ${previewImages.length} images already.`, 'error');
      return;
    }

    // Add new files to the array
    setNewImageFiles(prev => [...prev, ...files]);
    
    // Create preview for new files
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
    
    // Check if this is an existing image or a new one
    if (existingImages.includes(imageUrl)) {
      // Remove from existing images
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      // Find and remove from new image files
      const existingCount = existingImages.length;
      const newImageIndex = index - existingCount;
      setNewImageFiles(prev => prev.filter((_, i) => i !== newImageIndex));
    }
    
    // Remove from preview
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
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
      
      // Add existing images that weren't deleted
      if (existingClub) {
        submitData.append('existingImages', JSON.stringify(existingImages));
      }
      
      // Add new image files
      newImageFiles.forEach(image => {
        submitData.append('images', image);
      });

      const endpoint = existingClub 
        ? `${import.meta.env.VITE_API_URL}/clubs/${existingClub._id}` 
        : `${import.meta.env.VITE_API_URL}/clubs/add`;
      
      const method = existingClub ? 'put' : 'post';

      await axios[method](endpoint, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setUploadSuccess(true);
      showToast(existingClub ? 'Club updated successfully!' : 'Club submitted for review!', 'success');

    } catch (error) {
      showToast(error.response?.data?.message || 'Upload failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/clubs/${existingClub._id}`, {
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
      // Reset to original images
      setPreviewImages(existingClub.images || []);
      setExistingImages(existingClub.images || []);
      setNewImageFiles([]);
    } else {
      navigate('/');
    }
  };

  const handleGoHome = () => {
    setUploadSuccess(false);
    if (!existingClub) {
      navigate('/');
    } else {
      setIsEditing(false);
      fetchExistingClub(formData.email);
    }
  };

  const handleViewFestivals = () => {
    navigate('/festivals');
  };

  // Show success screen - user must click button to navigate
  if (uploadSuccess) {
    return (
      <SuccessScreen 
        isUpdate={!!existingClub}
        onGoHome={handleGoHome}
        onViewFestivals={handleViewFestivals}
      />
    );
  }

  // Show club view when club exists and not editing
  if (existingClub && !isEditing) {
    return (
      <>
        <ClubView
          club={existingClub}
          festivalTypes={festivalTypes}
          previewImages={previewImages}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
          onBack={() => navigate('/')}
        />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  // Show form (create or edit mode)
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
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
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
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
} */


  // frontend/src/pages/ClubManagement.jsx
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
    setFormData(prev => ({ ...prev, email: currentUser.email }));
    
    fetchExistingClub(currentUser.id);
  }, [navigate]);

  const fetchExistingClub = async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubs?userId=${userId}`,
        { headers: getAuthHeader() }
      );
      
      if (res.data.clubs && res.data.clubs.length > 0) {
        const club = res.data.clubs[0];
        setExistingClub(club);
        setFormData({
          clubName: club.clubName,
          festivalType: club.festivalType,
          description: club.description,
          email: club.email,
          images: []
        });
        setExistingImages(club.images || []);
        setPreviewImages(club.images || []);
        setNewImageFiles([]);
      }
    } catch (error) {
      console.log('No existing club found or error fetching:', error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Check total image count
    const totalImages = previewImages.length + files.length;
    if (totalImages > 10) {
      showToast(`You can upload maximum 10 images. You have ${previewImages.length} images already.`, 'error');
      return;
    }

    // Add new files
    setNewImageFiles(prev => [...prev, ...files]);
    
    // Create preview
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
    
    // Check if this is an existing image or new one
    if (existingImages.includes(imageUrl)) {
      setExistingImages(prev => prev.filter(img => img !== imageUrl));
    } else {
      // Find and remove from new image files
      const existingCount = existingImages.length;
      const newImageIndex = index - existingCount;
      setNewImageFiles(prev => prev.filter((_, i) => i !== newImageIndex));
    }
    
    // Remove from preview
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
      
      // Add existing images that weren't deleted
      if (existingClub) {
        submitData.append('existingImages', JSON.stringify(existingImages));
      }
      
      // Add new image files
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
      // Reset to original images
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

  // Show success screen
  if (uploadSuccess) {
    return (
      <SuccessScreen 
        isUpdate={!!existingClub}
        onGoHome={handleGoHome}
        onViewFestivals={handleViewFestivals}
      />
    );
  }

  // Show club view when club exists and not editing
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

  // Show form (create or edit mode)
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
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
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
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}