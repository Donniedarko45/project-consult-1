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

export const sendSMSOTP = async (
  phoneNumber: string,
  otp: string
): Promise<void> => {
  try {
    const twilioClient = getTwilioClient();

    // Use body text instead of content template
    // Only use contentSid if you have a valid Twilio Content Template SID
    const messageBody = `Your OTP is: ${otp}. Valid for ${config.otp.expiryMinutes} minutes. Do not share this code with anyone.`;

    await twilioClient.messages.create({
      from: config.twilio.phoneNumber,
      to: phoneNumber,
      body: messageBody
    });

    console.log(`[TWILIO] SMS OTP sent to ${phoneNumber}`);
  } catch (error) {
    console.error('[TWILIO] Failed to send SMS OTP:', error);
    throw new Error('Failed to send OTP via SMS');
  }
};
