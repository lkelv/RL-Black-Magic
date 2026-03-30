import React from 'react';
import { AlertTriangle } from 'lucide-react';

function ConfirmNavigationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#2d3642] border border-gray-600 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-[#F04D4D]/20 p-3 rounded-full text-[#F04D4D]">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Leave Page?</h3>
        </div>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Are you sure you want to leave? You will not be able to access this page again/see your product key again.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg bg-[#F04D4D] hover:bg-[#d94444] text-white font-bold transition-colors shadow-lg cursor-pointer"
          >
            Yes, Leave
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmNavigationModal;
