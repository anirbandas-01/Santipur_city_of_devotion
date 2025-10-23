// src/components/festivals/FestivalDetailModal.jsx

import { useState } from 'react'
import ImageGallery from './ImageGallery'
import FairInformation from './FairInformation'
import ClubsList from './ClubsList'

export default function FestivalDetailModal({ festival, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!festival) return null

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
          <div className="flex space-x-1 px-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold transition-all ${
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
                className={`px-6 py-3 font-semibold transition-all ${
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
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'fair'
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Fair Info
              </button>
            )}
            {festival.clubs && (
              <button
                onClick={() => setActiveTab('clubs')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'clubs'
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                Clubs ({festival.clubs?.length || 0})
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
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
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
                        <span className="w-2 h-2 bg-orange-600 rounded-full mt-2"></span>
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

          {activeTab === 'clubs' && festival.clubs && (
            <ClubsList clubs={festival.clubs} />
          )}
        </div>
      </div>
    </div>
  )
}