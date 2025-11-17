import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, Copy } from 'lucide-react';

function InstallationComplete() {
    const location = useLocation();
    const { password: generatedPassword } = location.state || {};

    // Use generated password or placeholder
    const password = generatedPassword || 'XXXXXXXX';

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#202830] min-h-screen text-white py-16 px-8 flex flex-col items-center">
            {/* Check Icon */}
            <CheckCircle2 className="text-[#74be9c] w-28 h-28 mb-6 animate-fade-in" />

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center animate-fade-in-down">
                Installation complete!
            </h1>

            {/* Password Section */}
            <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12 mt-10 max-w-lg w-full text-center animate-fade-in-up">
                <h2 className="text-2xl font-bold text-[#f4a52e] mb-3">
                    Your Activation Password
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                    Save this password – you'll need it to access the Black Magic program if it logs you out.
                </p>

                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 mb-4">
                    <span className="text-gray-800 text-lg font-mono select-all">{password}</span>
                    <button
                        onClick={handleCopy}
                        className="text-[#2d5047] hover:text-[#74be9c] transition"
                        title="Copy password"
                    >
                        <Copy className="w-6 h-6" />
                    </button>
                </div>

                {copied && (
                    <p className="text-[#74be9c] text-sm animate-fade-in">
                        Password copied to clipboard!
                    </p>
                )}

                {/* Instructions */}
                <div className="mt-8 text-left bg-[#202830] rounded-lg p-6">
                    <h3 className="text-lg font-bold text-[#74be9c] mb-4">Next Steps:</h3>
                    <ol className="space-y-3 text-gray-300">
                        <li className="flex gap-3">
                            <span className="text-[#74be9c] font-bold">1.</span>
                            <span>Open the Black Magic program on your CAS calculator</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#74be9c] font-bold">2.</span>
                            <span>Enter the activation password when prompted</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#74be9c] font-bold">3.</span>
                            <span>Start using all premium features!</span>
                        </li>
                    </ol>
                </div>
            </div>

            {/* Back to Home Button */}
            <a
                href="/"
                className="mt-8 bg-gradient-to-r from-[#62a888] to-[#74be9c] hover:from-[#74be9c] hover:to-[#62a888] text-[#202830] font-bold py-3 px-8 rounded-lg transition-all"
            >
                Back to Home
            </a>
        </div>
    );
}

export default InstallationComplete;
