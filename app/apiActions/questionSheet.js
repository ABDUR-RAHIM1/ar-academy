import { getsActions } from "@/actions/admins/getsAction";
import { questionSheetGetAll, questionSheetGetById } from "@/constans";
import { questionSeetGetByQuery } from "../../constans";


//  get all questions overview without questions array for dashboard overview
export const getQuestionsHSeetOverview = async () => {
    const questionsSheet = await getsActions(questionSheetGetAll);
    return questionsSheet
}

//  get subject by Query parameters (subjectID)
export const getQuestionsSheetByQuery = async (chapterId) => {
 
    const api = questionSeetGetByQuery + chapterId;

    const chapters = await getsActions(api)
    return chapters;
}

// get signle questionsSheet by _id (for details)
export const getSingleQuestionsSheetById = async (questionSheetId) => {
    const sheet = await getsActions(questionSheetGetById + questionSheetId);
    return sheet
}