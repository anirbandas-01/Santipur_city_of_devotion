import { useState } from 'react';
import { DevotionHero } from '../components/devotion/DevotionHero';
import { DevotionCard } from '../components/devotion/DevotionCard';
import { DevotionCTA } from '../components/devotion/DevotionCTA';
import { DetailedDevotionView } from '../components/devotion/DetailedDevotionView';
import { devotionData } from '../data/devotionData';

const DevotionPage = () => {
  const [selectedDevotion, setSelectedDevotion] = useState(null);

  if (selectedDevotion) {
    return <DetailedDevotionView devotion={selectedDevotion} onBack={() => setSelectedDevotion(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <DevotionHero />

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Three Pillars of <span className="text-orange-600">Spiritual Devotion</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Immerse yourself in the rich spiritual traditions that define Santipur's sacred essence
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {devotionData.map((topic) => (
            <DevotionCard
              key={topic.id}
              {...topic}
              onClick={() => setSelectedDevotion(topic)}
            />
          ))}
        </div>
      </div>

      <DevotionCTA />
    </div>
  );
};

export default DevotionPage;