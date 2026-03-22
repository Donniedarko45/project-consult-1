import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import ApiError from '../utils/apiError';

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw ApiError.unauthorized('No token provided');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw ApiError.unauthorized('No token provided');
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(ApiError.unauthorized('Invalid or expired token'));
        }
    }
};

export default authMiddleware;
