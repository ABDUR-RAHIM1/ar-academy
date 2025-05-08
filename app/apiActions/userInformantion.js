import { getsActions } from "@/actions/users/getActions";
import { loginUserAccount } from "@/constans";


export const getUserAccount = async () => {
    const userInfo = await getsActions(loginUserAccount);

    return userInfo
}