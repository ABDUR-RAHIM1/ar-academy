
// admin api handlers

import { getsActions } from "@/actions/admins/getsAction"
import { AllAccount, chapters, postGetSubCategories } from "@/constans"


// dashboard/sub-categorie/view
export const getSubCategorie = async () => {
    const resposne = await getsActions(postGetSubCategories);
    return resposne;
}


// get all chapter without Contents for admin (dashboard/chapters/view)
export const getAllChapters = async () => {
    const resposne = await getsActions(chapters);

    return resposne;
}


//  get all users for admin dahsboard (user managment)
export const getAllAccounts = async () => {
    const resposne = await getsActions(AllAccount);

    return resposne;
}

