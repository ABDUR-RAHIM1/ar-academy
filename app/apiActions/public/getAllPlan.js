import { getsActions } from "@/actions/users/getActions"
import { getAllPlan } from "@/constans"


export const getAllPlans = async () => {
    const plans = await getsActions(getAllPlan);

    return plans
}