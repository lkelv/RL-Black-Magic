import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Activate', path: '/activate' },
    { name: 'Installation Guide', path: '/installation-guide' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#202830] border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-1 rounded-lg transition-transform">
                <img 
                  className="h-10 w-auto" 
                  src="/transparent RL Logo.png" 
                  alt="RL Logo" 
                />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Black <span className="text-[#74be9c]">Magic</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#74be9c] ${
                  isActive(item.path) ? 'text-[#74be9c]' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/activate"
              className="ml-4 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-full text-[#202830] bg-[#74be9c] hover:bg-[#62a888] transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#202830] border-b border-gray-700 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-4 rounded-md text-base font-medium flex justify-between items-center ${
                  isActive(item.path) ? 'bg-gray-800 text-[#74be9c]' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {item.name}
                <ChevronRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;