import { getsActions } from "@/actions/admins/getsAction";
import { loginAdminAccount } from "@/constans";

export const getAdminAccount = async () => {
    const adminInfo = await getsActions(loginAdminAccount);

    return adminInfo;
}