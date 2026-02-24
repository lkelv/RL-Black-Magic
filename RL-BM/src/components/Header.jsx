import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, AlertTriangle } from 'lucide-react'; // Added AlertTriangle

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingNav, setPendingNav] = useState(null); // Tracks the path if a user needs confirming
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Activate', path: '/activate' },
    { name: 'Installation Guide', path: '/installation-guide' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const isActive = (path) => location.pathname === path;

  const protectedRoutes = [
    '/file-download', 
    '/cas-id', 
    '/installation-complete'
  ];

  const handleNavigation = (e, targetPath) => {
    e.preventDefault(); // Always stop auto-navigation

    // Do nothing if clicking the link for the page we are already on
    if (location.pathname === targetPath) {
      setIsMenuOpen(false);
      return;
    }

    // If on a protected route, open the custom React modal instead of window.confirm
    if (protectedRoutes.includes(location.pathname)) {
      setPendingNav(targetPath);
      setIsMenuOpen(false);
    } else {
      // Navigate normally
      setIsMenuOpen(false);
      navigate(targetPath);
    }
  };

  const confirmNavigation = () => {
    if (pendingNav) {
      navigate(pendingNav);
      setPendingNav(null); // Reset state
    }
  };

  const cancelNavigation = () => {
    setPendingNav(null); // Close modal
  };

  return (
    <>
      <header className="bg-[#202830] border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                onClick={(e) => handleNavigation(e, '/')} 
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="p-1 rounded-lg transition-transform">
                  <img 
                    className="h-10 w-auto" 
                    src="/transparent RL Logo.png" 
                    alt="RL Logo" 
                  />
                </div>
                <span className="text-white font-bold text-xl tracking-tight">
                  Black<span className="text-[#74be9c]">Magic</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => handleNavigation(e, item.path)}
                  className={`text-sm font-medium transition-colors hover:text-[#74be9c] cursor-pointer ${
                    isActive(item.path) ? 'text-[#74be9c]' : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/activate"
                onClick={(e) => handleNavigation(e, '/activate')}
                className="ml-4 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-full text-[#202830] bg-[#74be9c] hover:bg-[#62a888] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Get Started
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none cursor-pointer"
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
                  onClick={(e) => handleNavigation(e, item.path)}
                  className={`block px-3 py-4 rounded-md text-base font-medium flex justify-between items-center cursor-pointer ${
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

      {/* --- CUSTOM CONFIRMATION MODAL --- */}
      {pendingNav && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#2d3642] border border-gray-600 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#F04D4D]/20 p-3 rounded-full text-[#F04D4D]">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Leave Page?</h3>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Are you sure you want to leave? This will require you to re-enter your product key to access this page again.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelNavigation}
                className="px-5 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmNavigation}
                className="px-5 py-2.5 rounded-lg bg-[#F04D4D] hover:bg-[#d94444] text-white font-bold transition-colors shadow-lg cursor-pointer"
              >
                Yes, Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;