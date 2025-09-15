import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    type: "image",
    src: "/images/santipur-temple.jpg",
    title: "Santipur Temple",
    description: "A spiritual hub of devotion and faith.",
  },
  {
    type: "video",
    src: "/videos/santipur-festival.mp4",
    title: "Santipur Festival",
    description: "The vibrant Rash Utsav celebrated with devotion.",
  },
  {
    type: "image",
    src: "/images/santipur-saree.jpg",
    title: "Santipuri Saree",
    description: "World-famous handloom weaving tradition.",
  },
];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.type === "image" ? (
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={slide.src}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-playfair">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-inter">
              {slide.description}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;

