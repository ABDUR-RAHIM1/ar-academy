import { getsActions } from "@/actions/users/getActions";
import { categorieGetAll } from "@/constans";

export const getCategories = async (cacheTime = 5) => {
    const res = await getsActions(categorieGetAll, cacheTime);
    return res
};