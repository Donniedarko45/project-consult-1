import { Request, Response, NextFunction } from 'express';
import { sendEmail } from '../auth/brevo.service';
import ApiResponse from '../../utils/apiResponse';
import ApiError from '../../utils/apiError';
import config from '../../config';

/**
 * Handle public contact form submissions.
 * No authentication required — anyone can send a message.
 * 
 * POST /contact
 * Body: { name: string, phone: string, email: string, message: string }
 */
export const submitContactQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, phone, email, message } = req.body;

        // Basic validation
        if (!name || !phone || !email || !message) {
            throw ApiError.badRequest('All fields (name, phone, email, message) are required');
        }

        // Simple email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw ApiError.badRequest('Please provide a valid email address');
        }

        // Send email to the business via Brevo
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1a365d; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #4a5568; width: 100px;">Name:</td>
                        <td style="padding: 10px; color: #2d3748;">${name}</td>
                    </tr>
                    <tr style="background-color: #f7fafc;">
                        <td style="padding: 10px; font-weight: bold; color: #4a5568;">Phone:</td>
                        <td style="padding: 10px; color: #2d3748;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #4a5568;">Email:</td>
                        <td style="padding: 10px; color: #2d3748;">
                            <a href="mailto:${email}" style="color: #3182ce;">${email}</a>
                        </td>
                    </tr>
                    <tr style="background-color: #f7fafc;">
                        <td style="padding: 10px; font-weight: bold; color: #4a5568; vertical-align: top;">Message:</td>
                        <td style="padding: 10px; color: #2d3748; white-space: pre-wrap;">${message}</td>
                    </tr>
                </table>
                <p style="margin-top: 20px; font-size: 12px; color: #a0aec0;">
                    Sent from Ashwini SD Research website contact form
                </p>
            </div>
        `;

        const textContent = `New Contact Form Submission\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`;

        await sendEmail(
            {
                email: config.brevo.emailSenderAddress,
                name: config.brevo.emailSenderName,
            },
            `Website Contact: ${name}`,
            htmlContent,
            textContent
        );

        console.log(`[CONTACT] Form submitted by ${name} (${email})`);

        ApiResponse.success(res, {
            message: 'Your message has been sent successfully. We will get back to you soon.',
        }, 'Message sent successfully');

    } catch (error) {
        next(error);
    }
};

export default {
    submitContactQuery,
};
