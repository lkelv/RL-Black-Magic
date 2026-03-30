// src/controllers/CasIDController.js
import { validateCasId, generatePassword, markProductKeyAsUsed } from '../utils/productKeys';

/**
 * Controller class for the CAS ID verification page.
 * Encapsulates security traps, API verification, and UI state updates.
 */
export class CasIDController {
    /**
     * @param {Object} context - All the React state values, setters, and refs.
     */
    constructor(context) {
        this.casId = context.casId;
        this.confirmCasId = context.confirmCasId;
        this.productType = context.productType;
        this.productKey = context.productKey;
        this.productKeyMethods = context.productKeyMethods;
        this.productKeySpecialist = context.productKeySpecialist;
        
        this.setPopup = context.setPopup;
        this.navigate = context.navigate;
        this.setIsLoading = context.setIsLoading;
        this.setShowSlowMessage = context.setShowSlowMessage;
        
        this.trapRef = context.trapRef;
        this.imageSectionRef = context.imageSectionRef;
        this.loadingTimerRef = context.loadingTimerRef;
        this.windowObj = context.windowObj;
    }

    /**
     * Initializes the history trap to prevent accidental navigation.
     * @returns {Function} Cleanup function for event listeners.
     */
    initHistoryTrap() {
        if (!this.trapRef.current) {
            this.windowObj.history.pushState({ trapped: true }, '', this.windowObj.location.href);
            this.trapRef.current = true;
        }

        const handlePopState = () => {
            const userWantsToLeave = this.windowObj.confirm(
                'Are you sure you want to go back? This will require you to re-enter your product key.'
            );

            if (userWantsToLeave) {
                this.windowObj.removeEventListener('popstate', handlePopState);
                this.navigate('/activate', { replace: true, state: null });
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
            clearTimeout(this.loadingTimerRef.current); // Cleanup timer on unmount
        };
    }

    /**
     * Smooth scrolls to the help image section.
     */
    scrollToImage() {
        this.imageSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Handles the verification process for the CAS ID.
     */
    async handleVerify() {
        if (!this.casId.trim() || !this.confirmCasId.trim()) {
            this.setPopup({ type: 'error', message: 'Please enter valid CAS IDs.' });
            return;
        }

        if (this.casId !== this.confirmCasId) {
            this.setPopup({ type: 'error', message: 'CAS IDs do not match.' });
            return;
        }

        const val = validateCasId(this.casId);
        if (!val.valid) {
            this.setPopup({ type: 'error', message: val.message });
            return;
        }

        // Start loading
        this.setIsLoading(true);
        this.setShowSlowMessage(false);

        // Start a 1-second timer
        this.loadingTimerRef.current = setTimeout(() => {
            this.setShowSlowMessage(true);
        }, 1000);

        try {
            const last6 = this.casId.slice(-6);

            if (this.productType === 'both') {
                if (this.productKeyMethods) await markProductKeyAsUsed(this.productKeyMethods, last6);
                if (this.productKeySpecialist) await markProductKeyAsUsed(this.productKeySpecialist, last6);
            } else {
                if (this.productKey) await markProductKeyAsUsed(this.productKey, last6);
            }

            const productChar =
                this.productType === "methods" ? "M" :
                    this.productType === "specialist" ? "S" :
                        this.productType === "both" ? "B" : "M";

            const password = generatePassword(last6, productChar);

            setTimeout(() => {
                this.navigate('/installation-complete', {
                    state: {
                        password,
                        casId: this.casId,
                        productType: this.productType,
                    }
                });
            }, 1000);

        } catch {
            this.setPopup({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            // Stop loading regardless of success or failure
            this.setIsLoading(false);

            // Reset timer
            clearTimeout(this.loadingTimerRef.current);
            this.setShowSlowMessage(false);
        }
    }
}
