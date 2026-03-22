import { Response } from 'express';

interface ApiResponseData<T> {
    success: boolean;
    message: string;
    data?: T;
}

export class ApiResponse {
    static success<T>(res: Response, data: T, message = 'Success', statusCode = 200): Response {
        const responseData: ApiResponseData<T> = {
            success: true,
            message,
            data,
        };
        return res.status(statusCode).json(responseData);
    }

    static created<T>(res: Response, data: T, message = 'Created successfully'): Response {
        return ApiResponse.success(res, data, message, 201);
    }

    static noContent(res: Response): Response {
        return res.status(204).send();
    }

    static error(res: Response, message: string, statusCode = 500): Response {
        const responseData: ApiResponseData<null> = {
            success: false,
            message,
        };
        return res.status(statusCode).json(responseData);
    }
}

export default ApiResponse;
