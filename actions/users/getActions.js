import { API_URL } from "@/constans";

//  for User
export const getsActions = async (endpoint) => {
    const res = await fetch(API_URL + endpoint, {
        method: "GET",
        cache: "no-store"
    });

    const data = await res.json();

    return { status: res.status, data }
}