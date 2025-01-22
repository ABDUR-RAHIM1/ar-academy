
 
export const postActions = async (endpoint, body) => {

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },

        body: JSON.stringify(body)
    });

    const data = await res.json();

    return {
        status: res.status,
        data: data
    }

}