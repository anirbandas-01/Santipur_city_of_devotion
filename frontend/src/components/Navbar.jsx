// frontend/src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Menu, User, ChevronDown, LogOut, UserCircle, Settings, Upload, Users, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { getCurrentUser, logout as authLogout, isClubUser as checkIsClubUser } from "../utils/auth";

const Navbar = ({ scrollToSection, sidebarOpen, toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.profile-dropdown')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    authLogout();
  };

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#slideshow', label: 'Slides' },
    { href: '#history', label: 'History' },
    { href: '#culture', label: 'Culture' },
    { href: '#sarees', label: 'Sarees' },
    { href: '#devotion', label: 'Devotion' }
  ];

  const handleNavClick = (href) => {
    const sectionId = href.substring(1);
    scrollToSection(sectionId);
  };

  // Get user type badge
  const getUserBadge = () => {
    if (!user) return null;
    
    const isClub = user.userType === 'club';
    return (
      <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        isClub ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
      }`}>
        <span className={`w-1.5 h-1.5 ${isClub ? 'bg-purple-500' : 'bg-blue-500'} rounded-full mr-1.5`}></span>
        {isClub ? 'Club' : 'Member'}
      </span>
    );
  };

  return (
    <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' 
              : 'bg-white/90 backdrop-blur-md shadow-lg'
    }`}>
      <div className="w-full mx-auto px-8 py-4 flex items-center justify-between">
        
        <div className="flex items-center space-x-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSidebar();
            }}
            className="p-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
          >
            <Menu size={28} className="text-gray-700" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Santipur
              </h1>
              <p className="text-xs text-gray-500">City of Devotion</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-600 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          <div className="relative profile-dropdown">
            <button
              className="flex items-center space-x-2 focus:outline-none group"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
            >
              {user ? (
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[2px] group-hover:shadow-lg transition-all duration-300">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:shadow-md transition-all duration-300 border-2 border-gray-200">
                  <User size={24} className="text-gray-600" />
                </div>
              )}
              <ChevronDown 
                size={18} 
                className={`text-gray-500 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-4 w-72 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden animate-dropdown">
                {!user ? (
                  <>
                    <div className="p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Welcome!</p>
                          <p className="text-xs text-gray-500">Join the Santipur community</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <Link
                        to="/signup"
                        className="flex items-center space-x-3 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 group mb-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <UserCircle size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">Create Account</p>
                          <p className="text-xs text-gray-500">Join as club or member</p>
                        </div>
                      </Link>

                      <Link
                        to="/login"
                        className="flex items-center space-x-3 px-4 py-3.5 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300 group"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <User size={20} className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">Sign In</p>
                          <p className="text-xs text-gray-500">Access your account</p>
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-lg">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          {getUserBadge()}
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      {/* Club User Menu */}
                      {user.userType === 'club' && (
                        <>
                          <Link
                            to="/club-dashboard"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300 group mb-2"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <HomeIcon size={20} className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">Dashboard</p>
                              <p className="text-xs text-gray-500">Club overview</p>
                            </div>
                          </Link>

                          <Link
                            to="/club-management"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 group mb-2"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Upload size={20} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">Manage Club</p>
                              <p className="text-xs text-gray-500">Edit details & photos</p>
                            </div>
                          </Link>
                        </>
                      )}

                      {/* Personal User Menu (Phase 2) */}
                      {user.userType === 'personal' && (
                        <>
                          <Link
                            to="/personal-dashboard"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-xl transition-all duration-300 group mb-2"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <HomeIcon size={20} className="text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-800">Dashboard</span>
                          </Link>

                          <Link
                            to="/my-clubs"
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300 group mb-2"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Users size={20} className="text-purple-600" />
                            </div>
                            <span className="font-medium text-gray-800">My Clubs</span>
                          </Link>
                        </>
                      )}

                      {/* Common menu items */}
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 group mb-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <UserCircle size={20} className="text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800">My Profile</span>
                      </Link>

                      <button
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-xl transition-all duration-300 group mb-2 w-full text-left"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Settings size={20} className="text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-800">Settings</span>
                      </button>

                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group w-full text-left"
                      >
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <LogOut size={20} className="text-red-600" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-dropdown {
          animation: dropdown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
                      