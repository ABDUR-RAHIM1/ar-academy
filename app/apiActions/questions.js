import { getsActions } from "@/actions/users/getActions";
import { questionGetByChapter, questionGetSingel, questionsGetAll } from "@/constans";

//  get all questions for user and admin
export const getAllQuestions = async () => {
    const questions = await getsActions(questionsGetAll);

    return questions;
}

export const getSingleQuestion = async (questionId) => {
    const singleQuestion = await getsActions(questionGetSingel + questionId);

    return singleQuestion;
}
export const getQuestionByChapterId = async (chapterId) => {
    const questionsById = await getsActions(questionGetByChapter + chapterId);

    return questionsById;
}