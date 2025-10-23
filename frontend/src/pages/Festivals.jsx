// src/pages/Festivals.jsx

import { useState, useEffect } from 'react'
import FestivalCard from '../components/festivals/FestivalCard.jsx'
import FestivalDetailModal from '../components/festivals/FestivalDetailModal.jsx'
import { festivalsData } from '../data/festivalsData.js'

import ImageGallery from '../components/festivals/ImageGallery.jsx';
import FairInformation from '../components/festivals/FairInformation.jsx';
import ClubList from '../components/festivals/ClubsList.jsx';

import ClubCard from '../components/festivals/ClubCard.jsx';

export default function Festivals() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedFestival, setSelectedFestival] = useState(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [activeTab])

  const filteredFestivals = festivalsData.filter(festival => {
    return activeTab === 'all' || festival.category.toLowerCase() === activeTab.toLowerCase()
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Festivals & Events
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 max-w-4xl mx-auto leading-relaxed">
              Experience the vibrant celebrations that bring Santipur's spiritual heritage to life 
              through colorful festivals, devotional music, and community unity.
            </p>
          </div>
        </div>
      </div>

      {/* Festival Calendar Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
              Year-Round Celebrations
            </h2>
            <p className="text-xl text-gray-600">
              From grand chariot processions to colorful spring celebrations
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12 scroll-reveal">
            <div className="bg-gray-100 p-2 rounded-full">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'all' 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                All Festivals
              </button>
              <button
                onClick={() => setActiveTab('major')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ml-2 ${
                  activeTab === 'major' 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Major Festivals
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ml-2 ${
                  activeTab === 'other' 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Other Events
              </button>
            </div>
          </div>

          {/* Festival Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFestivals.map((festival) => (
              <FestivalCard
                key={festival.id}
                festival={festival}
                onClick={() => setSelectedFestival(festival)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Participation Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Join the Celebrations
            </h2>
            <p className="text-xl text-pink-200 max-w-3xl mx-auto">
              Be part of Santipur's vibrant festival traditions and experience the joy of community celebration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🎵
              </div>
              <h3 className="text-xl font-bold mb-4">Cultural Programs</h3>
              <p className="text-pink-200">
                Participate in traditional music, dance performances, and devotional singing that bring communities together.
              </p>
            </div>

            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🤝
              </div>
              <h3 className="text-xl font-bold mb-4">Volunteer Opportunities</h3>
              <p className="text-pink-200">
                Help organize events, assist in preparations, and contribute to the smooth running of festival celebrations.
              </p>
            </div>

            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                📅
              </div>
              <h3 className="text-xl font-bold mb-4">Event Calendar</h3>
              <p className="text-pink-200">
                Stay updated with upcoming festivals, special events, and community celebrations throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
            Experience Divine Celebrations
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Immerse yourself in the spiritual joy and cultural richness of Santipur's festivals. 
            Join thousands of devotees in celebrating devotion, tradition, and community spirit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              View Festival Calendar
            </button>
            <button className="px-8 py-4 border-2 border-red-600 text-red-600 rounded-full font-semibold hover:bg-red-50 transition-all duration-300">
              Get Involved
            </button>
          </div>
        </div>
      </section>

      {/* Festival Detail Modal */}
      <FestivalDetailModal 
        festival={selectedFestival} 
        onClose={() => setSelectedFestival(null)} 
      />

      <style jsx>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}