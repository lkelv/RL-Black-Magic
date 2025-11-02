import React from 'react';
import { CheckCircle2, Copy } from 'lucide-react';

function InstallationComplete() {
    const password = 'XXXXXXXX'; // placeholder password value

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        alert('Password copied to clipboard!');
    };

    return (
        <div className="bg-[#202830] min-h-screen text-white py-16 px-8 flex flex-col items-center">
            {/* Check Icon */}
            <CheckCircle2 className="text-[#74be9c] w-28 h-28 mb-6" />

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
                Installation complete!
            </h1>

            {/* Password Section */}
            <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12 mt-10 max-w-lg w-full text-center">
                <h2 className="text-2xl font-bold text-[#f4a52e] mb-3">
                    Your Password
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                    Save this password – you'll need it to access the Black Magic program if it logs you out.
                </p>

                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3">
                    <span className="text-gray-800 text-lg font-mono select-all">{password}</span>
                    <button
                        onClick={handleCopy}
                        className="text-[#2d5047] hover:text-[#74be9c] transition"
                        title="Copy password"
                    >
                        <Copy className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InstallationComplete;
