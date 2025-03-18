import { secretKey } from '@/constans';
import { jwtVerify } from 'jose';

export const DecoedToken = async (token) => {

    const secret = new TextEncoder().encode("abrahimArAcademyBD17");

    try {

        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error("JWT verification failed:", error);
        throw new Error("Invalid Token");
    }
};
