import { useState } from 'react';

export const ImageCarousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative h-full w-full">
      <img 
        src={images[currentIndex]} 
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};