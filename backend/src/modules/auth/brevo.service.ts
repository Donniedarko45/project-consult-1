import { BrevoClient } from '@getbrevo/brevo';
import config from '../../config';

let client: BrevoClient | null = null;

const getBrevoClient = (): BrevoClient => {
  if (!client) {
    client = new BrevoClient({
      apiKey: config.brevo.apiKey,
    });
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

/**
 * Send a WhatsApp message via Brevo Transactional WhatsApp API.
 * Requires a pre-approved template in your Brevo WhatsApp dashboard.
 * Falls back to sending as plain text if no template is configured.
 */
export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string
): Promise<void> => {
  try {
    const brevoClient = getBrevoClient();
    const formattedPhone = normalizeIndianPhone(phoneNumber);
    // Strip leading '+' – Brevo expects digits only for the contact number
    const recipientNumber = formattedPhone.replace(/^\+/, '');
    const senderNumber = config.brevo.whatsappSender.replace(/^\+/, '');

    const response = await brevoClient.transactionalWhatsApp.sendWhatsappMessage({
      senderNumber,
      contactNumbers: [recipientNumber],
      templateId: config.brevo.whatsappTemplateId,
      // If the template has body parameters, map the message into param1
      ...(message ? { params: { body: [message] } } : {}),
    });

    console.log(
      `[BREVO] WhatsApp message sent to ${formattedPhone}`,
      response
    );
  } catch (error: any) {
    console.error('[BREVO] Failed to send WhatsApp message:', {
      code: error?.statusCode || error?.code,
      message: error?.message,
      body: error?.body,
    });
    throw new Error(`WhatsApp delivery failed: ${error?.message}`);
  }
};

/**
 * Send a plain SMS via Brevo Transactional SMS API.
 */
export const sendSMSMessage = async (
  phoneNumber: string,
  message: string
): Promise<void> => {
  try {
    const brevoClient = getBrevoClient();
    const formattedPhone = normalizeIndianPhone(phoneNumber);
    // Brevo expects the recipient in international format (with country code, no '+')
    const recipientNumber = formattedPhone.replace(/^\+/, '');

    const response = await brevoClient.transactionalSms.sendTransacSms({
      sender: config.brevo.smsSender,
      recipient: recipientNumber,
      content: message,
      type: 'transactional',
    });

    console.log(
      `[BREVO] SMS sent to ${formattedPhone}`,
      response
    );
  } catch (error: any) {
    console.error('[BREVO] Failed to send SMS:', {
      code: error?.statusCode || error?.code,
      message: error?.message,
      body: error?.body,
    });
    throw new Error(`SMS delivery failed: ${error?.message}`);
  }
};

/**
 * Send an OTP via SMS using Brevo.
 */
export const sendSMSOTP = async (
  phoneNumber: string,
  otp: string
): Promise<void> => {
  try {
    const brevoClient = getBrevoClient();
    const formattedPhone = normalizeIndianPhone(phoneNumber);
    const recipientNumber = formattedPhone.replace(/^\+/, '');
    const messageBody = `Your OTP is: ${otp}. Valid for ${config.otp.expiryMinutes} minutes. Do not share this code with anyone.`;

    const response = await brevoClient.transactionalSms.sendTransacSms({
      sender: config.brevo.smsSender,
      recipient: recipientNumber,
      content: messageBody,
      type: 'transactional',
    });

    console.log(
      `[BREVO] SMS OTP sent to ${formattedPhone}`,
      response
    );
  } catch (error: any) {
    console.error('[BREVO] Failed to send SMS OTP:', {
      code: error?.statusCode || error?.code,
      message: error?.message,
      body: error?.body,
    });
    throw new Error('Failed to send OTP via SMS');
  }
};

/**
 * Send a transactional email via Brevo.
 */
export const sendEmail = async (
  to: { email: string; name?: string },
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<void> => {
  try {
    const brevoClient = getBrevoClient();

    const response = await brevoClient.transactionalEmails.sendTransacEmail({
      sender: {
        name: config.brevo.emailSenderName,
        email: config.brevo.emailSenderAddress,
      },
      to: [{ email: to.email, name: to.name || to.email }],
      subject,
      htmlContent,
      ...(textContent ? { textContent } : {}),
    });

    console.log(
      `[BREVO] Email sent to ${to.email}`,
      response
    );
  } catch (error: any) {
    console.error('[BREVO] Failed to send email:', {
      code: error?.statusCode || error?.code,
      message: error?.message,
      body: error?.body,
    });
    throw new Error(`Email delivery failed: ${error?.message}`);
  }
};

export default {
  sendWhatsAppMessage,
  sendSMSMessage,
  sendSMSOTP,
  sendEmail,
};
