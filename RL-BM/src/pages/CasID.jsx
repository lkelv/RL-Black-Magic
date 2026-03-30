// Updated CasID.jsx with scroll-to-image and loading functionality

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from '../components/Popup';
import { CasIDController } from '../controllers/CasIDController';
import CASIDlocation from '../assets/CASIDlocation.png';
import { Loader2 } from 'lucide-react'; // Added import for the loading spinner
import StepProgress from '../components/StepProgress';
function CasID() {
    const [casId, setCasId] = useState('');
    const [confirmCasId, setConfirmCasId] = useState('');
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // NEW STATES FOR LOADING EFFECT
    const [isLoading, setIsLoading] = useState(false);
    const [showSlowMessage, setShowSlowMessage] = useState(false);
    const loadingTimerRef = useRef(null);

    const trapRef = useRef(false);
    const imageSectionRef = useRef(null); 

    const { productType, productKey, productKeyMethods, productKeySpecialist } = location.state || {};

    useEffect(() => {
        if (!productType) navigate('/activate', { replace: true });
    }, [productType, navigate]);

    const controller = useMemo(() => new CasIDController({
        casId, confirmCasId, productType, productKey, productKeyMethods, productKeySpecialist,
        setPopup, navigate, setIsLoading, setShowSlowMessage,
        trapRef, imageSectionRef, loadingTimerRef, windowObj: window
    }), [casId, confirmCasId, productType, productKey, productKeyMethods, productKeySpecialist, navigate]);

    useEffect(() => {
        if (!productType) navigate('/activate', { replace: true });
    }, [productType, navigate]);

    useEffect(() => {
        return controller.initHistoryTrap();
    }, [controller]);

    const scrollToImage = () => controller.scrollToImage();

    const handleVerify = async () => controller.handleVerify();

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

                <StepProgress currentStep={3} />
                
                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        3. Enter the <u>last 6 characters</u> of the CAS ID
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
                                maxLength="6"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-semibold mb-2">
                                Confirm your CAS ID (<u>retype</u> the same 6 digits)
                            </label>
                            <input
                                type="text"
                                value={confirmCasId}
                                onChange={(e) => setConfirmCasId(e.target.value)}
                                onPaste={(e) => e.preventDefault()} 
                                placeholder="Re-enter CAS ID"
                                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                                maxLength="6"
                            />
                        </div>

                        <div className="text-sm text-gray-300 text-center">
                            <p className="mb-3 text-[#F04D4D]">WARNING: Inputs are case sensitive</p>

                            Enter the unique identifier found in your CAS calculator. Not sure how?{' '}
                            <button
                                onClick={scrollToImage}
                                className="underline text-[#74be9c] bg-transparent border-none cursor-pointer"
                            >
                                Click here!
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleVerify}
                        disabled={isLoading}
                        className={`w-full font-bold py-4 rounded-lg transition-all text-lg mb-6 flex items-center justify-center gap-2
                        ${isLoading
                            ? 'bg-gray-500 cursor-not-allowed opacity-70'
                            : 'bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] cursor-pointer'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Verifying...
                            </>
                        ) : (
                            'Verify CAS ID'
                        )}
                    </button>

                    {showSlowMessage && (
                        <div className="text-center text-gray-300 text-sm mt-4 mb-6 animate-pulse">
                            This process can take up to 1 minute.
                            <p className="mt-1"><b>Do <u>not</u> reload the page</b></p>
                        </div>
                    )}
                </div>

                {/* IMAGE SECTION */}
                <div
                    ref={imageSectionRef}
                    className="bg-[#2d3642] rounded-lg p-8 mb-[32px] mt-10"
                >
                    <h2 className="text-2xl font-semibold mb-4">Find your CAS ID</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Locate your CAS ID within the BlackMagic Program installed on your CAS calculator.
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