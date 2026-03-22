import { Cashfree, CFEnvironment, CreateOrderRequest } from 'cashfree-pg';
import config from '../../config';

const cashfree = new Cashfree(
    config.cashfree.environment === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
    config.cashfree.clientId,
    config.cashfree.clientSecret
);

interface CreateOrderOptions {
    orderId: string;
    orderAmount: number; 
    currency?: string;
    customerId: string;
    customerPhone: string;
    customerEmail?: string;
    returnUrl?: string;
}

interface CashfreeOrder {
    cf_order_id: string;
    order_id: string;
    order_status: string;
    payment_session_id: string;
    order_amount: number;
    order_currency: string;
}

/**
 * Create a Cashfree order
 */
export const createOrder = async (
    options: CreateOrderOptions
): Promise<CashfreeOrder> => {
    const request: CreateOrderRequest = {
        order_amount: options.orderAmount,
        order_currency: options.currency || 'INR',
        order_id: options.orderId,
        customer_details: {
            customer_id: options.customerId,
            customer_phone: options.customerPhone,
            ...(options.customerEmail && { customer_email: options.customerEmail }),
        },
        ...(options.returnUrl && {
            order_meta: {
                return_url: options.returnUrl,
            },
        }),
    };

    const response = await cashfree.PGCreateOrder(request);
    return response.data as CashfreeOrder;
};

/**
 * Verify Cashfree webhook signature
 */
export const verifyWebhookSignature = (
    signature: string,
    rawBody: string,
    timestamp: string
): boolean => {
    try {
        cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
        return true;
    } catch {
        return false;
    }
};

/**
 * Fetch order details from Cashfree
 */
export const fetchOrder = async (orderId: string): Promise<any> => {
    const response = await cashfree.PGFetchOrder(orderId);
    return response.data;
};

export default {
    createOrder,
    verifyWebhookSignature,
    fetchOrder,
};
