// src/components/Popup.jsx

import React, { useEffect, useMemo } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

/**
 * Controller class managing the Popup component's logic and side effects.
 * Encapsulates timeout for auto-closing and keyboard event listeners.
 */
class PopupController {
    /**
     * Constructs the PopupController.
     * @param {number} duration - Time before auto-close.
     * @param {Function} onClose - Callback to run on close.
     * @param {boolean} disableClose - Whether to disable closing the popup.
     */
    constructor(duration, onClose, disableClose) {
        this.duration = duration;
        this.onClose = onClose;
        this.disableClose = disableClose;
    }

    /**
     * Initializes the auto-close timer.
     * @returns {Function} Cleanup function to clear the timeout.
     */
    initTimer() {
        if (this.duration > 0 && !this.disableClose) {
            const timer = setTimeout(() => {
                this.onClose();
            }, this.duration);
            return () => clearTimeout(timer);
        }
        return () => {};
    }

    /**
     * Initializes the escape key listener.
     * @param {Document} doc - Document object to attach listener to.
     * @returns {Function} Cleanup function to remove event listener.
     */
    initKeyListener(doc) {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && !this.disableClose) {
                this.onClose();
            }
        };
        doc.addEventListener('keydown', handleKeyDown);
        return () => doc.removeEventListener('keydown', handleKeyDown);
    }
}

function Popup({ type = 'success', message, onClose, duration = 3000, disableClose = false }) {
  const controller = useMemo(() => new PopupController(duration, onClose, disableClose), [duration, onClose, disableClose]);

  useEffect(() => {
    return controller.initTimer();
  }, [controller]);

  // Handle ESC key press
  useEffect(() => {
    return controller.initKeyListener(document);
  }, [controller]);

  
  const bgColor = type === 'success' ? 'bg-[#2d5047]' : 'bg-[#3d2020]';
  const borderColor = type === 'success' ? 'border-[#74be9c]' : 'border-[#e85d5d]';
  const Icon = type === 'success' ? CheckCircle2 : XCircle;
  const iconColor = type === 'success' ? 'text-[#74be9c]' : 'text-[#e85d5d]';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Backdrop - no blur, no black background */}
      <div className="absolute inset-0 backdrop-blur-sm"  onClick={disableClose ? undefined : onClose} />

      {/* Popup Content */}
      <div className={`relative ${bgColor} border-2 ${borderColor} rounded-2xl p-8 w-96 max-w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-fade-in`}>
        {/* Close Button */}
        {!disableClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

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
