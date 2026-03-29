import twilio from 'twilio';
import config from '../../config';

let client: ReturnType<typeof twilio> | null = null;

const getTwilioClient = () => {
  if (!client) {
    client = twilio(
      config.twilio.accountSid,
      config.twilio.authToken
    );
  }
  return client;
};

/**
 * Normalize an Indian phone number to E.164 format (+91XXXXXXXXXX)
 * Handles: 9876543210 / 919876543210 / +919876543210
 */
const normalizeIndianPhone = (phone: string): string => {
  // Remove all non-digit characters except leading +
  const stripped = phone.replace(/[^\d+]/g, '');

  if (stripped.startsWith('+')) {
    return stripped; // Already E.164
  }
  if (stripped.startsWith('91') && stripped.length === 12) {
    return `+${stripped}`; // 91XXXXXXXXXX → +91XXXXXXXXXX
  }
  if (stripped.length === 10) {
    return `+91${stripped}`; // XXXXXXXXXX → +91XXXXXXXXXX
  }
  // Fallback: just prepend +
  return `+${stripped}`;
};

export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string
): Promise<void> => {
  try {
    const twilioClient = getTwilioClient();
    const formattedPhone = normalizeIndianPhone(phoneNumber);
    const fromNumber = config.twilio.phoneNumber.startsWith('whatsapp:')
      ? config.twilio.phoneNumber
      : `whatsapp:${config.twilio.phoneNumber}`;

    await twilioClient.messages.create({
      from: fromNumber,
      to: `whatsapp:${formattedPhone}`,
      body: message,
    });

    console.log(`[TWILIO] WhatsApp message sent to ${formattedPhone}`);
  } catch (error: any) {
    console.error('[TWILIO] Failed to send WhatsApp message:', {
      code: error?.code,
      message: error?.message,
      moreInfo: error?.moreInfo,
    });
    throw new Error(`WhatsApp delivery failed: ${error?.message}`);
  }
};

/**
 * Send a plain SMS (used as WhatsApp fallback for subscription confirmation)
 */
export const sendSMSMessage = async (
  phoneNumber: string,
  message: string
): Promise<void> => {
  try {
    const twilioClient = getTwilioClient();
    const formattedPhone = normalizeIndianPhone(phoneNumber);

    await twilioClient.messages.create({
      from: config.twilio.phoneNumber.replace(/^whatsapp:/, ''),
      to: formattedPhone,
      body: message,
    });

    console.log(`[TWILIO] SMS sent to ${formattedPhone}`);
  } catch (error: any) {
    console.error('[TWILIO] Failed to send SMS:', {
      code: error?.code,
      message: error?.message,
    });
    throw new Error(`SMS delivery failed: ${error?.message}`);
  }
};

export const sendSMSOTP = async (
  phoneNumber: string,
  otp: string
): Promise<void> => {
  try {
    const twilioClient = getTwilioClient();
    const formattedPhone = normalizeIndianPhone(phoneNumber);
    const messageBody = `Your OTP is: ${otp}. Valid for ${config.otp.expiryMinutes} minutes. Do not share this code with anyone.`;

    await twilioClient.messages.create({
      from: config.twilio.phoneNumber.replace(/^whatsapp:/, ''),
      to: formattedPhone,
      body: messageBody
    });

    console.log(`[TWILIO] SMS OTP sent to ${formattedPhone}`);
  } catch (error: any) {
    console.error('[TWILIO] Failed to send SMS OTP:', {
      code: error?.code,
      message: error?.message,
    });
    throw new Error('Failed to send OTP via SMS');
  }
};

export default {
  sendWhatsAppMessage,
  sendSMSMessage,
  sendSMSOTP,
};
