// COMPONENT 2: ImageGallery.jsx
// ============================================
function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Photo Gallery</h3>
      
      {/* Main Image */}
      <div className="mb-4 rounded-xl overflow-hidden">
        <img 
          src={images[selectedImage].url} 
          alt={images[selectedImage].caption}
          className="w-full h-96 object-cover"
        />
        <div className="bg-gray-100 p-3">
          <p className="text-gray-700 text-center">{images[selectedImage].caption}</p>
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index ? 'border-red-600 scale-105' : 'border-gray-200 hover:border-red-400'
            }`}
          >
            <img 
              src={image.url} 
              alt={image.caption}
              className="w-full h-20 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}