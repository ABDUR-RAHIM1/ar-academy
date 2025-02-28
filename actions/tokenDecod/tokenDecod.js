import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const cookieStore = await cookies()
const getToken = cookieStore.get('ar_academy_token');

export const token = getToken?.value;
export const loginInfo = jwtDecode(token);

