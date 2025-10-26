// ============================================
// FILE: components/club/ClubView.jsx
// ============================================
import { useState } from 'react';
import { Calendar, Edit, Trash2 } from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';
import BackButton from './BackButton';

const ClubView = ({ club, festivalTypes, previewImages, onEdit, onDelete, onBack }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={onBack} />

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{club.clubName}</h1>
                <div className="flex flex-wrap items-center gap-3 text-white/90">
                  <span className="flex items-center space-x-2">
                    <Calendar size={18} />
                    <span>{festivalTypes.find(f => f.value === club.festivalType)?.label}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    club.status === 'approved' ? 'bg-green-500/20' :
                    club.status === 'rejected' ? 'bg-red-500/20' :
                    'bg-yellow-500/20'
                  }`}>
                    {club.status?.charAt(0).toUpperCase() + club.status?.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onEdit}
                  className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center space-x-2"
                >
                  <Edit size={20} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDeleteClick}
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
                {club.description || 'No description provided'}
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

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        clubName={club.clubName}
      />
    </div>
  );
};

export default ClubView;
