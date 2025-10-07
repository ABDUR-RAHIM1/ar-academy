import { API_URL } from "@/constans";
import getSubAdminToken from "../getToken/getSubAdminToken";


// for admin
export const getsActionSubAdmin = async (endpoint) => {

    const token = await getSubAdminToken();

    const res = await fetch(`${API_URL + endpoint}`, {
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
    });

    const data = await res.json();

    return { status: res.status, data }
}