import { getsActions } from "@/actions/users/getActions"
import { categoriePostGet, chapters, chapterWithContent, commentByChapterId, getSubCategoryByIndentifier, postGetSubCategories } from "@/constans"

export const getCategories = async () => {
    const res = await getsActions(categoriePostGet);
    return res
};


// dashboard/sub-categorie/view
export const getSubCategorie = async () => {
    const resposne = await getsActions(postGetSubCategories);
    return resposne;
}

// get Sub Categorie quiery by Indentifier with _id
export const getSubCategoieById = async (indentifier) => {
    const getCategorieByInderntifier = getSubCategoryByIndentifier + indentifier
    const resposne = await getsActions(getCategorieByInderntifier);

    return resposne
};


// get all chapter without Contents for User (home page)
export const getAllChapters = async () => {
    const chapterList = await getsActions(chapters);

    return chapterList;
}

// get chapter by identifier without content (/sub-categorie == /dashboard)
export const getChapterByIdentifier = async (identifier) => {
    const api = chapters + identifier;
    const chapterBYIdentifier = await getsActions(api);

    return chapterBYIdentifier;
};


// get One Chapter with Contens by Identifier (_id , identifier ) -> ("/chapters/[chapterName]")
export const getChapterWithContent = async (chapterName) => {
    const api = chapterWithContent + chapterName
    const chapters = await getsActions(api);
    return chapters
}



// get comment using chapterId for specefic Chapter
export const getCommentsByChapterId = async (chapterId) => {
    const api = commentByChapterId + chapterId
    const comments = await getsActions(api);
    
    return comments
}
