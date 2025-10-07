"use server"

import { API_URL } from "@/constans";
import getSubAdminToken from "../getToken/getSubAdminToken";

export const postActionsSubAdmin = async (payload) => {

    const token = await getSubAdminToken();

    const { method, api, body } = payload;

    console.log(API_URL + api)

    const res = await fetch(API_URL + api, {
        method: method, // pass from components
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(body)
    });

    const data = await res.json();

    return {
        status: res.status,
        data: data
    }

}