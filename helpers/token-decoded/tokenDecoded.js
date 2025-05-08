import getToken from "@/actions/getToken/getToken";
import { jwtDecode } from "jwt-decode";

export const decodedToken = async () => {
    const token = await getToken();

    if (token) {
        const tokenInfo = jwtDecode(token)
        return tokenInfo
    } else {
        return null
    }


}

