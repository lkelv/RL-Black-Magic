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
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div className={`relative ${bgColor} border-2 ${borderColor} rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Icon className={`${iconColor} w-16 h-16`} />
        </div>

        {/* Message */}
        <p className="text-white text-center text-lg">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Popup;
