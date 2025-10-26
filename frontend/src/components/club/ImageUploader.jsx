// ============================================
// FILE: components/club/ImageUploader.jsx
// ============================================
import { ImagePlus, X } from 'lucide-react';

const ImageUploader = ({ previewImages, onImageUpload, onRemoveImage, maxImages = 10 }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-3">
      Club Images * (Max {maxImages} images)
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
              onClick={() => onRemoveImage(index)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        ))}
      </div>
    )}

    {previewImages.length < maxImages && (
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
          onChange={onImageUpload}
          className="hidden"
        />
      </label>
    )}
  </div>
);

export default ImageUploader;