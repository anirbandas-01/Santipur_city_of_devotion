// src/components/common/Toast.jsx
import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={24} className="text-green-500" />,
    error: <XCircle size={24} className="text-red-500" />
  };

  const styles = {
    success: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200',
    error: 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200'
  };

  return (
    <div className="fixed top-24 right-8 z-[60] animate-slideInRight">
      <div className={`${styles[type]} border-2 rounded-2xl shadow-2xl p-4 pr-12 min-w-[320px] max-w-md backdrop-blur-sm`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {icons[type]}
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}