import { getsActions } from "@/actions/users/getActions"
import { categoriePostGet, getSubCategoryByIndentifier } from "@/constans"

export const getCategories = async () => {
    const res = await getsActions(categoriePostGet);
    return res
};

// get Sub Categorie quiery by Indentifier with _id
export const getSubCategoieById = async (indentifier) => {
    const getCategorieByInderntifier = getSubCategoryByIndentifier + indentifier
    const resposne = await getsActions(getCategorieByInderntifier);

    return resposne
}