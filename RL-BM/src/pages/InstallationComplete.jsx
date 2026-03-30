// src/pages/InstallationComplete.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Copy } from 'lucide-react';

/**
 * Controller class for the Installation Complete page.
 * Manages security redirection, history traps, and clipboard interactions.
 */
class InstallationCompleteController {
    /**
     * Constructs the controller with dependencies.
     * @param {Object} context
     */
    constructor(context) {
        this.navigate = context.navigate;
        this.generatedPassword = context.generatedPassword;
        this.casId = context.casId;
        this.trapRef = context.trapRef;
        this.setCopied = context.setCopied;
        this.windowObj = context.windowObj;
        this.navigatorObj = context.navigatorObj;
    }

    /**
     * Enforces the security policy that users must have valid state.
     */
    enforceSecurity() {
        if (!this.generatedPassword || !this.casId) {
            this.navigate('/activate', { replace: true });
        }
    }

    /**
     * Installs a history trap to prevent accidental back navigation.
     * @returns {Function} Cleanup function
     */
    initHistoryTrap() {
        if (!this.trapRef.current) {
            this.windowObj.history.pushState({ trapped: true }, '', this.windowObj.location.href);
            this.trapRef.current = true;
        }

        const handlePopState = () => {
            const userWantsToLeave = this.windowObj.confirm(
                'Are you sure you want to go back? This will require you to re-enter your activation details.'
            );

            if (userWantsToLeave) {
                this.windowObj.removeEventListener('popstate', handlePopState);
                this.windowObj.history.back();
            } else {
                this.windowObj.history.pushState({ trapped: true }, '', this.windowObj.location.href);
            }
        };

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        this.windowObj.addEventListener('popstate', handlePopState);
        this.windowObj.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            this.windowObj.removeEventListener('popstate', handlePopState);
            this.windowObj.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }

    /**
     * Copies the password to the clipboard and handles success states.
     * @param {string} password 
     */
    handleCopy(password) {
        this.navigatorObj.clipboard.writeText(password);
        this.setCopied(true);
        setTimeout(() => this.setCopied(false), 2000);
    }
}

function InstallationComplete() {
    const location = useLocation();
    const navigate = useNavigate();
    const { password: generatedPassword, casId } = location.state || {};
    const trapRef = useRef(false);
    const [copied, setCopied] = useState(false);

    const controller = useMemo(() => new InstallationCompleteController({
        navigate, generatedPassword, casId, trapRef, 
        setCopied, windowObj: window, navigatorObj: navigator
    }), [navigate, generatedPassword, casId]);

    useEffect(() => {
        controller.enforceSecurity();
    }, [generatedPassword, casId, navigate, controller]);

    useEffect(() => {
        return controller.initHistoryTrap();
    }, [controller]);

    const password = generatedPassword || 'XXXXXXXX';
    const handleCopy = () => controller.handleCopy(password);

    return (
        <div className="bg-[#202830] text-white py-12 px-8 flex flex-col items-center">
                {/* Check Icon */}
                <CheckCircle2 className="text-[#74be9c] w-24 h-24 mb-4 animate-fade-in" />

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
                    Save this password – you'll need it to access the BlackMagic program if it logs you out.
                </p>

                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 mb-4">
                    <span className="text-gray-800 text-lg font-mono select-all">{password}</span>
                    <button
                        onClick={handleCopy}
                        className="text-[#2d5047] hover:text-[#74be9c] transition cursor-pointer"
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
                            <span>Open the BlackMagic program on your CAS calculator</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#74be9c] font-bold">2.</span>
                            <span>Enter the activation password when prompted</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#74be9c] font-bold">3.</span>
                            <span className="text-[#F04D4D]">Press <b>ctrl+s</b> to save password on CAS</span>
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