import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';
import config from '../config';

interface ErrorResponse {
    success: false;
    message: string;
    stack?: string;
}

export const errorMiddleware = (
    err: Error | ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    const response: ErrorResponse = {
        success: false,
        message,
    };

    // Include stack trace in development
    if (config.nodeEnv === 'development') {
        response.stack = err.stack;
    }

    // Log error
    console.error(`[ERROR] ${statusCode} - ${message}`);
    if (config.nodeEnv === 'development' && err.stack) {
        console.error(err.stack);
    }

    res.status(statusCode).json(response);
};

export default errorMiddleware;
