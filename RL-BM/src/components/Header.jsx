import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Clock, ShieldCheck } from 'lucide-react';
import ConfirmNavigationModal from './ConfirmNavigationModal';

class HeaderNavigationController {
    constructor({ isMenuOpen, setIsMenuOpen, pendingNav, setPendingNav, currentPath, navigate, isNavLocked }) {
        this.isMenuOpen = isMenuOpen;
        this.setIsMenuOpen = setIsMenuOpen;
        this.pendingNav = pendingNav;
        this.setPendingNav = setPendingNav;
        this.currentPath = currentPath;
        this.navigate = navigate;
        this.isNavLocked = isNavLocked;
        this.protectedRoutes = ['/file-download', '/cas-id', '/installation-complete'];
    }

    toggleMenu() { this.setIsMenuOpen(!this.isMenuOpen); }
    isActive(path) { return this.currentPath === path; }

    handleNavigation(e, targetPath) {
        e.preventDefault();
        if (this.currentPath === targetPath) {
            this.setIsMenuOpen(false);
            return;
        }

        if (this.protectedRoutes.includes(this.currentPath) || this.isNavLocked) {
            this.setPendingNav(targetPath);
            this.setIsMenuOpen(false);
        } else {
            this.setIsMenuOpen(false);
            this.navigate(targetPath);
        }
    }

    confirmNavigation() {
        if (this.pendingNav) {
            this.navigate(this.pendingNav);
            this.setPendingNav(null);
        }
    }

    cancelNavigation() { this.setPendingNav(null); }
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pendingNav, setPendingNav] = useState(null);
    const [isNavLocked, setIsNavLocked] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const controller = new HeaderNavigationController({
        isMenuOpen, setIsMenuOpen, pendingNav, setPendingNav,
        currentPath: location.pathname, navigate, isNavLocked
    });

    const navigation = [
        { name: 'Home', path: '/' },
        { name: 'Learning Portal', path: '/learning-portal' },
        { name: 'Activate', path: '/activate' },
        { name: 'Installation Guide', path: '/installation-guide' },
        { name: 'Contact Us', path: '/contact-us' },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 shadow-2xl">
                {/* MAIN NAVIGATION HEADER */}
                <div className="bg-[#202830] border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">

                            {/* LOGO */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link
                                    to="/"
                                    onClick={(e) => controller.handleNavigation(e, '/')}
                                    className="flex items-center gap-3 transition-transform active:scale-95"
                                >
                                    <img className="h-10 w-auto" src="/transparent RL Logo.png" alt="RL Logo" />
                                    <span className="text-white font-black text-xl tracking-tight">
                      Black<span className="text-[#74be9c]">Magic</span>
                  </span>
                                </Link>
                            </div>

                            {/* DESKTOP NAVIGATION */}
                            <nav className="hidden md:flex items-center space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={(e) => controller.handleNavigation(e, item.path)}
                                        className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-[#74be9c] ${
                                            controller.isActive(item.path) ? 'text-[#74be9c]' : 'text-gray-400'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}

                                <Link
                                    to="/activate"
                                    onClick={(e) => controller.handleNavigation(e, '/activate')}
                                    className="ml-4 px-8 py-3 text-xs font-black uppercase tracking-widest rounded-full text-[#202830] bg-[#74be9c] hover:bg-[#86cfad] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#74be9c]/10"
                                >
                                    Get Started
                                </Link>
                            </nav>

                            {/* MOBILE MENU BUTTON */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => controller.toggleMenu()}
                                    className="text-gray-400 hover:text-white p-2"
                                >
                                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STUDENT ACCESS HEADING (Now Underneath) */}
                <div className="bg-[#1a1f26] border-b border-white/5 py-2.5 px-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-[#74be9c]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    Authenticated Student Access
                </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-gray-500">License Ends:</span>
                            <span className="flex items-center gap-1.5 text-[#f59e0b]">
                <Clock size={12} /> Dec 31, 2026
              </span>
                        </div>
                    </div>
                </div>

                {/* MOBILE NAVIGATION DRAWER */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#202830] border-t border-gray-800 animate-in slide-in-from-top duration-300">
                        <div className="px-4 pt-4 pb-8 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={(e) => controller.handleNavigation(e, item.path)}
                                    className={`block px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest ${
                                        controller.isActive(item.path) ? 'bg-[#74be9c]/10 text-[#74be9c]' : 'text-gray-300 hover:bg-white/5'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <ConfirmNavigationModal
                isOpen={!!pendingNav}
                onConfirm={() => controller.confirmNavigation()}
                onCancel={() => controller.cancelNavigation()}
            />
        </>
    );
};

export default Header;