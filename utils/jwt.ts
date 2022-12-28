import jwt from "jsonwebtoken";

export function generateAccessToken(payload: string) {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

    const token = jwt.sign({id: payload}, JWT_ACCESS_SECRET!, {
        expiresIn: "8h",
    });

    return token;
}