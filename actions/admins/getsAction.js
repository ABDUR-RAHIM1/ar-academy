import { API_URL } from "@/constans";

export const getsActions = async (endpoint) => {
    const res = await fetch(`${API_URL}/api/subject`, {
        method: "GET",
        // next: { revalidate: 3000 }
    });

    const data = await res.json();
    console.log("x", data)

    return { status: res.status, data }
}