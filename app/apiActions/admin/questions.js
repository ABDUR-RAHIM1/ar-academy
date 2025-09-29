import { getsActions } from "@/actions/admins/getsAction";
import { questionGetSingelByAdmin, questionsGetAll } from "@/constans";

//  get all questions for admin without questions 
export const getAllQuestionsForAdmin = async () => {
    const questions = await getsActions(questionsGetAll);

    return questions;
}


//  get all questions for admin
export const getSingelQuestionsForAdmin = async (questionId, cacheTime = 0) => {
    const singleQuestion = await getsActions(questionGetSingelByAdmin + questionId, cacheTime);

    return singleQuestion;
}