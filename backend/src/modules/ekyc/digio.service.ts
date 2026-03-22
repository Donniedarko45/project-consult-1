import config from '../../config';

const DIGIO_BASE_URL =
    config.digio.environment === 'production'
        ? 'https://api.digio.in'
        : 'https://ext.digio.in:444';

const IS_PRODUCTION = config.digio.environment === 'production';

/**
 * Helper to get Basic auth token
 */
const getAuthToken = (): string =>
    Buffer.from(
        `${config.digio.clientId}:${config.digio.clientSecret}`
    ).toString('base64');

/**
 * PAN Verification Response from Digio
 */
export interface PanVerificationResponse {
    pan: string;
    category: string;
    status: string;
    remarks: string | null;
    name_as_per_pan_match: boolean;
    date_of_birth_match: boolean;
    aadhaar_seeding_status: string;
}

/**
 * Verify PAN card via Digio (New API)
 * 
 * POST /v3/client/kyc/fetch_id_data/PAN
 * 
 * Works for both Sandbox and Production (base URL differs per environment).
 * 
 * @param panNumber - User PAN number (e.g., ABCDE1234F)
 * @param name      - Full name (first + middle + last) or name on card
 * @param dob       - Date of birth in dd/MM/yyyy format
 */
export const verifyPan = async (
    panNumber: string,
    name: string,
    dob: string,
): Promise<PanVerificationResponse> => {
    const url = `${DIGIO_BASE_URL}/v3/client/kyc/fetch_id_data/PAN`;

    console.log('[DIGIO] PAN Verify URL:', url);
    console.log('[DIGIO] PAN:', panNumber);
    console.log('[DIGIO] Name:', name);
    console.log('[DIGIO] DOB:', dob);

    const body = {
        id_no: panNumber,
        name,
        dob,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${getAuthToken()}`,
        },
        body: JSON.stringify(body),
    });

    const data = await response.json() as Record<string, any>;
    console.log('[DIGIO] PAN Verify response:', JSON.stringify(data));

    if (!response.ok) {
        throw new Error(data.message || `Digio API error: ${response.status}`);
    }

    return {
        pan: data.pan || panNumber,
        category: data.category,
        status: data.status,
        remarks: data.remarks || null,
        name_as_per_pan_match: data.name_as_per_pan_match,
        date_of_birth_match: data.date_of_birth_match,
        aadhaar_seeding_status: data.aadhaar_seeding_status,
    };
};

/**
 * Verify Aadhaar number via Digio
 * 
 * Sandbox:    POST /v3/client/kyc/fetch_id_data/aadhaar
 * Production: Aadhaar verification requires OKYC (OTP-based) flow
 *             POST /v3/client/kyc/verify/aadhaar (initiate OTP)
 *             POST /v3/client/kyc/verify/aadhaar/otp (submit OTP)
 * 
 * Note: Direct Aadhaar lookup is not allowed in production per UIDAI rules.
 *       Production requires OTP-based verification.
 */
export const verifyAadhaar = async (
    aadhaarNumber: string,
): Promise<{ aadhaar: string; name?: string; status: string; ageRange?: string }> => {
    if (IS_PRODUCTION) {
        // In production, Aadhaar requires OTP-based OKYC flow
        // For now, throw a descriptive error. Full OKYC flow needs frontend integration.
        throw new Error(
            'Aadhaar verification in production requires OTP-based OKYC flow. ' +
            'Please use PAN verification, or contact support to enable OKYC integration.'
        );
    }

    // Sandbox endpoint
    const url = `${DIGIO_BASE_URL}/v3/client/kyc/fetch_id_data/aadhaar`;

    console.log('[DIGIO] Aadhaar Verify URL:', url);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${getAuthToken()}`,
        },
        body: JSON.stringify({ id_no: aadhaarNumber }),
    });

    const data = await response.json() as Record<string, any>;
    console.log('[DIGIO] Aadhaar Verify response:', JSON.stringify(data));

    if (!response.ok) {
        throw new Error(data.message || `Digio API error: ${response.status}`);
    }

    return {
        aadhaar: data.aadhaar || aadhaarNumber,
        name: data.full_name || data.name,
        status: data.status,
        ageRange: data.age_range,
    };
};

/**
 * Unified KYC verification
 * Automatically detects PAN (10 chars) vs Aadhaar (12 digits)
 * 
 * @param identifier - PAN number or Aadhaar number
 * @param name       - Full name (required for PAN verification)
 * @param dob        - Date of birth in dd/MM/yyyy format (required for PAN verification)
 */
export const verifyIdentity = async (
    identifier: string,
    name?: string,
    dob?: string,
): Promise<{ type: 'PAN' | 'AADHAAR'; status: string; details: Record<string, any> }> => {
    const cleaned = identifier.trim().toUpperCase();

    // PAN: 10 alphanumeric characters (e.g., ABCDE1234F)
    if (/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cleaned)) {
        if (!name || !dob) {
            throw new Error('Name and date of birth are required for PAN verification.');
        }
        const result = await verifyPan(cleaned, name, dob);
        return {
            type: 'PAN',
            status: result.status,
            details: result,
        };
    }

    // Aadhaar: 12 digit number
    if (/^\d{12}$/.test(cleaned)) {
        const result = await verifyAadhaar(cleaned);
        return {
            type: 'AADHAAR',
            status: result.status,
            details: result,
        };
    }

    throw new Error('Invalid identifier. Must be a valid PAN (10 chars) or Aadhaar (12 digits).');
};

