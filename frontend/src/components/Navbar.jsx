import { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";


const Navbar = ({ scrollToSection, sidebarOpen , toggleSidebar }) => {
  //const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  //navbar style on scroll
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
    { href: '#slideshow', label: 'Slides' },
    { href: '#history', label: 'History' },
    { href: '#culture', label: 'Culture' },
    { href: '#sarees', label: 'Sarees' },
    { href: '#devotion', label: 'Devotion' }
  ]

    //handle click and smooth scroll
  const handleNavClick = (href) => {
    const sectionId = href.substring(1)
    scrollToSection(sectionId)
  };

  return (
    <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${
     scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' 
                : 'bg-white/90 backdrop-blur-md shadow-lg'
     }`}>

    <div className="w-full mx-auto px-10 py-4 flex items-center justify-between">
    
     {/* Left side: Menu Button + Logo together */}
      <div className="flex items-center space-x-6">
       <button
        onClick={(e) =>{
          e.preventDefault();
          console.log("navbar toggle clicked, current state:", sidebarOpen);
          toggleSidebar();
        }
      }
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
         <Menu size={28} />
      </button>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <h1 className="text-2xl font-bold font-serif text-gray-800">Santipur</h1>
      </div>
    </div>

    {/* Right side: Desktop Navigation Menu */}
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

    <div className="md:hidden"></div>
  </div>
</nav>
  )
}




export default Navbar

