import { useState, useEffect } from 'react'
import { Menu, X } from "lucide-react";


const Navbar = ({ scrollToSection, sidebarOpen , toggleSidebar }) => {
  //const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  //navbar style
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: 'Home' },
    {href: '#slideshow', label: 'Slides'},
    { href: '#history', label: 'History' },
    { href: '#culture', label: 'Culture' },
    { href: '#sarees', label: 'Sarees' },
    { href: '#devotion', label: 'Devotion' }
  ]

  //handle click and smooth scroll
  const handleNavClick = (href) => {
    const sectionId = href.substring(1)
    scrollToSection(sectionId)
    if (sidebarOpen) toggleSidebar();
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-md shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
       
       {/* Sidebar toggle always visible */}
       <button 
         onClick={toggleSidebar} 
         className='absolute left-4 top-4 p-2 mr-4 rounded-lg hover:bg-gray-100 transition-colors'>
          {sidebarOpen ? <X Size={28} />: <Menu size={28} /> }
         </button>
       
       {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-gray-800">Santipur</h1>
        </div>
        
        {/* Desktop Menu*/}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Mobile menu Toggle */}
        <button
          onClick={() => setIsOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X size={28} />: <Menu size={28} />}
          {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>*/}
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {sidebarOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar