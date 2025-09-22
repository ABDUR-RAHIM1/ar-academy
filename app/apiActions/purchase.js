import { getsActions } from "@/actions/users/getActions"
import { purchaseCourseGetMe } from "@/constans"


export const getMyPurchaseCourse = async () => {
    const purchase = await getsActions(purchaseCourseGetMe);
    return purchase
}