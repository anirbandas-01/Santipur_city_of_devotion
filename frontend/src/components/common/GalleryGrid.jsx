export const GalleryGrid = ({ images, title }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {images.map((img, idx) => (
        <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-lg aspect-square">
          <img 
            src={img} 
            alt={`${title} ${idx + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-semibold">Image {idx + 1}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
