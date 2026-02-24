import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const productConfig = {
    methods: {
        title: 'Methods',
        fileName: 'rlBM26.tns',
        filePath: '/rlBM26.tns'
    },
    specialist: {
        title: 'Specialist',
        fileName: 'rlBM26.tns',
        filePath: '/rlBM26.tns'
    },
    both: {
        title: 'Methods & Specialist',
        fileName: 'rlBM26.tns',
        filePath: '/rlBM26.tns'
    }
};

function FileDownload() {
    const navigate = useNavigate();
    const location = {
        state: {
            productType: 'methods', // Fallback for testing; normally comes from location.state
            ...useLocation().state
        }
    };

    const hasDownloaded = useRef(false);
    const trapRef = useRef(false);
    const continueRef = useRef(null);

    const { productType, productKey, productKeyMethods, productKeySpecialist } = location.state || {};
    const config = productConfig[productType];

    const [activeGuide, setActiveGuide] = useState('blue');
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    // Intersection Observer to detect when the Continue button is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsButtonVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (continueRef.current) {
            observer.observe(continueRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Validation and Redirect
    useEffect(() => {
        if (!productType || !productConfig[productType]) {
            navigate('/activate', { replace: true });
        }
    }, [productType, navigate]);

    // Back-button Trap Logic
    useEffect(() => {
        if (!trapRef.current) {
            window.history.pushState({ trapped: true }, '', window.location.href);
            trapRef.current = true;
        }

        const handlePopState = () => {
            const userWantsToLeave = window.confirm(
                'Are you sure you want to go back? This will require you to re-enter your product key.'
            );

            if (userWantsToLeave) {
                window.removeEventListener('popstate', handlePopState);
                //window.history.back();
                navigate('/activate', { replace: true, state: null });
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

    // Auto-Download Logic
    useEffect(() => {
        if (config && !hasDownloaded.current) {
            hasDownloaded.current = true;
            const downloadLink = document.createElement('a');
            downloadLink.href = config.filePath;
            downloadLink.download = config.fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }, [config]);

    const handleManualDownload = () => {
        if (!config) return;
        const downloadLink = document.createElement('a');
        downloadLink.href = config.filePath;
        downloadLink.download = config.fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleContinue = () => {
        const state = productType === 'both'
            ? { productType, productKeyMethods, productKeySpecialist }
            : { productType, productKey };

        navigate('/cas-id', { replace: true, state });
    };

    const scrollToContinue = () => {
        continueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    if (!config) return null;

    const GuideTabs = () => (
        <div className="mb-6 max-w-sm mx-auto">
            <div className="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => setActiveGuide('blue')}
                    className={
                        "rounded-md py-2 px-4 text-sm font-semibold transition-all border cursor-pointer " +
                        (activeGuide === 'blue'
                            ? "bg-[#3a4552] text-[#74be9c] border-[#74be9c]"
                            : "bg-transparent text-gray-400 border-[#3a4552] hover:text-white hover:border-gray-500")
                    }
                >
                    Blue CAS
                </button>
                <button
                    type="button"
                    onClick={() => setActiveGuide('black')}
                    className={
                        "rounded-md py-2 px-4 text-sm font-semibold transition-all border cursor-pointer " +
                        (activeGuide === 'black'
                            ? "bg-[#3a4552] text-[#74be9c] border-[#74be9c]"
                            : "bg-transparent text-gray-400 border-[#3a4552] hover:text-white hover:border-gray-500")
                    }
                >
                    Black CAS
                </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3 italic">
                Select your calculator type to view transfer steps.
            </p>
        </div>
    );

    const BlueGuide = () => (
        <div className="border-2 border-[#74be9c] rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-[#f4a52e] mb-4 text-center">Blue CAS Guide</h3>
            <ol className="text-gray-300 space-y-3 list-decimal list-inside">
                <li>Connect your TI-Nspire CX II CAS calculator to your computer via USB</li>
                <li>Go to <a href="https://nspireconnect.ti.com/nsc/file-transfer" target="_blank" rel="noopener noreferrer" className="text-[#74be9c] underline hover:text-[#62a888] cursor-pointer">nspireconnect.ti.com</a> on Chrome</li>
                <li>Click "Select Files" and choose {config.fileName}</li>
                <li>Select your calculator and click "Transfer"</li>
            </ol>
        </div>
    );

    const BlackGuide = () => (
        <div className="border-2 border-[#74be9c] rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-[#f4a52e] mb-4 text-center">Black CAS Guide</h3>
            <ol className="text-gray-300 space-y-3 list-decimal list-inside">
                <li>Connect your TI-Nspire CX II CAS calculator to your computer via USB</li>
                <li>Go to <a href="https://education.ti.com/en/products/computer-software/ti-nspire-computer-link" target="_blank" rel="noopener noreferrer" className="text-[#74be9c] underline hover:text-[#62a888] cursor-pointer">TI Computer Link</a></li>
                <li>Request a free trial to gain access to the CAS software</li>
                <li>Open the software and import {config.fileName}</li>
                <li>Transfer the file from software to your calculator</li>
            </ol>
        </div>
    );

    return (
        <div className="bg-[#202830] text-white py-12 px-8 relative min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Download BlackMagic - {config.title}
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Your download should start automatically
                    </p>
                </div>

                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        2. Transfer to Calculator
                    </h2>

                    <div className="mb-8 text-center">
                        <p className="text-white mb-4">If the download didn't start automatically:</p>
                        <button
                            onClick={handleManualDownload}
                            className="text-[#74be9c] underline hover:text-[#62a888] transition-colors text-lg cursor-pointer"
                        >
                            Click here to download
                        </button>
                    </div>

                    <GuideTabs />

                    {activeGuide === 'blue' ? <BlueGuide /> : <BlackGuide />}

                    <button
                        ref={continueRef}
                        onClick={handleContinue}
                        className="w-full bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-4 rounded-lg transition-all text-lg mb-12 cursor-pointer active:scale-[0.98]"
                    >
                        Continue to CAS ID Verification
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl font-black">1</span>
                            <span className="text-white">Download file</span>
                        </div>
                        <div className="flex items-center gap-3 md:ml-8">
                            <span className="text-[#74be9c] text-xl font-black">2</span>
                            <span className="text-white">Transfer to calculator</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl font-black">3</span>
                            <span className="text-white">Verify CAS ID</span>
                        </div>
                        <div className="flex items-center gap-3 md:ml-8">
                            <span className="text-[#74be9c] text-xl font-black">4</span>
                            <span className="text-white">Get activation code</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll-Down Arrow */}
            <div
                className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
                    isButtonVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
                <button
                    onClick={scrollToContinue}
                    className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-125"
                >
                    <svg
                        className="w-12 h-12 text-[#f4a52e] animate-bounce drop-shadow-xl"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="3.5"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default FileDownload;