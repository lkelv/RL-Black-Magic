import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateProductKey, markProductKeyAsUsed } from '../../utils/productKeys';
import Popup from '../../components/Popup';
import { Turnstile } from '@marsidev/react-turnstile';
import { formatProductKey } from './formatproductkey';

function ActivateBoth() {
    const [productKeyMethods, setProductKeyMethods] = useState('');
    const [productKeySpecialist, setProductKeySpecialist] = useState('');
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();
    const [turnstileToken, setTurnstileToken] = useState(null);


    const handleActivate = async () => {
        if (!productKeyMethods.trim() || !productKeySpecialist.trim()) {
            setPopup({ type: 'error', message: 'Please enter valid product keys for both subjects' });
            return;
        }

        // 3. CHECK TOKEN
        if (!turnstileToken) {
            setPopup({ type: 'error', message: 'Please complete the security check.' });
            return;
        }

        // 4. BATCH VALIDATION
        // We pass an array of items to validate them in one request with one token
        const results = await validateProductKey(
            [
                { key: productKeyMethods, type: 'methods' },
                { key: productKeySpecialist, type: 'specialist' }
            ],
            turnstileToken
        );

        // Extract results in order
        const validationMethods = results[0];
        const validationSpecialist = results[1];

        if (!validationMethods.valid) {
            setPopup({ type: 'error', message: `Methods key: ${validationMethods.message}` });
            return;
        }

        if (!validationSpecialist.valid) {
            setPopup({ type: 'error', message: `Specialist key: ${validationSpecialist.message}` });
            return;
        }

        // Both keys valid
        await markProductKeyAsUsed(productKeyMethods, null);
        await markProductKeyAsUsed(productKeySpecialist, null);

        setPopup({
            type: 'success',
            message: 'Both product keys validated! Redirecting to download...'
        });

        setTimeout(() => {
            navigate('/file-download', {
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
                                // ADD THIS:
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleActivate();
                                    }
                                }}
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
                                // ADD THIS:
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleActivate();
                                    }
                                }}
                                placeholder="XXX-XXX-XXX"
                                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                            />
                        </div>


                        {/* Cloudflare verification */}
                        <div className="mb-0 mt-3 flex justify-center ">
                            <Turnstile 
                                siteKey="0x4AAAAAACdgJCV1SeB-JP9V" 
                                onSuccess={setTurnstileToken}
                                options={{ theme: 'auto' }}
                            />
                        </div>


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


                        <p className="text-sm text-gray-300 mt-2 text-center">
                            <a href="/installation-guide" target="_blank" rel="noopener noreferrer">
                                Can't find it? <u>Click here!</u>
                            </a>
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
