
// admin api handlers

import { getsActions } from "@/actions/admins/getsAction"
import { AllAccount, allAdminAccount, categorieGetAll, chaptersGetAll, getSubCategories } from "@/constans"

//  dashboard/categorie/view
export const getAllCategorie = async () => {
    const resposne = await getsActions(categorieGetAll);
    return resposne;
}


// dashboard/sub-categorie/view
export const getSubCategorie = async () => {
    const resposne = await getsActions(getSubCategories);
    return resposne;
}


// get all chapter without Contents for admin (dashboard/chapters/view)
export const getAllChapters = async () => {
    const resposne = await getsActions(chaptersGetAll);

    return resposne;
}


//  get all users for admin dahsboard (user managment)
export const getAllAccounts = async () => {
    const resposne = await getsActions(AllAccount);

    return resposne;
}

//  get all users for admin dahsboard (user managment)
export const getAllAdmin = async () => {
    const resposne = await getsActions(allAdminAccount);

    return resposne;
}

// //  get single result for details
// export const getResultById = async (resultId) => {
//     const api = resultDetailsApi + resultId
//     const resposne = await getsActions(api);

//     return resposne;
// }


//  get all results (admin)
// export const getAllResults = async () => {
//     const resulls = await getsActions(submitQuestions_get_all_result)

//     return resulls
// }