import { getAllChapters, getCategories, getSubCategorie } from "@/app/apiActions/client/clientApi";


/// get all categories for seacrh (search.js)
export const getSearchCategories = async () => {
    const resposnse = await getCategories();
    return resposnse
}

/// get all Sub categories for seacrh (search.js)
export const getSearchSubCategories = async () => {
    const resposnse = await getSubCategorie();
    return resposnse
}


/// get all Chapters for seacrh (search.js)
export const getSearchChapters = async () => {
    const resposnse = await getAllChapters();
    return resposnse
}