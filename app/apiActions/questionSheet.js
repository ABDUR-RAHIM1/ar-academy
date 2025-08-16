import { getsActions } from "@/actions/admins/getsAction";
import { questionSheetGetAll, questionSheetGetById } from "@/constans";


//  get all questions overview without questions array for dashboard overview
export const getQuestionsHSeetOverview = async () => {
    const questionsSheet = await getsActions(questionSheetGetAll);
    return questionsSheet
}

//  get subject by Query parameters (subjectID)
// ata akhn thakakuk , pore thik kora hobe 
export const getQuestionsSheetByQuery = async (subjectId) => {
    const api = chapterListGetByQuery + subjectId;

    const chapters = await getsActions(api)
    return chapters;
}

// get signle questionsSheet by _id (for details)
export const getSingleQuestionsSheetById = async(questionSheetId)=>{
     const sheet = await getsActions(questionSheetGetById+questionSheetId);
     return sheet 
}