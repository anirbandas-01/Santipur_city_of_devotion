// frontend/src/components/festivals/FestivalDetailModal.jsx

import { useState, useEffect } from 'react'
import axios from 'axios'
import ImageGallery from './ImageGallery'
import FairInformation from './FairInformation'
import ClubsList from './ClubsList'

export default function FestivalDetailModal({ festival, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [clubs, setClubs] = useState([])
  const [loadingClubs, setLoadingClubs] = useState(false)
  const [error, setError] = useState(null)

  // Fetch clubs when festival changes and clubs tab might be visible
  useEffect(() => {
    if (festival && festival.festivalTypes && festival.festivalTypes.length > 0) {
      fetchClubsForFestival()
    } else {
      setClubs([])
    }
  }, [festival])

  const fetchClubsForFestival = async () => {
    if (!festival || !festival.festivalTypes || festival.festivalTypes.length === 0) {
      console.log('No festival types to fetch')
      setClubs([])
      return
    }

    console.log('Fetching clubs for festival types:', festival.festivalTypes)
    setLoadingClubs(true)
    setError(null)
    
    try {
      // Fetch clubs for each festival type
      const allClubs = []
      
      for (const festivalType of festival.festivalTypes) {
        const url = `${import.meta.env.VITE_API_URL}/clubs?festivalType=${festivalType}`
        console.log('Fetching from:', url)
        
        const response = await axios.get(url)
        console.log(`Clubs for ${festivalType}:`, response.data)
        
        if (response.data && Array.isArray(response.data)) {
          allClubs.push(...response.data)
        } else {
          console.warn(`Invalid response for ${festivalType}:`, response.data)
        }
      }

      console.log('All clubs fetched:', allClubs.length)

      // Remove duplicates based on _id
      const uniqueClubs = allClubs.filter(
        (club, index, self) => 
          club && club._id && index === self.findIndex(c => c && c._id === club._id)
      )

      console.log('Unique clubs:', uniqueClubs.length)

      // Only show approved clubs (if status field exists)
      const approvedClubs = uniqueClubs.filter(
        club => club && (!club.status || club.status === 'approved')
      )

      console.log('Approved clubs:', approvedClubs.length)
      console.log('Club data:', approvedClubs)

      setClubs(approvedClubs)
    } catch (error) {
      console.error('Error fetching clubs:', error)
      console.error('Error details:', error.response?.data || error.message)
      setError('Failed to load clubs. Please try again.')
      setClubs([])
    } finally {
      setLoadingClubs(false)
    }
  }

  if (!festival) return null

  const hasClubs = festival.festivalTypes && festival.festivalTypes.length > 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`bg-gradient-to-r ${festival.color} p-8 text-white relative flex-shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <span className="text-2xl">&times;</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
              {festival.icon}
            </div>
            <div>
              <h2 className="text-4xl font-bold font-serif">{festival.name}</h2>
              <p className="text-xl opacity-90 mt-1">{festival.date}</p>
              <p className="text-sm opacity-75 mt-1">{festival.duration} • {festival.season}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex space-x-1 px-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-b-2 border-red-600 text-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              Overview
            </button>
            {festival.images && (
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'gallery'
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Gallery
              </button>
            )}
            {festival.fairInfo && (
              <button
                onClick={() => setActiveTab('fair')}
                className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'fair'
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Fair Info
              </button>
            )}
            {hasClubs && (
              <button
                onClick={() => setActiveTab('clubs')}
                className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'clubs'
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Clubs {clubs.length > 0 && `(${clubs.length})`}
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">About the Festival</h3>
                <div className="prose max-w-none">
                  {festival.detailedDescription ? (
                    festival.detailedDescription.split('\n\n').map((para, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
                    ))
                  ) : (
                    <p className="text-gray-700 leading-relaxed mb-4">{festival.description}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Festival Highlights</h4>
                  <ul className="space-y-2">
                    {festival.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Traditional Practices</h4>
                  <ul className="space-y-2">
                    {festival.traditions.map((tradition, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{tradition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Significance</h4>
                <p className="text-gray-700">{festival.significance}</p>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && festival.images && (
            <ImageGallery images={festival.images} />
          )}

          {activeTab === 'fair' && festival.fairInfo && (
            <FairInformation fairInfo={festival.fairInfo} />
          )}

          {activeTab === 'clubs' && hasClubs && (
            <div>
              {loadingClubs ? (
                <div className="flex flex-col justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
                  <p className="text-gray-600">Loading clubs...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Clubs</h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={fetchClubsForFestival}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Try Again
                  </button>
                </div>
              ) : clubs.length > 0 ? (
                <ClubsList clubs={clubs} />
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🏛️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Clubs Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to register your club for this festival!
                  </p>
                  <button
                    onClick={() => window.location.href = '/club-management'}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Register Your Club
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}