// ==========================================
// DIGI SIGN - Digital Signature Functions
// ==========================================

/**
 * Response from Digio Sign Request creation
 */
export interface SignRequestResponse {
    id: string;
    is_agreement: boolean;
    agreement_status: string;
    file_name: string;
    no_of_pages: number;
    signing_parties: Array<{
        identifier: string;
        name: string;
        sign_type: string;
        status: string;
    }>;
    sign_request_details: Record<string, any>;
    created_at: string;
    updated_at: string;
}

type DisplayOnPage = 'first' | 'last' | 'all' | 'custom';

interface CreateUploadPdfRequestBody {
    file_name: string;
    file_data: string;
    signers: Array<{
        identifier: string;
        name: string;
        reason: string;
        sign_type: string;
    }>;
    expire_in_days: number;
    callback: string;
    display_on_page: DisplayOnPage;
    notify_signers: boolean;
    send_sign_link: boolean;
    generate_access_token: boolean;
    include_authentication_url: boolean;
}

const normalizeBase64Pdf = (fileData: string): string =>
    fileData.replace(/^data:application\/pdf;base64,/i, '').trim();

const clampExpireInDays = (value: number): number => {
    if (!Number.isFinite(value)) {
        return 10;
    }
    const rounded = Math.round(value);
    return Math.max(1, Math.min(90, rounded));
};

const sanitizeCallbackPart = (value: string): string =>
    value.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').slice(0, 48);

const buildUploadPdfRequestBody = (
    signerName: string,
    signerIdentifier: string,
    documentBase64: string,
    fileName: string,
    expireInDays: number,
): CreateUploadPdfRequestBody => {
    const callbackBase = sanitizeCallbackPart(fileName || 'agreement');

    return {
        file_name: fileName,
        file_data: normalizeBase64Pdf(documentBase64),
        signers: [
            {
                identifier: signerIdentifier,
                name: signerName,
                reason: 'Agreement signing',
                sign_type: 'electronic',
            },
        ],
        expire_in_days: clampExpireInDays(expireInDays),
        callback: `${callbackBase}_${Date.now()}`,
        display_on_page: 'last',
        notify_signers: true,
        send_sign_link: true,
        generate_access_token: true,
        include_authentication_url: true,
    };
};

/**
 * Create a DigiSign e-sign request
 * 
 * POST /v2/client/document/uploadpdf (JSON-based, base64 PDF)
 * 
 * @param signerName       - Name of the person who will sign
 * @param signerIdentifier - Email or phone number of the signer  
 * @param documentBase64   - Base64-encoded PDF document
 * @param fileName         - Name for the file
 * @param expireInDays     - Days until the sign request expires (default: 30)
 */
export const createSignRequest = async (
    signerName: string,
    signerIdentifier: string,
    documentBase64: string,
    fileName: string,
    expireInDays: number = 30,
): Promise<SignRequestResponse> => {
    const url = `${DIGIO_BASE_URL}/v2/client/document/uploadpdf`;

    console.log('[DIGIO] Create Sign Request URL:', url);
    console.log('[DIGIO] Signer:', signerName, signerIdentifier);
    console.log('[DIGIO] File:', fileName);

    const body = buildUploadPdfRequestBody(
        signerName,
        signerIdentifier,
        documentBase64,
        fileName,
        expireInDays,
    );

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${getAuthToken()}`,
        },
        body: JSON.stringify(body),
    });

    const data = await response.json() as Record<string, any>;
    console.log('[DIGIO] Create Sign response:', JSON.stringify(data));

    if (!response.ok) {
        const errorMessage =
            data.message ||
            data.error_message ||
            data.error ||
            `Digio Sign API error: ${response.status}`;
        throw new Error(errorMessage);
    }

    return data as SignRequestResponse;
};

/**
 * Get document/agreement status from Digio
 * 
 * GET /v2/client/document/{document_id}
 * 
 * @param documentId - The Digio document ID (e.g., DID2503...)
 */
export const getDocumentStatus = async (
    documentId: string,
): Promise<Record<string, any>> => {
    const url = `${DIGIO_BASE_URL}/v2/client/document/${documentId}`;

    console.log('[DIGIO] Get Document Status URL:', url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${getAuthToken()}`,
        },
    });

    const data = await response.json() as Record<string, any>;
    console.log('[DIGIO] Document Status response:', JSON.stringify(data));

    if (!response.ok) {
        throw new Error(data.message || `Digio API error: ${response.status}`);
    }

    return data;
};

/**
 * Get the signed document download URL
 * 
 * GET /v2/client/document/download/{document_id}
 * 
 * @param documentId - The Digio document ID
 */
export const getSignedDocumentUrl = async (
    documentId: string,
): Promise<string> => {
    const url = `${DIGIO_BASE_URL}/v2/client/document/download/${documentId}`;

    console.log('[DIGIO] Download Document URL:', url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${getAuthToken()}`,
        },
    });

    if (!response.ok) {
        const data = await response.json() as Record<string, any>;
        throw new Error(data.message || `Digio API error: ${response.status}`);
    }

    // The download endpoint returns the file URL or the file itself
    // For production, Digio returns a redirect URL to the signed PDF
    return url;
};

export default {
    verifyPan,
    verifyAadhaar,
    verifyIdentity,
    createSignRequest,
    getDocumentStatus,
    getSignedDocumentUrl,
};
