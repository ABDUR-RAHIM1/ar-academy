
export const deleteAction = async (api) => {

    const res = await fetch(api, {
        method: "DELETE"
    });

    const data = await res.json(); 

    return { status: res.status, data }
}