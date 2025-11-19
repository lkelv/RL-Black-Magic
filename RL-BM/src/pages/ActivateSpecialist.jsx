// src/pages/ActivateSpecialist.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateProductKey, markProductKeyAsUsed } from '../utils/productKeys';
import Popup from '../components/Popup';

function ActivateSpecialist() {
    const [productKey, setProductKey] = useState('');
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();

    const formatProductKey = (value) => {
        // Remove all non-alphanumeric characters
        const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        // Add dash every 3 characters
        const formatted = cleaned.match(/.{1,3}/g)?.join('-') || '';
        return formatted.slice(0, 11); // Max length: XXX-XXX-XXX (11 chars)
    };

    const handleActivate = () => {
        if (!productKey.trim()) {
            setPopup({ type: 'error', message: 'Please enter a valid product key' });
            return;
        }

        const validation = validateProductKey(productKey, 'specialist');

        if (validation.valid) {
            markProductKeyAsUsed(productKey);
            setPopup({
                type: 'success',
                message: 'Product key validated! Redirecting to CAS ID verification...'
            });

            // Navigate after showing popup briefly
            setTimeout(() => {
                navigate('/cas-id', { state: { productType: 'specialist', productKey } });
            }, 2000);
        } else {
            setPopup({ type: 'error', message: validation.message });
        }
    };

    return (
        <div className="bg-[#202830] text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Specialist Maths Product Key
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Activate your premium learning experience
                    </p>
                </div>

                {/* Activation Container */}
                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        1. Enter your Product Key
                    </h2>

                    {/* Product Key Input */}
                    <div className="mb-6">
                        <label className="block text-white font-semibold mb-3">
                            Product Key
                        </label>
                        <input
                            type="text"
                            value={productKey}
                            onChange={(e) => setProductKey(formatProductKey(e.target.value))}
                            placeholder="XXX-XXX-XXX"
                            className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                        />
                        <p className="text-sm text-gray-300 mt-2 text-center">


                            <a
                                href="/installation-guide"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                Can't find it? <u>Click here!</u>

                            </a>

                        </p>

                    </div>

                    {/* Activate Button */}
                    <button
                        onClick={handleActivate}
                        className="w-full bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-4 rounded-lg transition-all text-lg mb-6"
                    >
                        Activate
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
                        <div className="flex items-center gap-3 md:ml-8">
                            <span className="text-[#74be9c] text-xl">✓</span>
                            <span className="text-white"> Premium Content</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">⚡</span>
                            <span className="text-white">Instant activation</span>
                        </div>
                        <div className="flex items-center gap-3 md:ml-8">
                            <span className="text-[#74be9c] text-xl">👥</span>
                            <span className="text-white">Guaranteed support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup */}
            {popup && (
                <Popup
                    type={popup.type}
                    message={popup.message}
                    onClose={() => setPopup(null)}
                />
            )}
        </div>
    );
}

export default ActivateSpecialist;