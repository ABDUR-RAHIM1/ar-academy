"use server"
import { API_URL } from "@/constans";
import getAdminToken from "../getToken/getAdminToken";

export const deleteAction = async (api) => {

    const token = await getAdminToken();


    const res = await fetch(API_URL + api, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    return { status: res.status, data }
}