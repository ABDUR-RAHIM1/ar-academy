"use server"

import { API_URL } from "@/constans";
import getToken from "../getToken/getToken";

export const postActions = async (payload) => {

    const token = await getToken()

    const { method, api, body } = payload 

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