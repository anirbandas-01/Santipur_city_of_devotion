
// ============================================
// FILE: components/club/BackButton.jsx
// ============================================
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ onClick, text = "Back to Home" }) => (
  <button
    onClick={onClick}
    className="mb-6 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group mt-20"
  >
    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
    <span>{text}</span>
  </button>
);

export default BackButton;
