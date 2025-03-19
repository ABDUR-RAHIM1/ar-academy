import { jwtVerify } from 'jose';
export const DecoedToken = async (token) => {
    const secret = new TextEncoder().encode("abdurrahim"); // Encode key correctly
    console.log("Secret Key:", new TextDecoder().decode(new TextEncoder().encode("abdurrahim")));
    try {
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ['HS256']  // Algorithm must match
        });
        return payload;
    } catch (error) {
        console.error("JWT verification failed:", error);
        throw new Error("Invalid Token");
    }
};
