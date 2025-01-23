

export const postActions = async (payload) => {

    const { method, api, body } = payload


    const res = await fetch(api, {
        method: method, // pass from components
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