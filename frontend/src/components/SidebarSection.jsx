import { useState } from 'react'
import { Link } from 'react-router-dom'

const SidebarSection = ({ isOpen, toggleSidebar}) => {
  const [hoveredItem, setHoveredItem] = useState(null)

  const menuItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: '🏠',
      description: 'Return to homepage'
    },
        { 
      path: '/about', 
      label: 'About', 
      icon: 'ℹ️',
      description: 'Know our History'
    },
    { 
      path: '/temples', 
      label: 'Temples', 
      icon: '🏛️',
      description: 'Sacred places of worship'
    },
    { 
      path: '/festivals', 
      label: 'Festivals', 
      icon: '🎪',
      description: 'Cultural celebrations'
    },
    { 
      path: '/culture', 
      label: 'Culture', 
      icon: '🎭',
      description: 'Rich cultural heritage'
    },
    { 
      path: '/sareeMarket', 
      label: 'Sarees', 
      icon: '🧵',
      description: 'Traditional handloom art'
    },
    { 
      path: '/devotion', 
      label: 'Devotion', 
      icon: '🙏',
      description: 'Spiritual journey'
    },
     { 
      path: '/gallery', 
      label: 'Gallery', 
      icon: '🌅',
      description: 'Photos & videos of Santipur'
    },
    { 
      path: '/restaurants', 
      label: 'Restaurants', 
      icon: '🍽️',
      description: 'Restaurants & Dining'
    }
  ]

  return (
    <>
       {/* Overlay */}
      {/*{isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={toggleSidebar}
        />
      )} */}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 text-white">
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
          
          {/* Close Button */}
          <button 
            onClick={() => {
              console.log("sidebar close button clicked");
              toggleSidebar();
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200 z-50"
            type="button"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo/Brand */}
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-serif">Santipur</h2>
                <p className="text-blue-100 text-sm">City of Devotion</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  group relative block w-full p-4 rounded-xl transition-all duration-300
                  ${hoveredItem === index 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg transform -translate-y-1' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300
                    ${hoveredItem === index 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-110' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                    }
                  `}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1">
                    <h3 className={`
                      font-semibold text-lg transition-colors duration-300
                      ${hoveredItem === index ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-600'}
                    `}>
                      {item.label}
                    </h3>
                    <p className={`
                      text-sm transition-colors duration-300
                      ${hoveredItem === index ? 'text-blue-600' : 'text-gray-500'}
                    `}>
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                    <div className={`
                    transition-all duration-300
                    ${hoveredItem === index 
                      ? 'text-blue-600 transform translate-x-1' 
                      : 'text-gray-400 opacity-0 group-hover:opacity-100'
                    }
                  `}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover effect line */}
               <div className={`
                  absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full
                  transition-all duration-300 origin-top
                  ${hoveredItem === index ? 'scale-y-100' : 'scale-y-0'}
                `}></div>
              </Link>
            ))}
          </div>
        </nav>


        {/* Footer */}
          <div className="p-6 border-t border-gray-100">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✨</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Explore Heritage</p>
                <p className="text-xs text-gray-600">Discover spiritual traditions</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-4">
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
              <span className="text-sm">📱</span>
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
              <span className="text-sm">🐦</span>
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
              <span className="text-sm">📘</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarSection