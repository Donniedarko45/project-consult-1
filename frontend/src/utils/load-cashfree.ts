/**
 * Cashfree Drop SDK Loader
 * Dynamically loads and initializes the Cashfree Drop-in checkout SDK
 */

// TypeScript type definitions for Cashfree Drop SDK
export interface CashfreeDropConfig {
    mode: "sandbox" | "production";
}

export interface CashfreeDropCheckoutOptions {
    paymentSessionId: string;
    returnUrl?: string;
    notifyUrl?: string;
}

export interface CashfreeCheckout {
    redirect(): void;
}

export interface CashfreeDrop {
    checkout(options: CashfreeDropCheckoutOptions): CashfreeCheckout;
}

declare global {
    interface Window {
        Cashfree(config: CashfreeDropConfig): CashfreeDrop;
    }
}

/**
 * Load Cashfree Drop SDK script
 */
export const loadCashfreeSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (typeof window.Cashfree === "function") {
            resolve();
            return;
        }

        // Create script element
        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.async = true;

        script.onload = () => {
            if (typeof window.Cashfree === "function") {
                resolve();
            } else {
                reject(new Error("Cashfree SDK loaded but not available"));
            }
        };

        script.onerror = () => {
            reject(new Error("Failed to load Cashfree SDK"));
        };

        document.head.appendChild(script);
    });
};

/**
 * Initialize Cashfree Drop checkout
 * @param mode - "sandbox" for testing, "production" for live
 */
export const initializeCashfree = (
    mode: "sandbox" | "production" = "production"
): CashfreeDrop => {
    if (typeof window.Cashfree !== "function") {
        throw new Error("Cashfree SDK not loaded. Call loadCashfreeSDK() first.");
    }

    return window.Cashfree({
        mode,
    });
};
