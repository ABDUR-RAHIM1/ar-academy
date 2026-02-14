import { API_URL } from "@/constans";
import getAdminToken from "../getToken/getAdminToken";


// for admin
export const getsActions = async (endpoint) => {

    const token = await getAdminToken();

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
};

// for admin updated; 
export const fetchActionAdmin = async (endpoint) => {

    const token = await getAdminToken();

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