import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
const productConfig = {
    methods: {
        title: 'Methods',
        fileName: 'rlBM26.4.tns',
        filePath: '/rlBM26.4.tns'
    },
    specialist: {
        title: 'Specialist',
        fileName: 'rlBM26.4.tns',
        filePath: '/rlBM26.4.tns'
    },
    both: {
        title: 'Methods & Specialist',
        fileName: 'rlBM26.4.tns',
        filePath: '/rlBM26.4.tns'
    }
};

/**
 * Controller class for the File Download page.
 * Encapsulates the auto-download mechanism, intersection observing, and navigation traps.
 */
class FileDownloadController {
    constructor(context) {
        this.navigate = context.navigate;
        this.productType = context.productType;
        this.config = context.config;
        this.hasDownloaded = context.hasDownloaded;
        this.trapRef = context.trapRef;
        this.continueRef = context.continueRef;
        this.setIsButtonVisible = context.setIsButtonVisible;
        this.productKey = context.productKey;
        this.productKeyMethods = context.productKeyMethods;
        this.productKeySpecialist = context.productKeySpecialist;
        this.windowObj = context.windowObj;
        this.documentObj = context.documentObj;
    }

    initObserver() {
        const observer = new IntersectionObserver(
            ([entry]) => {
                this.setIsButtonVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (this.continueRef.current) {
            observer.observe(this.continueRef.current);
        }

        return () => observer.disconnect();
    }

    enforceSecurity() {
        if (!this.productType || !this.config) {
            this.navigate('/activate', { replace: true });
        }
    }

    initHistoryTrap() {
        if (!this.trapRef.current) {
            this.windowObj.history.pushState({ trapped: true }, '', this.windowObj.location.href);
            this.trapRef.current = true;
        }

        const handlePopState = () => {
            const userWantsToLeave = this.windowObj.confirm(
                'Are you sure you want to go back? This will require you to re-enter your product key.'
            );

            if (userWantsToLeave) {
                this.windowObj.removeEventListener('popstate', handlePopState);
                this.navigate('/activate', { replace: true, state: null });
            } else {
                this.windowObj.history.pushState({ trapped: true }, '', this.windowObj.location.href);
            }
        };

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        this.windowObj.addEventListener('popstate', handlePopState);
        this.windowObj.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            this.windowObj.removeEventListener('popstate', handlePopState);
            this.windowObj.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }

    triggerAutoDownload() {
        if (this.config && !this.hasDownloaded.current) {
            this.hasDownloaded.current = true;
            this.executeDownload(this.config.filePath, this.config.fileName);
        }
    }

    handleManualDownload() {
        if (!this.config) return;
        this.executeDownload(this.config.filePath, this.config.fileName);
    }

    executeDownload(filePath, fileName) {
        const downloadLink = this.documentObj.createElement('a');
        downloadLink.href = filePath;
        downloadLink.download = fileName;
        this.documentObj.body.appendChild(downloadLink);
        downloadLink.click();
        this.documentObj.body.removeChild(downloadLink);
    }

    handleContinue() {
        const state = this.productType === 'both'
            ? { productType: this.productType, productKeyMethods: this.productKeyMethods, productKeySpecialist: this.productKeySpecialist }
            : { productType: this.productType, productKey: this.productKey };

        this.navigate('/cas-id', { replace: true, state });
    }

    scrollToContinue() {
        this.continueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

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

    const controller = useMemo(() => new FileDownloadController({
        navigate, productType, config, hasDownloaded, trapRef, continueRef,
        setIsButtonVisible, productKey, productKeyMethods, productKeySpecialist,
        windowObj: window, documentObj: document
    }), [navigate, productType, config, productKey, productKeyMethods, productKeySpecialist]);

    // Intersection Observer to detect when the Continue button is in view
    useEffect(() => {
        return controller.initObserver();
    }, [controller]);

    // Validation and Redirect
    useEffect(() => {
        controller.enforceSecurity();
    }, [productType, navigate, controller]);

    // Back-button Trap Logic
    useEffect(() => {
        return controller.initHistoryTrap();
    }, [controller]);

    // Auto-Download Logic
    useEffect(() => {
        controller.triggerAutoDownload();
    }, [config, controller]);

    const handleManualDownload = () => controller.handleManualDownload();
    const handleContinue = () => controller.handleContinue();
    const scrollToContinue = () => controller.scrollToContinue();

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

                <StepProgress currentStep={2} />

                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        Transfer to Calculator
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