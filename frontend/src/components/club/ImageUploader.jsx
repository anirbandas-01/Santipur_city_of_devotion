// frontend/src/components/club/ImageUploader.jsx
import { ImagePlus, X, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ 
  previewImages, 
  onImageUpload, 
  onRemoveImage, 
  maxImages = 10,
  existingImagesCount = 0,
  newImagesCount = 0 
}) => {
  
  // Determine if an image is existing or new based on index
  const isExistingImage = (index) => {
    return index < existingImagesCount;
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Club Images * (Max {maxImages} images)
      </label>
      
      {/* Image count summary */}
      {previewImages.length > 0 && (
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
            <ImageIcon size={16} />
            <span className="font-medium">Total: {previewImages.length}/10</span>
          </div>
          {existingImagesCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
              <span className="font-medium">Existing: {existingImagesCount}</span>
            </div>
          )}
          {newImagesCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg">
              <span className="font-medium">New: {newImagesCount}</span>
            </div>
          )}
        </div>
      )}
      
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {previewImages.map((img, index) => {
            const isExisting = isExistingImage(index);
            
            return (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200">
                  <img 
                    src={img} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Label badge */}
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-semibold ${
                    isExisting 
                      ? 'bg-green-500 text-white' 
                      : 'bg-purple-500 text-white'
                  }`}>
                    {isExisting ? 'Existing' : 'New'}
                  </div>
                  
                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                    title={isExisting ? 'Remove existing image' : 'Remove new image'}
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
                
                {/* Image info on hover */}
                <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <p className="text-white text-xs font-medium text-center px-2">
                    {isExisting ? 'Click X to remove' : 'New upload'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {previewImages.length < maxImages && (
        <label className="block cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-300">
            <ImagePlus size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium mb-1">Click to upload images</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
            <p className="text-xs text-gray-400 mt-2">
              {previewImages.length > 0 
                ? `${maxImages - previewImages.length} more image(s) allowed`
                : `Upload up to ${maxImages} images`}
            </p>
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
      
      {/* Helper text for editing */}
      {existingImagesCount > 0 && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
          <p className="text-sm text-yellow-800">
            <strong>💡 Tip:</strong> You can remove existing images and add new ones. 
            Only click "Update Club" when you're done with all changes.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;