import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1584697964403-62f364a7d2cb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1524492449090-1a065f3a0d11?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600788915843-3d8b67f52c16?auto=format&fit=crop&w=1600&q=80",
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
      <img
        src={images[index]}
        alt="Slideshow"
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Arrows */}
      <button
        onClick={() =>
          setIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === i ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
