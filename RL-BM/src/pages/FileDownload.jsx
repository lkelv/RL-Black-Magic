/*
This is the page where the user downloads the file and gets instructions on how to transfer it to their calculator
*/
// src/pages/FileDownload.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const productConfig = {
    methods: {
        title: 'Methods',
        fileName: 'rlBM26.tns',
        filePath: '/BMmm34.tns'
    },
    specialist: {
        title: 'Specialist',
        fileName: 'rlBM26.tns',
        filePath: '/rlBMsm34.tns'
    },
    both: {
        title: 'Methods & Specialist',
        fileName: 'rlBM26.tns',
        filePath: '/rlBMmmsm34.tns'
    }
};

function FileDownload() {
    const navigate = useNavigate();
    const location = useLocation();
    const hasDownloaded = useRef(false);
    
    // REF TO PREVENT DOUBLE TRAP
    const trapRef = useRef(false);

    const { productType, productKey, productKeyMethods, productKeySpecialist } = location.state || {};
    const config = productConfig[productType];

    useEffect(() => {
        if (!productType || !productConfig[productType]) {
            navigate('/activate', { replace: true });
        }
    }, [productType, navigate]);

    // --- FIX: ROBUST BACK BUTTON TRAP ---
    useEffect(() => {
        // Only push state once
        if (!trapRef.current) {
            window.history.pushState({ trapped: true }, '', window.location.href);
            trapRef.current = true;
        }

        const handlePopState = (e) => {
            const userWantsToLeave = window.confirm(
                'Are you sure you want to go back? This will require you to re-enter your product key.'
            );

            if (userWantsToLeave) {
                // User clicked OK -> Leave
                window.removeEventListener('popstate', handlePopState);
                window.history.back();
            } else {
                // User clicked Cancel -> Stay -> Restore trap
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
    // -------------------------------------

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

        navigate('/cas-id', { state });
    };

    if (!config) return null;

    return (
        <div className="bg-[#202830] text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Download Black Magic - {config.title}
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
                        <p className="text-white mb-4">
                            If the download didn't start automatically:
                        </p>
                        <button
                            onClick={handleManualDownload}
                            className="text-[#74be9c] underline hover:text-[#62a888] transition-colors text-lg"
                        >
                            Click here to download
                        </button>
                    </div>

                    <div className="border-2 border-[#74be9c] rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-bold text-[#f4a52e] mb-4 text-center">
                            How to Transfer the File
                        </h3>
                        <ol className="text-gray-300 space-y-3 list-decimal list-inside">
                            <li>Connect your TI-Nspire CX II CAS calculator to your computer via USB</li>
                            <li>
                                Go to{' '}
                                <a
                                    href="https://nspireconnect.ti.com/nsc/file-transfer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#74be9c] underline hover:text-[#62a888]"
                                >
                                    nspireconnect.ti.com/nsc/file-transfer
                                </a>
                            </li>
                            <li>Click "Select Files" and choose the downloaded {config.fileName} file</li>
                            <li>Select your calculator from the device list</li>
                            <li>Click "Transfer" to send the file to your calculator</li>
                        </ol>
                    </div>

                    <button
                        onClick={handleContinue}
                        className="w-full bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-4 rounded-lg transition-all text-lg mb-6"
                    >
                        Continue to CAS ID Verification
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">1</span>
                            <span className="text-white">Download file</span>
                        </div>
                        <div className="flex items-center gap-3 md:ml-8">
                            <span className="text-[#74be9c] text-xl">2</span>
                            <span className="text-white">Transfer to calculator</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[#74be9c] text-xl">3</span>
                            <span className="text-white">Verify CAS ID</span>
                        </div>
                        <div className="flex items-center gap-3 md:ml-8">
                            <span className="text-[#74be9c] text-xl">4</span>
                            <span className="text-white">Get activation code</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileDownload;