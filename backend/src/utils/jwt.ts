import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

export interface JwtPayload {
    userId: string;
    phone: string;
}

export const generateToken = (payload: JwtPayload): string => {
    const secret: Secret = config.jwt.secret;
    return jwt.sign(payload, secret, {
        expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
    const secret: Secret = config.jwt.secret;
    return jwt.verify(token, secret) as JwtPayload;
};

export default {
    generateToken,
    verifyToken,
};
