"use server"
import { API_URL } from "@/constans"; 
import getToken from "../getToken/getToken";

//  use for admin
export const deleteUserAction = async (api) => {

    const token = await getToken();


    const res = await fetch(API_URL + api, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    return { status: res.status, data }
}