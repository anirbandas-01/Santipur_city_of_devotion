import { useState, useEffect } from 'react';
import axios from 'axios';
import TempleCard from '../components/temple/TempleCard';
import TempleModal from '../components/temple/TempleModal';
import { staticTemples, templeCategories, convertClubToTemple } from '../config/templeConfig';

export default function Temples() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [visibleTemples, setVisibleTemples] = useState(10);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [clubTemples, setClubTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch club temples from backend
  useEffect(() => {
    fetchClubTemples();
  }, []);

  const fetchClubTemples = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/clubs?isTemple=true`);
      
      // Convert club data to temple format
      const convertedTemples = response.data.map(club => convertClubToTemple(club));
      setClubTemples(convertedTemples);
    } catch (error) {
      console.error('Error fetching club temples:', error);
      setClubTemples([]);
    } finally {
      setLoading(false);
    }
  };

  // Combine static temples and club temples
  const allTemples = [...staticTemples, ...clubTemples];

  // Filter temples
  const filteredTemples = selectedFilter === 'all' 
    ? allTemples 
    : allTemples.filter(temple => temple.category === selectedFilter);

  const displayedTemples = filteredTemples.slice(0, visibleTemples);
  const hasMore = visibleTemples < filteredTemples.length;

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
      });
    }, 100);
    
    return () => observer.disconnect();
  }, [displayedTemples.length]);

  // Reset visible temples when filter changes
  useEffect(() => {
    setVisibleTemples(selectedFilter === 'all' ? 10 : 6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedFilter]);

  const handleLoadMore = () => {
    setVisibleTemples(prev => prev + (selectedFilter === 'all' ? 10 : 6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Sacred Temples of Santipur
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
              Journey through centuries of devotion and discover the spiritual heart of Bengal, 
              where ancient temples stand as eternal witnesses to divine love and devotion.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🏛️</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{allTemples.length}+</h3>
              <p className="text-gray-600">Sacred Temples</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">📅</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Years of Heritage</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎭</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{clubTemples.length}</h3>
              <p className="text-gray-600">Club Temples</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">👥</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">1000+</h3>
              <p className="text-gray-600">Daily Visitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <span className="text-gray-700 font-semibold text-lg mr-2">Filter by:</span>
            {templeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                  selectedFilter === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-amber-700">{displayedTemples.length}</span> of <span className="font-semibold text-amber-700">{filteredTemples.length}</span> temples
            </p>
          </div>
        </div>
      </section>

      {/* Temples Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-6">
              {selectedFilter === 'all' ? 'All Sacred Temples' : `${templeCategories.find(c => c.id === selectedFilter)?.name} Temples`}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each temple tells a unique story of devotion, architecture, and spiritual heritage
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading temples...</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTemples.map((temple) => (
                  <TempleCard
                    key={temple.id}
                    temple={temple}
                    onLearnMore={setSelectedTemple}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Load More Temples
                  </button>
                </div>
              )}

              {/* All Loaded Message */}
              {!hasMore && filteredTemples.length > (selectedFilter === 'all' ? 10 : 6) && (
                <div className="text-center mt-12">
                  <div className="inline-block bg-white rounded-full px-6 py-3 shadow-lg border-2 border-amber-200">
                    <p className="text-gray-700 font-semibold flex items-center space-x-2">
                      <span className="text-2xl">✨</span>
                      <span>You have seen all {filteredTemples.length} temples</span>
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Temple Modal */}
      <TempleModal temple={selectedTemple} onClose={() => setSelectedTemple(null)} />

      {/* Scroll Reveal Styles */}
      <style jsx>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}