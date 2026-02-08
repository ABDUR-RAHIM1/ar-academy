import { getsActionSubAdmin } from "@/actions/subAdmins/getsActionSubAdmin";
import { getsActions } from "@/actions/users/getActions"
import { getMyPackage, packageGetAll } from "@/constans"

export const getAllPackages = async () => {
    const packages = await getsActions(packageGetAll);
    return packages
};


// ===== Purchase / active kora package 
export const fetchMyPackages = async () => {
    const myPackage = await getsActionSubAdmin(getMyPackage);
    return myPackage
};