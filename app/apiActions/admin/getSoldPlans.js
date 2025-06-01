import { getsActions } from "@/actions/admins/getsAction"
import { purchasePlanGetAll } from "@/constans";

export const getSoldPlans = async () => {
    const solds = await getsActions(purchasePlanGetAll)
    return solds;
}