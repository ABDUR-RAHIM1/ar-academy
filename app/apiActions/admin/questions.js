import { getsActions } from "@/actions/admins/getsAction";
import { questionsGetAll } from "@/constans";

//  get all questions for admin
export const getAllQuestionsForAdmin = async () => {
    const questions = await getsActions(questionsGetAll);

    return questions;
}