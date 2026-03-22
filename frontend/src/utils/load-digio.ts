/**
 * Digio Web SDK Loader
 * Dynamically loads and initializes the Digio eKYC SDK
 */

declare global {
    interface Window {
        Digio: new (options: DigioOptions) => DigioInstance;
    }
}

interface DigioOptions {
    environment: "sandbox" | "production";
    callback: (response: DigioResponse) => void;
    logo?: string;
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
    };
    is_iframe?: boolean;
}

interface DigioResponse {
    digio_doc_id: string;
    message: string;
    status?: string;
}

interface DigioInstance {
    init: () => void;
    submit: (documentId: string, identifier: string, token?: string) => void;
    cancel: () => void;
}

/**
 * Load the Digio Web SDK script
 */
export const loadDigioSDK = (
    mode: "sandbox" | "production" = "sandbox",
): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined") {
            reject(new Error("Digio SDK can only be loaded in browser"));
            return;
        }

        // Check if already loaded
        if (window.Digio) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src =
            mode === "production"
                ? "https://app.digio.in/sdk/v12/digio.js"
                : "https://ext.digio.in/sdk/v12/digio.js";
        script.async = true;

        script.onload = () => {
            if (window.Digio) {
                resolve();
            } else {
                reject(new Error("Digio SDK loaded but constructor not available"));
            }
        };

        script.onerror = () => {
            reject(new Error("Failed to load Digio SDK script"));
        };

        document.head.appendChild(script);
    });
};

/**
 * Initialize and start the Digio eKYC flow
 */
export const startDigioKyc = (
    kycId: string,
    identifier: string,
    mode: "sandbox" | "production" = "sandbox",
): Promise<DigioResponse> => {
    return new Promise((resolve, reject) => {
        if (!window.Digio) {
            reject(new Error("Digio SDK not loaded. Call loadDigioSDK() first."));
            return;
        }

        const digio = new window.Digio({
            environment: mode,
            callback: (response: DigioResponse) => {
                resolve(response);
            },
            is_iframe: false,
        });

        digio.init();
        digio.submit(kycId, identifier);
    });
};

/**
 * Initialize and start the Digio e-Sign flow
 * Uses the same SDK as KYC but opens a document for signing
 * 
 * @param documentId - The Digio document ID (returned from backend initSign)
 * @param identifier - Signer's email or phone number
 * @param mode       - "sandbox" or "production"
 */
export const startDigioSign = (
    documentId: string,
    identifier: string,
    mode: "sandbox" | "production" = "production",
): Promise<DigioResponse> => {
    return new Promise((resolve, reject) => {
        if (!window.Digio) {
            reject(new Error("Digio SDK not loaded. Call loadDigioSDK() first."));
            return;
        }

        const digio = new window.Digio({
            environment: mode,
            callback: (response: DigioResponse) => {
                resolve(response);
            },
            is_iframe: false,
        });

        digio.init();
        digio.submit(documentId, identifier);
    });
};

export type { DigioResponse, DigioOptions, DigioInstance };
