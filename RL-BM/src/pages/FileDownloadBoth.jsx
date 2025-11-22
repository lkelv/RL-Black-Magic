// src/pages/FileDownloadBoth.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function FileDownloadBoth() {
    const navigate = useNavigate();
    const location = useLocation();
    const hasDownloaded = useRef(false);

    // Get product info from navigation state
    const { productType, productKeyMethods, productKeySpecialist } = location.state || {};

    // Security: Redirect if user tries to access this page directly without validation
    useEffect(() => {
        if (!productType || productType !== 'both') {
            navigate('/activate', { replace: true });
        }
    }, [productType, navigate]);

    // Auto-download the file when the page loads
    useEffect(() => {
        if (productType !== 'both' || hasDownloaded.current) {
            return;
        }

        // Mark as downloaded BEFORE triggering to prevent double downloads
        hasDownloaded.current = true;

        // Trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = '/files/rlBMmmsm34.tns'; // Update this path to your actual file
        downloadLink.download = 'rlBMmmsm34.tns';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }, [productType]);

    const handleManualDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = '/files/rlBMmmsm34.tns'; // Update this path to your actual file
        downloadLink.download = 'rlBMmmsm34.tns';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleContinue = () => {
        navigate('/cas-id', {
            state: {
                productType,
                productKeyMethods,
                productKeySpecialist
            }
        });
    };

    return (
        <div className="bg-[#202830] text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Download Black Magic - Methods & Specialist
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Your download should start automatically
                    </p>
                </div>

                {/* Main Container */}
                <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#f4a52e] text-center">
                        2. Transfer to Calculator
                    </h2>

                    {/* Download Status */}
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

                    {/* Instructions Box */}
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
                            <li>Click "Select Files" and choose the downloaded rlBMmmsm34.tns file</li>
                            <li>Select your calculator from the device list</li>
                            <li>Click "Transfer" to send the file to your calculator</li>
                        </ol>
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        className="w-full bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-4 rounded-lg transition-all text-lg mb-6"
                    >
                        Continue to CAS ID Verification
                    </button>

                    {/* Features Grid */}
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

export default FileDownloadBoth;
