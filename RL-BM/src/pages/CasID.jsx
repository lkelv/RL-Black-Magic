// src/pages/CasID.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateCasId, generatePassword } from '../utils/productKeys';
import Popup from '../components/Popup';

function CasID() {
    const [casId, setCasId] = useState('');
    const [confirmCasId, setConfirmCasId] = useState('');
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Get product info from navigation state
    const { productType, productKey, productKeyMethods, productKeySpecialist } = location.state || {};

    const handleVerify = () => {
        // Basic validation
        if (!casId.trim() || !confirmCasId.trim()) {
            setPopup({ type: 'error', message: 'Please enter valid CAS IDs.' });
            return;
        }

        if (casId !== confirmCasId) {
            setPopup({ type: 'error', message: 'CAS IDs do not match. Please re-enter.' });
            return;
        }

        // Validate CAS ID format
        const validation = validateCasId(casId);

        if (!validation.valid) {
            setPopup({ type: 'error', message: validation.message });
            return;
        }

        // Generate password for this CAS ID
        const password = generatePassword(casId);

        setPopup({
            type: 'success',
            message: 'CAS ID verified successfully! Generating your activation code...'
        });

        // Navigate to installation complete page with password
        setTimeout(() => {
            navigate('/installation-complete', {
                state: {
                    password,
                    casId,
                    productType,
                    productKey,
                    productKeyMethods,
                    productKeySpecialist
                }
            });
        }, 2000);
    };

    return (
        <div className="bg-[#202830] min-h-screen text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        CAS ID Verification
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Verify your CAS ID to get an activation code
                    </p>
                </div>

                {/* Main Input Container */}
                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        Enter your CAS ID
                    </h2>

                    {/* CAS ID Inputs */}
                    <div className="mb-6 space-y-8">
                        <div>
                            <label className="block text-white font-semibold mb-4">
                                CAS ID
                            </label>
                            <input
                                type="text"
                                value={casId}
                                onChange={(e) => setCasId(e.target.value)}
                                placeholder="Enter CAS ID"
                                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-4">
                                Confirm your CAS ID
                            </label>
                            <input
                                type="text"
                                value={confirmCasId}
                                onChange={(e) => setConfirmCasId(e.target.value)}
                                placeholder="Re-enter CAS ID"
                                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                            />
                        </div>

                        <p className="text-sm text-gray-300 text-center">
                            Enter the unique identifier found in your CAS calculator. Not sure how?{' '}
                            <a
                                href="/find-cas-id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-[#74be9c]"
                            >
                                Click here!
                            </a>
                        </p>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        className="w-full bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-4 rounded-lg transition-all text-lg mb-6"
                    >
                        Verify CAS ID
                    </button>

                    {/* Warning Box */}
                    <div className="border-2 border-[#74be9c] rounded-lg p-4 mb-8 text-center">
                        <p className="text-gray-300">
                            An activation code will be generated once the CAS ID is verified
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">🔎</span>
                            <span className="text-white">Instant verification</span>
                        </div>
                        <div className="flex items-center gap-3 md:ml-8">
                            <span className="text-[#74be9c] text-xl">✓</span>
                            <span className="text-white">Premium Content</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">💻</span>
                            <span className="text-white">Full Black Magic access</span>
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

export default CasID;