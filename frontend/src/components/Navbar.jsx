import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-primary-600">
          Santipur
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-inter text-gray-700">
          <Link to="/" className="hover:text-primary-600">
            Home
          </Link>
          <Link to="/history" className="hover:text-primary-600">
            History
          </Link>
          <Link to="/culture" className="hover:text-primary-600">
            Culture
          </Link>
          <Link to="/devotion" className="hover:text-primary-600">
            Devotion
          </Link>
          <Link to="/contact" className="hover:text-primary-600">
            Contact
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          <Link
            to="/"
            className="block text-gray-700 hover:text-primary-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/history"
            className="block text-gray-700 hover:text-primary-600"
            onClick={() => setIsOpen(false)}
          >
            History
          </Link>
          <Link
            to="/culture"
            className="block text-gray-700 hover:text-primary-600"
            onClick={() => setIsOpen(false)}
          >
            Culture
          </Link>
          <Link
            to="/devotion"
            className="block text-gray-700 hover:text-primary-600"
            onClick={() => setIsOpen(false)}
          >
            Devotion
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-primary-600"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
