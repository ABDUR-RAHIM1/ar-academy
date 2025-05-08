import { getsActions } from "@/actions/users/getActions"
import { categorieGetAll, chaptersGetAll, chapterWithContent, chapterWithoutContent, getSubCategories, getSubCategoryByIndentifier, getTokenApi } from "@/constans"


export const getToken = async () => {
    const token = await getsActions(getTokenApi);

    return token
}


export const getCategories = async () => {
    const res = await getsActions(categorieGetAll);
    return res
};


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


// get all chapter without Contents for User (home page)
export const getAllChapters = async () => {
    const chapterList = await getsActions(chaptersGetAll);

    return chapterList;
}

// get chapter by identifier without content (/sub-categorie == /dashboard)
export const getChapterByIdentifier = async (identifier) => {
    const api = chapterWithoutContent + identifier;
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
// export const getCommentsByChapterId = async (chapterId) => {
//     const api = commentByChapterId + chapterId
//     const comments = await getsActions(api);

//     return comments
// }


// //  get all questions for user and admin
// export const getAllQuestions = async () => {
//     const questions = await getsActions(questionsPOST_GET);

//     return questions;
// }

//  get Single question for user Using question _id for give exam
// export const getSingleQuestion = async (questionId) => {
//     const singleQuestion = await getsActions(questionSingleGET + questionId);

//     return singleQuestion;
// }

// //  exam result for users Profile (logged in users result)
// export const getMyResultData = async () => {
//     const myResults = await getsActions(getMyResult);

//     return myResults
// }