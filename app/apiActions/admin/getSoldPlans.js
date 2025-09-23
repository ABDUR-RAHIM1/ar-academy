import { getsActions } from "@/actions/admins/getsAction"
import { purchaseCourseGetAll } from "@/constans";

export const getSoldPlans = async () => {
    const solds = await getsActions(purchaseCourseGetAll)
    return solds;
}