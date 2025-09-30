// src/pages/ActivateMethods.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ActivateMethods() {
    const [productKey, setProductKey] = useState('');
    const navigate = useNavigate();

    const handleActivate = () => {
        // Placeholder validation - you'll implement actual validation later
        if (productKey.trim()) {
            // Redirect to CAS ID page when valid
            navigate('/activate/methods/cas-id');
        } else {
            alert('Please enter a valid product key');
        }
    };

    return (
        <div className="bg-[#202830] min-h-screen text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Maths Methods Product Key
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Activate your premium learning experience
                    </p>
                    <a 
                        href="/installation-guide" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#74be9c] hover:bg-[#62a888] text-[#202830] font-semibold py-2 px-6 rounded-full transition-colors text-sm"
                    >
                        Can't find your product key?
                    </a>
                </div>

                {/* Activation Container */}
                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        Enter your Product Key
                    </h2>

                    {/* Product Key Input */}
                    <div className="mb-6">
                        <label className="block text-white font-semibold mb-3">
                            Product Key
                        </label>
                        <input 
                            type="text"
                            value={productKey}
                            onChange={(e) => setProductKey(e.target.value)}
                            placeholder="RL-XXX-XXX-XXX"
                            className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                        />
                        <p className="text-sm text-gray-300 mt-2 text-center">
                            Enter the 14-character key found in your RL CAS book
                        </p>
                    </div>

                    {/* Activate Button */}
                    <button 
                        onClick={handleActivate}
                        className="w-full bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-4 rounded-lg transition-all text-lg mb-6"
                    >
                        Download
                    </button>

                    {/* Warning Box */}
                    <div className="border-2 border-[#74be9c] rounded-lg p-4 mb-8 text-center">
                        <p className="text-gray-300">
                            Your product key will be used once activated
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">🔑</span>
                            <span className="text-white">Lifetime access</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">✓</span>
                            <span className="text-white">Premium Content</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">⚡</span>
                            <span className="text-white">Instant activation</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">👥</span>
                            <span className="text-white">Guaranteed support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivateMethods;