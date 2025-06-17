"use server"
const { cookies } = require("next/headers");

const getToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("onushilon_academy_session");

    if (!token) {
        return null;
    }
 
    return token.value;
};

export default getToken;