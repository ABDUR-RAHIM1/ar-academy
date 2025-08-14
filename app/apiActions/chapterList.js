import { getsActions } from "@/actions/admins/getsAction"
import { chapterListGetAll, chapterListGetByQuery } from "@/constans";


//  get all Chapter public and admin 
export const getAllChapterList = async () => {
    const chapterList = await getsActions(chapterListGetAll);
    return chapterList;
}

//  get subject by Query parameters (subjectID)
export const getChapterByQuery = async (subjectId) => {
    const api = chapterListGetByQuery + subjectId;
   
    const chapters = await getsActions(api)
    return chapters;
}