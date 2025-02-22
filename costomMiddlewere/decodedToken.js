import { secretKey } from '@/constans';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function decodedToken() {

    const cookieStore = await cookies()
    const getToken = cookieStore.get('ar_academy_token');
    const token = getToken?.value;

    if (!token) {
        return { error: "Token missing" };
    }
 
    try {
        const decoded = jwt.verify(token, secretKey);
       
        const {account} = decoded;
     
        if (!account.role) {
            return { error: 'Invalid token structure' };
        }

        return account;
    } catch (error) { 
        return { error: 'Invalid token' };
    }
}
