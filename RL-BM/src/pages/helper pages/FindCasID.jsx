// src/pages/FindCasID.jsx

import React from 'react';

function FindCasID() {
  return (
    <div className="bg-[#202830] min-h-screen text-white py-12 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            How to Find Your CAS ID
          </h1>
          <p className="text-lg text-gray-300">
            Follow these simple steps to locate your Calculator ID
          </p>
        </div>

        {/* Instructions Container */}
        <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-[#74be9c]">
            Step-by-Step Guide
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#74be9c] rounded-full flex items-center justify-center text-[#202830] font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Turn on your CAS Calculator</h3>
                <p className="text-gray-300">
                  Power on your TI-Nspire CX II CAS calculator and wait for it to fully load.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#74be9c] rounded-full flex items-center justify-center text-[#202830] font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Access Settings Menu</h3>
                <p className="text-gray-300">
                  Press the <span className="bg-[#202830] px-2 py-1 rounded font-mono">home</span> button,
                  then navigate to <span className="bg-[#202830] px-2 py-1 rounded font-mono">Settings</span>.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#74be9c] rounded-full flex items-center justify-center text-[#202830] font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Select Status</h3>
                <p className="text-gray-300">
                  In the Settings menu, select <span className="bg-[#202830] px-2 py-1 rounded font-mono">Status</span> and
                  then <span className="bg-[#202830] px-2 py-1 rounded font-mono">About</span>.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#74be9c] rounded-full flex items-center justify-center text-[#202830] font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Locate CAS ID</h3>
                <p className="text-gray-300">
                  Your CAS ID (also called "Device ID" or "Serial Number") will be displayed on the screen.
                  It's typically a combination of letters and numbers.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#74be9c] rounded-full flex items-center justify-center text-[#202830] font-bold text-lg">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Copy the ID</h3>
                <p className="text-gray-300">
                  Carefully write down or type the CAS ID exactly as shown. Make sure to include all letters and numbers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-[#2d3642] rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-[#f4a52e]">
            Important Tips
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-[#74be9c] text-xl mt-1">✓</span>
              <p className="text-gray-300">
                The CAS ID is unique to your calculator and cannot be changed.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-[#74be9c] text-xl mt-1">✓</span>
              <p className="text-gray-300">
                Double-check that you've entered the ID correctly - it's case-sensitive.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-[#74be9c] text-xl mt-1">✓</span>
              <p className="text-gray-300">
                If you're having trouble finding it, check your calculator's manual or contact support.
              </p>
            </div>
          </div>
        </div>

        {/* Video Tutorial Section */}
        <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#74be9c]">
            Video Tutorial
          </h2>
          <p className="text-gray-300 mb-6">
            Watch this video for a visual guide on finding your CAS ID
          </p>

          <div className="aspect-video bg-[#202830] rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Video tutorial coming soon</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a
            href="/activate"
            className="inline-block bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-3 px-8 rounded-lg transition-all"
          >
            Back to Activation
          </a>
        </div>
      </div>
    </div>
  );
}

export default FindCasID;
