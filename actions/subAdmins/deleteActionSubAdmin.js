"use server"
import { API_URL } from "@/constans"; 
import getSubAdminToken from "../getToken/getSubAdminToken";

//  use for admin
export const deleteAction = async (api) => {

    const token = await getSubAdminToken();


    const res = await fetch(API_URL + api, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    return { status: res.status, data }
}