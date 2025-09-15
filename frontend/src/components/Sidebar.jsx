import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, BookOpen, Info, Phone } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-primary-600 text-white p-2 rounded-lg"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary-700">Santipur</h1>
          <p className="text-sm text-gray-500">City of Devotion</p>
        </div>

        <nav className="mt-6 space-y-4">
          <Link
            to="/"
            className="flex items-center px-6 py-2 text-gray-700 hover:bg-primary-600 hover:text-white transition"
          >
            <Home className="mr-3" size={20} /> Home
          </Link>
          <Link
            to="/history"
            className="flex items-center px-6 py-2 text-gray-700 hover:bg-primary-600 hover:text-white transition"
          >
            <BookOpen className="mr-3" size={20} /> History
          </Link>
          <Link
            to="/about"
            className="flex items-center px-6 py-2 text-gray-700 hover:bg-primary-600 hover:text-white transition"
          >
            <Info className="mr-3" size={20} /> About
          </Link>
          <Link
            to="/contact"
            className="flex items-center px-6 py-2 text-gray-700 hover:bg-primary-600 hover:text-white transition"
          >
            <Phone className="mr-3" size={20} /> Contact
          </Link>
        </nav>
      </div>

      {/* Overlay when sidebar is open (Mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
        ></div>
      )}
    </>
  );
};

export default Sidebar;

