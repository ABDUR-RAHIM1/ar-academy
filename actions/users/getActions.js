
import { API_URL } from "@/constans";
import getToken from "../getToken/getToken";

//  for User
export const getsActions = async (endpoint, revalidateTime = 5) => {
    const token = await getToken();
    // revalidateTime  => pass from page
    console.log({ endpoint })

    const res = await fetch(API_URL + endpoint, {
        method: "GET",
        next: { revalidate: revalidateTime },
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },

    });

    const data = await res.json();


    return { status: res.status, data }
}