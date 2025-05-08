import { getsActions } from "@/actions/users/getActions";
import { getSubCategories, getSubCategoryByIndentifier } from "@/constans";

// dashboard/sub-categorie/view
export const getSubCategorie = async () => {
    const resposne = await getsActions(getSubCategories);
    return resposne;
}

// get Sub Categorie query by Indentifier with _id
export const getSubCategoieById = async (indentifier) => {
    const getCategorieByInderntifier = getSubCategoryByIndentifier + indentifier
    const resposne = await getsActions(getCategorieByInderntifier);

    return resposne
};
