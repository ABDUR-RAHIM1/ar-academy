import { getsActions } from "@/actions/admins/getsAction"
import { getAllCourseSumary, getAllUsersSumary } from "@/constans"

// get all ocurse name and lenght
export const getCourseSummary = async () => {
    const courseSummary = await getsActions(getAllCourseSumary);

    return courseSummary;
}


// get all users activites summary
export const getUsersSummary = async () => {
    const usersSummary = await getsActions(getAllUsersSumary);

    return usersSummary;
}