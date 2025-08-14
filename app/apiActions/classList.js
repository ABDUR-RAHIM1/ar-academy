import { getsActions } from "@/actions/admins/getsAction"
import { classListGetAll } from "@/constans"


//  get all public and admin 
export const getAllClassList = async () => {
    const classList = await getsActions(classListGetAll);
    return classList;
}