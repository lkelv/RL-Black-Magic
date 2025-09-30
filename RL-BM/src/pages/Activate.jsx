// src/pages/Activate.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Activate() {
    return (
        <div className="bg-[#202830] min-h-screen text-white py-16 px-8">
            <div className="max-w-7xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Black Magic Activation Portal
                    </h1>
                    <p className="text-lg text-gray-300">
                        Install Black Magic in two easy steps<br />
                        Select <span className="font-semibold">one version</span> only
                    </p>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Card 1: Methods 3&4 */}
                    <div className="bg-[#2d5047] rounded-lg p-8 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-8 text-[#f4a52e] text-center">
                            Maths Methods 3&4
                        </h2>
                        
                        {/* Placeholder for book image */}
                        <div className="bg-[#1a1a1a] w-48 h-64 mb-8 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-center px-4">Book Image</span>
                        </div>
                        
                        <Link 
                            to="/activate/methods"
                            className="bg-[#74be9c] hover:bg-[#62a888] text-[#202830] font-bold py-3 px-12 rounded-full transition-colors w-full text-center"
                        >
                            Activate
                        </Link>
                    </div>

                    {/* Card 2: Specialist 3&4 */}
                    <div className="bg-[#2d5047] rounded-lg p-8 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-8 text-[#f4a52e] text-center">
                            Specialist Maths 3&4
                        </h2>
                        
                        {/* Placeholder for book image */}
                        <div className="bg-[#1a1a1a] w-48 h-64 mb-8 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-center px-4">Book Image</span>
                        </div>
                        
                        <Link 
                            to="/activate/specialist"
                            className="bg-[#74be9c] hover:bg-[#62a888] text-[#202830] font-bold py-3 px-12 rounded-full transition-colors w-full text-center"
                        >
                            Activate
                        </Link>
                    </div>

                    {/* Card 3: Both */}
                    <div className="bg-[#2d5047] rounded-lg p-8 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-8 text-[#f4a52e] text-center">
                            MM and SM 3&4
                        </h2>
                        
                        {/* Placeholder for book images */}
                        <div className="bg-[#1a1a1a] w-48 h-64 mb-8 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-center px-4">Book Images</span>
                        </div>
                        
                        <Link 
                            to="/activate/both"
                            className="bg-[#74be9c] hover:bg-[#62a888] text-[#202830] font-bold py-3 px-12 rounded-full transition-colors w-full text-center"
                        >
                            Activate
                        </Link>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="text-center">
                    <p className="text-gray-300">
                        Any issues? <a href="/contact-us" className="text-[#74be9c] hover:underline">Contact Us!</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Activate;