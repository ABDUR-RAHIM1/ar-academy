import { getsActions } from "@/actions/users/getActions";
import { categorieGetAll } from "@/constans";

export const getCategories = async () => {
    const res = await getsActions(categorieGetAll);
    return res
};