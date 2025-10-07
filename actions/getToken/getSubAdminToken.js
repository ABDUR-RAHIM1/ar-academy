"use server"
const { cookies } = require("next/headers");

const getSubAdminToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("onushilon_academy_sub_session");

    if (!token) {
        return null;
    }

    return token.value;
};

export default getSubAdminToken;