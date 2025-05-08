
import { API_URL } from "@/constans";
import getToken from "../getToken/getToken";

//  for User
export const getsActions = async (endpoint) => {
    const token = await getToken();

    const res = await fetch(API_URL + endpoint, {
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