// src/controllers/ActivationController.js
import { validateProductKey, markProductKeyAsUsed } from '../utils/productKeys';

/**
 * Base Abstract Controller for Product Activation.
 * Implements Template Method pattern for the activation flow,
 * encapsulating UI state updates, timeouts, and API calls.
 */
export class BaseActivationController {
    /**
     * @param {Object} context - React state setters and refs
     */
    constructor(context) {
        this.setPopup = context.setPopup;
        this.setIsLoading = context.setIsLoading;
        this.setShowSlowMessage = context.setShowSlowMessage;
        this.setTurnstileToken = context.setTurnstileToken;
        this.navigate = context.navigate;
        
        this.turnstileRef = context.turnstileRef;
        this.loadingTimerRef = context.loadingTimerRef;
        this.turnstileToken = context.turnstileToken;
    }

    /**
     * @abstract
     * Validates user inputs before proceeding.
     * @returns {boolean} True if valid.
     */
    validateInputs() { throw new Error("Method 'validateInputs()' must be implemented."); }

    /**
     * @abstract
     * Performs the backend validation.
     * @returns {Promise<Object>} The validation result.
     */
    async performValidation() { throw new Error("Method 'performValidation()' must be implemented."); }

    /**
     * @abstract
     * Logic to execute on success.
     */
    async onSuccess() { throw new Error("Method 'onSuccess()' must be implemented."); }

    /**
     * Determines if the validation payload is successful.
     * Can be overridden by subclasses if structure differs.
     */
    isValidationSuccessful(validation) {
        return validation.valid;
    }

    /**
     * Template method defining the skeleton of the activation algorithm.
     */
    async handleActivate() {
        if (!this.validateInputs()) return;

        if (!this.turnstileToken) {
            this.setPopup({ type: 'error', message: 'Please complete the security check.' });
            return;
        }

        this.setIsLoading(true);
        this.setShowSlowMessage(false);

        this.loadingTimerRef.current = setTimeout(() => {
            this.setShowSlowMessage(true);
        }, 1000);

        try {
            const validation = await this.performValidation();

            if (this.isValidationSuccessful(validation)) {
                await this.onSuccess(validation);
            } else {
                this.handleValidationError(validation);
                this.resetSecurityCheck();
            }
        } catch {
            this.setPopup({ type: 'error', message: 'Connection error. Please try again.' });
            this.resetSecurityCheck();
        } finally {
            this.setIsLoading(false);
            clearTimeout(this.loadingTimerRef.current);
            this.setShowSlowMessage(false);
        }
    }

    /**
     * Handles UI updates on error.
     */
    handleValidationError(validation) {
        this.setPopup({ type: 'error', message: validation.message || 'Validation failed' });
    }

    /**
     * Resets the cloudflare turnstile.
     */
    resetSecurityCheck() {
        this.setTurnstileToken(null);
        this.turnstileRef.current?.reset();
    }
}

/**
 * Controller specifically for the Methods Activation.
 * Inherits from BaseActivationController.
 */
export class MethodsActivationController extends BaseActivationController {
    constructor(context, productKey) {
        super(context);
        this.productKey = productKey;
    }

    validateInputs() {
        if (!this.productKey.trim()) {
            this.setPopup({ type: 'error', message: 'Please enter a valid product key' });
            return false;
        }
        return true;
    }

    async performValidation() {
        return await validateProductKey(
            { key: this.productKey, type: 'methods' }, 
            this.turnstileToken
        );
    }

    async onSuccess() {
        await markProductKeyAsUsed(this.productKey, null);
        this.setPopup({ type: 'success', message: 'Validated! Redirecting...' });
        setTimeout(() => {
            this.navigate('/file-download', { state: { productType: 'methods', productKey: this.productKey } });
        }, 2000);
    }
}

/**
 * Controller specifically for the Specialist Activation.
 * Inherits from BaseActivationController.
 */
export class SpecialistActivationController extends BaseActivationController {
    constructor(context, productKey) {
        super(context);
        this.productKey = productKey;
    }

    validateInputs() {
        if (!this.productKey.trim()) {
            this.setPopup({ type: 'error', message: 'Please enter a valid product key' });
            return false;
        }
        return true;
    }

    async performValidation() {
        return await validateProductKey(
            { key: this.productKey, type: 'specialist' }, 
            this.turnstileToken
        );
    }

    async onSuccess() {
        await markProductKeyAsUsed(this.productKey, null);
        this.setPopup({ type: 'success', message: 'Product key validated! Redirecting to download...' });
        setTimeout(() => {
            this.navigate('/file-download', { state: { productType: 'specialist', productKey: this.productKey } });
        }, 2000);
    }
}

/**
 * Controller specifically for BOTH Methods and Specialist Activation.
 * Inherits from BaseActivationController.
 */
export class BothActivationController extends BaseActivationController {
    constructor(context, productKeyMethods, productKeySpecialist) {
        super(context);
        this.productKeyMethods = productKeyMethods;
        this.productKeySpecialist = productKeySpecialist;
    }

    validateInputs() {
        if (!this.productKeyMethods.trim() || !this.productKeySpecialist.trim()) {
            this.setPopup({ type: 'error', message: 'Please enter valid product keys for both subjects' });
            return false;
        }
        return true;
    }

    async performValidation() {
        return await validateProductKey([
            { key: this.productKeyMethods, type: 'methods' },
            { key: this.productKeySpecialist, type: 'specialist' }
        ], this.turnstileToken);
    }

    isValidationSuccessful(results) {
        // Both validations must be valid natively
        return results[0].valid && results[1].valid;
    }

    handleValidationError(results) {
        const validationMethods = results[0];
        const validationSpecialist = results[1];
        
        if (!validationMethods.valid) {
            this.setPopup({ type: 'error', message: `Methods key: ${validationMethods.message}` });
        } else if (!validationSpecialist.valid) {
            this.setPopup({ type: 'error', message: `Specialist key: ${validationSpecialist.message}` });
        }
    }

    async onSuccess() {
        await markProductKeyAsUsed(this.productKeyMethods, null);
        await markProductKeyAsUsed(this.productKeySpecialist, null);

        this.setPopup({ type: 'success', message: 'Both product keys validated! Redirecting to download...' });

        setTimeout(() => {
            this.navigate('/file-download', {
                state: {
                    productType: 'both',
                    productKeyMethods: this.productKeyMethods,
                    productKeySpecialist: this.productKeySpecialist
                }
            });
        }, 2000);
    }
}
