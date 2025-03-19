import { secretKey } from '@/constans';
import { jwtVerify } from 'jose';

export const decodeToken = async (token) => {
    try {

        const secret = new TextEncoder().encode(secretKey); // Encode Secret Key
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ["HS256"]
        });

        const encodedUserInfo = encodeURIComponent(JSON.stringify(payload));

        return encodedUserInfo;
    } catch (error) {
        console.error("❌ JWT verification failed:", error);
        throw new Error("Invalid Token");
    }
};
