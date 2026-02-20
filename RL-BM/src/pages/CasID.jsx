// Updated CasID.jsx with scroll-to-image functionality

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from '../components/Popup';
import { validateCasId, generatePassword, markProductKeyAsUsed } from '../utils/productKeys';
import CASIDlocation from '../assets/CASIDlocation.png'

function CasID() {
    const [casId, setCasId] = useState('');
    const [confirmCasId, setConfirmCasId] = useState('');
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const trapRef = useRef(false);
    const imageSectionRef = useRef(null); // NEW REF FOR SCROLL

    const { productType, productKey, productKeyMethods, productKeySpecialist } = location.state || {};

    useEffect(() => {
        if (!productType) navigate('/activate', { replace: true });
    }, [productType, navigate]);

    useEffect(() => {
        if (!trapRef.current) {
            window.history.pushState({ trapped: true }, '', window.location.href);
            trapRef.current = true;
        }

        const handlePopState = (e) => {
            const userWantsToLeave = window.confirm(
                'Are you sure you want to go back? This will require you to re-enter your product key.'
            );

            if (userWantsToLeave) {
                window.removeEventListener('popstate', handlePopState);
                window.history.back();
            } else {
                window.history.pushState({ trapped: true }, '', window.location.href);
            }
        };

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const scrollToImage = () => {
        imageSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleVerify = async () => {
        if (!casId.trim() || !confirmCasId.trim()) {
            setPopup({ type: 'error', message: 'Please enter valid CAS IDs.' });
            return;
        }

        if (casId !== confirmCasId) {
            setPopup({ type: 'error', message: 'CAS IDs do not match.' });
            return;
        }

        const val = validateCasId(casId);
        if (!val.valid) {
            setPopup({ type: 'error', message: val.message });
            return;
        }

        const last6 = casId.slice(-6);

        if (productType === 'both') {
            if (productKeyMethods) await markProductKeyAsUsed(productKeyMethods, last6);
            if (productKeySpecialist) await markProductKeyAsUsed(productKeySpecialist, last6);
        } else {
            if (productKey) await markProductKeyAsUsed(productKey, last6);
        }

        const productChar =
            productType === "methods" ? "M" :
                productType === "specialist" ? "S" :
                    productType === "both" ? "B" : "M";

        const password = generatePassword(last6, productChar);

        setTimeout(() => {
            navigate('/installation-complete', {
                state: {
                    password,
                    casId,
                    productType,
                }
            });
        }, 1000);
    };

    return (
        <div className="bg-[#202830] text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        CAS ID Verification
                    </h1>

                    <p className="text-lg text-gray-300 mb-6">
                        Verify your CAS ID to get an activation code
                    </p>
                </div>

                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        Enter the <u>last 6 digits</u> of the CAS ID
                    </h2>

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
                            <button
                                onClick={scrollToImage}
                                className="underline text-[#74be9c] bg-transparent border-none cursor-pointer"
                            >
                                Click here!
                            </button>
                        </p>
                    </div>

                    <button
                        onClick={handleVerify}
                        className="w-full bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-4 rounded-lg transition-all text-lg mb-6"
                    >
                        Verify CAS ID
                    </button>
                </div>

                {/* IMAGE SECTION */}
                <div
                    ref={imageSectionRef}
                    className="bg-[#2d3642] rounded-lg p-8 mb-[32px] mt-10"
                >
                    <h2 className="text-2xl font-semibold mb-4">Find your CAS ID</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Locate your CAS ID within the Black Magic Program installed on your CAS calculator.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        Need more help?
                        <a href="/installation-guide" target="_blank" rel="noopener noreferrer" className="underline text-[#74be9c]" > Click here! </a>
                    </p>
                    <div className="mt-4">
                        <img
                            src={CASIDlocation}
                            alt="CAS ID Location"
                            className="rounded-lg shadow-lg border border-[#3a4552]"
                        />
                    </div>
                </div>
            </div>

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