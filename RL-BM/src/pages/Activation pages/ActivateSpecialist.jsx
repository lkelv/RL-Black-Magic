// src/pages/ActivateSpecialist.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateProductKey, markProductKeyAsUsed } from '../../utils/productKeys';
import Popup from '../../components/Popup';
import { Turnstile } from '@marsidev/react-turnstile';
import { formatProductKey } from './formatproductkey';
import { Loader2 } from 'lucide-react'; 

function ActivateSpecialist() {
    const [productKey, setProductKey] = useState('');
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();
    const [turnstileToken, setTurnstileToken] = useState(null);


    const [isLoading, setIsLoading] = useState(false);

    const turnstileRef = useRef(null);


    const handleActivate = async () => {
        if (!productKey.trim()) {
            setPopup({ type: 'error', message: 'Please enter a valid product key' });
            return;
        }

        if (!turnstileToken) {
            setPopup({ type: 'error', message: 'Please complete the security check.' });
            return;
        }


        setIsLoading(true); 

        try {
            const validation = await validateProductKey(
                { key: productKey, type: 'specialist' }, 
                turnstileToken
            );
    
            if (validation.valid) {
                await markProductKeyAsUsed(productKey, null);
                setPopup({
                    type: 'success',
                    message: 'Product key validated! Redirecting to download...'
                });
    
                setTimeout(() => {
                    navigate('/file-download', { state: { productType: 'specialist', productKey } });
                }, 2000);

            } else {
                setPopup({ type: 'error', message: validation.message });
                setTurnstileToken(null);
                turnstileRef.current?.reset();
            }

        } catch (error) {
            setPopup({ type: 'error', message: 'Something went wrong. Please try again.' });
            turnstileRef.current?.reset();

        } finally {
            // 4. Stop loading regardless of success or failure
            setIsLoading(false); 
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
                            // ADD THIS SECTION:
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleActivate();
                                }
                            }}
                            // -----------------
                            placeholder="XXX-XXX-XXX"
                            className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                        />
                        
                        {/* Cloudflare verification */}
                        <div className="mb-0 mt-3 flex justify-center ">
                            <Turnstile 
                                siteKey="0x4AAAAAACfst3SwT11g1g2m" 
                                onSuccess={setTurnstileToken}
                                ref={turnstileRef}
                                options={{ theme: 'auto' }}
                            />
                        </div>




                    </div>

                    {/* Activate Button */}
                    <button
                        onClick={handleActivate}
                        // 5. Disable the button while loading
                        disabled={isLoading} 
                        className={`w-full font-bold py-4 rounded-lg transition-all text-lg mb-6 flex items-center justify-center gap-2
                            ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830]'}`}
                    >
                        {/* 6. Show spinner and change text conditionally */}
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Activating...
                            </>
                        ) : (
                            'Activate'
                        )}
                    </button>
                    
                    {/* Warning Box */}
                    <div className="border-2 border-[#74be9c] rounded-lg p-4 mb-8 text-center">
                        <p className="text-gray-300">
                            Your product key will be used once activated
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