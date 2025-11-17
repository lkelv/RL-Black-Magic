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

  const bgColor = type === 'success' ? 'bg-[#2d5047]' : 'bg-[#3d2020]';
  const borderColor = type === 'success' ? 'border-[#74be9c]' : 'border-[#e85d5d]';
  const Icon = type === 'success' ? CheckCircle2 : XCircle;
  const iconColor = type === 'success' ? 'text-[#74be9c]' : 'text-[#e85d5d]';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
      {/* Popup Content */}
      <div className={`relative ${bgColor} border-2 ${borderColor} rounded-xl p-5 w-80 max-w-[90%] shadow-2xl animate-fade-in pointer-events-auto`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-2">
          <Icon className={`${iconColor} w-10 h-10`} />
        </div>

        {/* Message */}
        <p className="text-white text-center text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Popup;
