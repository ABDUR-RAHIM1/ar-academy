
// admin api handlers

import { getsActions } from "@/actions/admins/getsAction"
import { chapters, postGetSubCategories } from "@/constans"


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