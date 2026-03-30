import React, { useState, useRef } from 'react'; // Added useRef
import { useNavigate } from 'react-router-dom';
import { BothActivationController } from '../../controllers/ActivationController';
import Popup from '../../components/Popup';
import { Turnstile } from '@marsidev/react-turnstile';
import { formatProductKey } from './formatproductkey';
import { Loader2 } from 'lucide-react'; // For loading feedback
import StepProgress from '../../components/StepProgress';
function ActivateBoth() {
    const [productKeyMethods, setProductKeyMethods] = useState('');
    const [productKeySpecialist, setProductKeySpecialist] = useState('');
    const [popup, setPopup] = useState(null);
    const [turnstileToken, setTurnstileToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Track backend delay
    
    const turnstileRef = useRef(null); // Reference to reset the widget
    const navigate = useNavigate();

    const [showSlowMessage, setShowSlowMessage] = useState(false);
    const loadingTimerRef = useRef(null); // To store the timeout ID

    const handleActivate = async () => {
        const controller = new BothActivationController({
            setPopup,
            setIsLoading,
            setShowSlowMessage,
            setTurnstileToken,
            navigate,
            turnstileRef,
            loadingTimerRef,
            turnstileToken
        }, productKeyMethods, productKeySpecialist);
        await controller.handleActivate();
    };

    return (
        <div className="bg-[#202830] text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Maths Methods and Specialist Maths
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Activate your premium learning experience
                    </p>
                </div>
                <StepProgress currentStep={1} />
                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        Enter your Product Keys
                    </h2>

                    <div className="mb-6 space-y-8">
                        <div>
                            <label className="block text-white font-semibold mb-4">
                                Product Key for Maths Methods
                            </label>
                            <input
                                type="text"
                                value={productKeyMethods}
                                onChange={(e) => setProductKeyMethods(formatProductKey(e.target.value))}
                                onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
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
                                onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
                                placeholder="XXX-XXX-XXX"
                                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#74be9c]"
                            />
                        </div>

                        <div className="mb-0 mt-3 flex justify-center ">
                            <Turnstile 
                                ref={turnstileRef} // Attached Ref
                                siteKey="0x4AAAAAACfst3SwT11g1g2m" 
                                onSuccess={setTurnstileToken}
                                options={{ theme: 'auto' }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleActivate}
                        disabled={isLoading} // Prevent double-clicks during delay
                        className={`w-full font-bold py-4 rounded-lg transition-all text-lg mb-6 flex items-center justify-center gap-2 cursor-pointer
                            ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830]'}`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Activating...
                            </>
                        ) : (
                            'Activate'
                        )}
                    </button>


                    {showSlowMessage && (
                        <p className="text-center text-gray-300 text-sm mt-4 mb-6 animate-pulse">
                            This process can take up to 1 minute.
                            <p><b>Do <u>not</u> reload the page</b></p>
                        </p>
                    )}
                    


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

                    {/* Features Grid Omitted for Brevity */}
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

export default ActivateBoth;