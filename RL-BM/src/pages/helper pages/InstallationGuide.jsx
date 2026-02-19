// src/pages/InstallationGuide.jsx
import React from 'react';

function InstallationGuide() {
    return (
        <div className="bg-[#202830] min-h-screen text-white py-12 px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Installation Guide</h1>

                {/* Responsive 16:9 iframe (no plugin needed) */}
                <div className="relative w-full mb-8">
                    {/* 56.25% = 9/16 to preserve 16:9 */}
                    <div className="pt-[56.25%]"></div>
                    <iframe
                        className="absolute inset-0 h-full w-full rounded-lg"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?list=RDdQw4w9WgXcQ"  // use /embed/<ID>
                        title="Black Magic Installation Guide"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                </div>

                {/* Placeholder Text */}
                <div className="bg-[#2d3642] rounded-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">How to Install Black Magic</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Placeholder text: Here you will find a step-by-step guide on how to
                        install and activate the Black Magic program on your CAS calculator.
                        Detailed instructions, screenshots, and troubleshooting tips will
                        be provided here soon.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InstallationGuide;