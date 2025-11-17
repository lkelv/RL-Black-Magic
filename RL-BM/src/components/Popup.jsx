// src/components/Popup.jsx

import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

function Popup({ type = 'success', message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  
  const bgColor = type === 'success' ? 'bg-[#2d5047]' : 'bg-[#3d2020]';
  const borderColor = type === 'success' ? 'border-[#74be9c]' : 'border-[#e85d5d]';
  const Icon = type === 'success' ? CheckCircle2 : XCircle;
  const iconColor = type === 'success' ? 'text-[#74be9c]' : 'text-[#e85d5d]';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Backdrop - no blur, no black background */}
      <div className="absolute inset-0 backdrop-blur-sm"  onClick={onClose} />

      {/* Popup Content */}
      <div className={`relative ${bgColor} border-2 ${borderColor} rounded-2xl p-8 w-96 max-w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-fade-in`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Icon className={`${iconColor} w-16 h-16`} />
        </div>

        {/* Message */}
        <p className="text-white text-center text-base leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Popup;
