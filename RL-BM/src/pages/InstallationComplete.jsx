// src/pages/InstallationComplete.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Copy } from 'lucide-react';

function InstallationComplete() {
    const location = useLocation();
    const navigate = useNavigate();
    const { password, casId } = location.state || {};

    useEffect(() => {
        if (!password || !casId) {
            navigate('/activate', { replace: true });
        }
    }, [password, casId, navigate]);

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    return (
        <div className="bg-[#202830] text-white py-12 px-8 flex flex-col items-center">
            <CheckCircle2 className="text-[#74be9c] w-24 h-24 mb-4" />

            <h1 className="text-4xl font-bold mb-4">
                Installation Complete!
            </h1>

            <div className="bg-[#2d5047] p-10 rounded-2xl max-w-lg text-center">
                <h2 className="text-[#f4a52e] text-2xl font-bold mb-3">
                    Your Activation Password
                </h2>

                <div className="bg-white text-gray-800 px-4 py-3 rounded-lg flex justify-between items-center mb-3">
                    <span className="font-mono text-xl">{password}</span>
                    <button onClick={handleCopy}>
                        <Copy className="text-[#2d5047] hover:text-[#74be9c]" />
                    </button>
                </div>

                {copied && <p className="text-[#74be9c]">Copied!</p>}
            </div>

            <a
                href="/"
                className="mt-8 bg-gradient-to-r from-[#62a888] to-[#74be9c] text-[#202830] px-8 py-3 rounded-lg font-bold"
            >
                Back to Home
            </a>
        </div>
    );
}

export default InstallationComplete;
