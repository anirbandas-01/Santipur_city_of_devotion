import { DevotionStats } from './DevotionStats';
import { statsData } from '../../data/devotionData';

export const DevotionHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white py-24">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-8 text-center">
        <div className="inline-block mb-6">
          <div className="flex items-center justify-center space-x-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full">
            <span className="text-2xl">🕉️</span>
            <span className="font-semibold">Sacred Heritage of Santipur</span>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold mb-6">
          Journey into <span className="text-yellow-300">Divine Devotion</span>
        </h1>
        <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
          Discover the profound spiritual traditions that have made Santipur a beacon of devotion for centuries. 
          Experience the divine presence through sacred rituals, festivals, and timeless teachings.
        </p>

        <DevotionStats stats={statsData} />
      </div>
    </div>
  );
};