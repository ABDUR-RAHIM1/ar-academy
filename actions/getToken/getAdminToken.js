"use server"
const { cookies } = require("next/headers");

const getAdminToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("onushilon_access");

    if (!token) {
        return null;
    }
    
    return token.value;
};

export default getAdminToken;