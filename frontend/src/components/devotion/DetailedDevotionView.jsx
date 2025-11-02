import { useState } from 'react';
import { TabNavigation } from '../common/TabNavigation';
import { InfoCards } from '../common/InfoCards';
import { GalleryGrid } from '../common/GalleryGrid';
import { VideoCard } from '../common/VideoCard';

export const DetailedDevotionView = ({ devotion, onBack }) => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10"></div>
        <img 
          src={devotion.images[0]} 
          alt={devotion.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12">
          <button 
            onClick={onBack}
            className="absolute top-8 left-8 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Devotion</span>
          </button>
          
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-5xl">{devotion.icon}</span>
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">{devotion.title}</h1>
                <p className="text-orange-200 text-xl">{devotion.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-6xl mx-auto px-8 py-12">
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">{devotion.fullDescription}</p>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Spiritual Significance</h3>
                <ul className="space-y-3">
                  {devotion.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-orange-600 text-xl">🕉️</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <InfoCards bestTime={devotion.bestTime} />
          </div>
        )}

        {activeTab === 'gallery' && (
          <GalleryGrid images={devotion.images} title={devotion.title} />
        )}

        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devotion.videos.map((video, idx) => (
              <VideoCard key={idx} video={video} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};