import jwt from 'jsonwebtoken'
import { UserIDResponse } from '~/types/web/user_id_response'
export function generateAccessToken(payload: UserIDResponse) {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

    const token = jwt.sign(payload, JWT_ACCESS_SECRET!, {
        expiresIn: '8h',
    });

    return token;
}