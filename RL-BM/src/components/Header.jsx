import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, AlertTriangle } from 'lucide-react'; // Added AlertTriangle

/**
 * Controller class managing the Header's navigation state and routing logic.
 * Encapsulates UI state management, protected route logic, and event handling.
 */
class HeaderNavigationController {
    /**
     * Constructs the HeaderNavigationController.
     * @param {Object} state - Component state and hooks.
     * @param {boolean} state.isMenuOpen - Whether the mobile menu is open.
     * @param {Function} state.setIsMenuOpen - Setter for menu state.
     * @param {string|null} state.pendingNav - Target path if navigation is pending confirmation.
     * @param {Function} state.setPendingNav - Setter for pending navigation.
     * @param {string} state.currentPath - Current application URL path.
     * @param {Function} state.navigate - React Router navigate function.
     * @param {boolean} state.isNavLocked - Whether navigation is locked.
     */
    constructor({ isMenuOpen, setIsMenuOpen, pendingNav, setPendingNav, currentPath, navigate, isNavLocked }) {
        // State mappings
        this.isMenuOpen = isMenuOpen;
        this.setIsMenuOpen = setIsMenuOpen;
        this.pendingNav = pendingNav;
        this.setPendingNav = setPendingNav;
        this.currentPath = currentPath;
        this.navigate = navigate;
        this.isNavLocked = isNavLocked;

        // Abstraction: Hide routing configuration within the class
        this.protectedRoutes = [
            '/file-download', 
            '/cas-id', 
            '/installation-complete'
        ];
    }

    /**
     * Toggles the mobile menu.
     */
    toggleMenu() {
        this.setIsMenuOpen(!this.isMenuOpen);
    }

    /**
     * Checks if a given path is currently active.
     * @param {string} path - The path to check.
     * @returns {boolean} True if active.
     */
    isActive(path) {
        return this.currentPath === path;
    }

    /**
     * Handles navigation events, including modal interception for protected routes.
     * @param {Event} e - React synthetic event.
     * @param {string} targetPath - Route to navigate to.
     */
    handleNavigation(e, targetPath) {
        e.preventDefault();

        // Prevent navigation if already on the requested page
        if (this.currentPath === targetPath) {
            this.setIsMenuOpen(false);
            return;
        }

        // Encapsulated logic for protected route interception
        if (this.protectedRoutes.includes(this.currentPath) || this.isNavLocked) {
            this.setPendingNav(targetPath);
            this.setIsMenuOpen(false);
        } else {
            this.setIsMenuOpen(false);
            this.navigate(targetPath);
        }
    }

    /**
     * Confirms the pending navigation and triggers the route change.
     */
    confirmNavigation() {
        if (this.pendingNav) {
            this.navigate(this.pendingNav);
            this.setPendingNav(null);
        }
    }

    /**
     * Cancels pending navigation.
     */
    cancelNavigation() {
        this.setPendingNav(null);
    }
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingNav, setPendingNav] = useState(null);
  const [isNavLocked, setIsNavLocked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
      const lock = () => setIsNavLocked(true);
      const unlock = () => setIsNavLocked(false);
      window.addEventListener('lock-nav', lock);
      window.addEventListener('unlock-nav', unlock);
      return () => {
          window.removeEventListener('lock-nav', lock);
          window.removeEventListener('unlock-nav', unlock);
      };
  }, []);

  // Instantiate the Controller to manage all logic
  const controller = new HeaderNavigationController({
    isMenuOpen,
    setIsMenuOpen,
    pendingNav,
    setPendingNav,
    currentPath: location.pathname,
    navigate,
    isNavLocked
  });

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Activate', path: '/activate' },
    { name: 'Installation Guide', path: '/installation-guide' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <>
      <header className="bg-[#202830] border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                onClick={(e) => controller.handleNavigation(e, '/')} 
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
                  onClick={(e) => controller.handleNavigation(e, item.path)}
                  className={`text-sm font-medium transition-colors hover:text-[#74be9c] cursor-pointer ${
                    controller.isActive(item.path) ? 'text-[#74be9c]' : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/activate"
                onClick={(e) => controller.handleNavigation(e, '/activate')}
                className="ml-4 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-full text-[#202830] bg-[#74be9c] hover:bg-[#62a888] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Get Started
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => controller.toggleMenu()}
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
                  onClick={(e) => controller.handleNavigation(e, item.path)}
                  className={`block px-3 py-4 rounded-md text-base font-medium flex justify-between items-center cursor-pointer ${
                    controller.isActive(item.path) ? 'bg-gray-800 text-[#74be9c]' : 'text-gray-300 hover:bg-gray-800'
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
              Are you sure you want to leave? You will not be able to access this page again/see your product key again.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => controller.cancelNavigation()}
                className="px-5 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => controller.confirmNavigation()}
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