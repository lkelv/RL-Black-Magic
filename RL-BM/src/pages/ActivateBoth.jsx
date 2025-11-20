import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateProductKey, markProductKeyAsUsed } from '../utils/productKeys';
import Popup from '../components/Popup';

function ActivateBoth() {
    const [productKeyMethods, setProductKeyMethods] = useState('');
    const [productKeySpecialist, setProductKeySpecialist] = useState('');
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();


    const formatProductKey = (value) => {
        const uppercased = value.toUpperCase();
        // Clean everything except alphanumeric and dashes
        const cleanedWithDashes = uppercased.replace(/[^A-Z0-9-]/g, '');
        // Clean to just alphanumeric
        const cleanedNoDashes = uppercased.replace(/[^A-Z0-9]/g, '');

        // Check if dashes are in correct positions (index 3 and 7)
        const firstDashCorrect = cleanedWithDashes.length <= 3 || cleanedWithDashes[3] === '-';
        const secondDashCorrect = cleanedNoDashes.length <= 6 || cleanedWithDashes[7] === '-';
        const dashesCorrect = firstDashCorrect && secondDashCorrect;

        if (cleanedWithDashes.includes('-') && dashesCorrect) {
            // Dashes in correct positions - preserve them
            return cleanedWithDashes.slice(0, 11);
        } else {
            // No dashes or wrong positions - add them automatically
            const formatted = cleanedNoDashes.match(/.{1,3}/g)?.join('-') || '';
            return formatted.slice(0, 11);
        }
    };


    const handleActivate = () => {
        if (!productKeyMethods.trim() || !productKeySpecialist.trim()) {
            setPopup({ type: 'error', message: 'Please enter valid product keys for both subjects' });
            return;
        }

        // Validate both keys
        const validationMethods = validateProductKey(productKeyMethods, 'methods');
        const validationSpecialist = validateProductKey(productKeySpecialist, 'specialist');

        if (!validationMethods.valid) {
            setPopup({ type: 'error', message: `Methods key: ${validationMethods.message}` });
            return;
        }

        if (!validationSpecialist.valid) {
            setPopup({ type: 'error', message: `Specialist key: ${validationSpecialist.message}` });
            return;
        }

        // Both keys valid
        markProductKeyAsUsed(productKeyMethods);
        markProductKeyAsUsed(productKeySpecialist);

        setPopup({
            type: 'success',
            message: 'Both product keys validated! Redirecting to download...'
        });

        // Navigate after showing popup briefly
        setTimeout(() => {
            navigate('/file-download/both', {
                state: {
                    productType: 'both',
                    productKeyMethods,
                    productKeySpecialist
                }
            });
        }, 2000);
    };

    return (
        <div className="bg-[#202830] text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Maths Methods and Specialist Maths
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Activate your premium learning experience
                    </p>
                </div>

                {/* Activation Container */}
                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        1. Enter your Product Keys
                    </h2>

                    {/* Product Key Input */}
                    <div className="mb-6 space-y-8">
                        <div>
                            <label className="block text-white font-semibold mb-4">
                                Product Key for Maths Methods
                            </label>
                            <input
                                type="text"
                                value={productKeyMethods}
                                onChange={(e) => setProductKeyMethods(formatProductKey(e.target.value))}
                                placeholder="XXX-XXX-XXX"
                                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-4">
                                Product Key for Specialist Maths
                            </label>
                            <input
                                type="text"
                                value={productKeySpecialist}
                                onChange={(e) => setProductKeySpecialist(formatProductKey(e.target.value))}
                                placeholder="XXX-XXX-XXX"
                                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                            />
                        </div>

                        <p className="text-sm text-gray-300 text-center">
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
                            Your product keys will be used once activated
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
                            <span className="text-white">Premium Content</span>
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

export default ActivateBoth;
