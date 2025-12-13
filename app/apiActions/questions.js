
import { getsActionSubAdmin } from "@/actions/subAdmins/getsActionSubAdmin";
import { getsActions } from "@/actions/users/getActions";
import { questionGetSingel, questionReletedByCourseName, questionsGetAll, questionsGetAllByPaidStudent, questionsGetAllBySubAdmin } from "@/constans";

//  user je course gulo kineche sei course onujayi questions gulo dekhabe 
export const getStudentQuestionsListByCourse = async (courseId) => {
    const api = questionsGetAllByPaidStudent + courseId
    const questions = await getsActions(api , 0);

    return questions;
}



export const getSingleQuestion = async (questionId, cacheTime = 5) => {

    const singleQuestion = await getsActions(questionGetSingel + questionId, cacheTime);

    return singleQuestion;
};

//  je subAdmin Questions create koreche tar questions guloi dekhabe sudhu 
export const getSingleQuestionBySubAdmin = async (cacheTime = 2) => {

    const singleQuestion = await getsActionSubAdmin(questionsGetAllBySubAdmin, cacheTime);

    return singleQuestion;
};



// export const getQuestionByChapterId = async (chapterId, cacheTime = 5) => {
//     const questionsById = await getsActions(questionGetByChapter + chapterId, cacheTime);

//     return questionsById;
// }


export const getReletedQuestionsByCourseName = async (isAllTitle, cacheTime = 5) => {
    const reletedQuestions = await getsActions(questionReletedByCourseName + isAllTitle, cacheTime);

    return reletedQuestions;
}