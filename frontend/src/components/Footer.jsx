const Footer = () => {
  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#history', label: 'History' },
    { href: '#culture', label: 'Culture' },
    { href: '#devotion', label: 'Devotion' }
  ]

  const connectLinks = [
    { href: '#', label: 'Contact Us' },
    { href: '#', label: 'Community' },
    { href: '#', label: 'Events' },
    { href: '#', label: 'Support' }
  ]

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1)
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h3 className="text-2xl font-bold font-serif">Santipur</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering spiritual growth through devotion, culture, and community. Join us in celebrating the rich heritage of Santipur.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-sm">📱</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-sm">🐦</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <span className="text-sm">📘</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Connect</h4>
            <ul className="space-y-3">
              {connectLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2024 Santipur. All rights reserved. Built with devotion for the community.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer