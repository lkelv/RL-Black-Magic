// src/components/Header.jsx
import React from 'react';

function Header() {
    return (
        <header className="bg-[#2c3f51] px-8 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    LOGO HERE
                </div>
                <nav>
                    <ul className="flex gap-8 text-white">
                        <li><a href="/" className="hover:text-[#74be9c] transition-colors">Home</a></li>
                        <li><a href="/activate" className="hover:text-[#74be9c] transition-colors">Activate</a></li>
                        <li><a href="/installation-guide" className="hover:text-[#74be9c] transition-colors">Installation guide</a></li>
                        <li><a href="/contact-us" className="hover:text-[#74be9c] transition-colors">Contact Us</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;