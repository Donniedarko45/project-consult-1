import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    twilio: {
        accountSid: string;
        authToken: string;
        phoneNumber: string;
        otpTemplateSid: string;
    };
    cashfree: {
        clientId: string;
        clientSecret: string;
        environment: 'sandbox' | 'production';
    };
    digio: {
        clientId: string;
        clientSecret: string;
        environment: 'sandbox' | 'production';
    };
    otp: {
        expiryMinutes: number;
        length: number;
    };
}

const getEnvVar = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

export const config: Config = {
    port: parseInt(getEnvVar('PORT', '3000'), 10),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
    jwt: {
        secret: getEnvVar('JWT_SECRET'),
        expiresIn: getEnvVar('JWT_EXPIRES_IN', '7d'),
    },
    twilio: {
        accountSid: getEnvVar('TWILIO_ACCOUNT_SID'),
        authToken: getEnvVar('TWILIO_AUTH_TOKEN'),
        phoneNumber: getEnvVar('TWILIO_PHONE_NUMBER'),
        otpTemplateSid: getEnvVar('TWILIO_OTP_TEMPLATE_SID', ''),
    },
    cashfree: {
        clientId: getEnvVar('CASHFREE_CLIENT_ID'),
        clientSecret: getEnvVar('CASHFREE_CLIENT_SECRET'),
        environment: (getEnvVar('CASHFREE_ENV', 'sandbox') as 'sandbox' | 'production'),
    },
    digio: {
        clientId: getEnvVar('DIGIO_CLIENT_ID', ''),
        clientSecret: getEnvVar('DIGIO_CLIENT_SECRET', ''),
        environment: (getEnvVar('DIGIO_ENV', 'sandbox') as 'sandbox' | 'production'),
    },
    otp: {
        expiryMinutes: 5,
        length: 6,
    },
};

export default config;
