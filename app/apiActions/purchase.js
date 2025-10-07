import { getsActionSubAdmin } from "@/actions/subAdmins/getsActionSubAdmin";
import { getsActions } from "@/actions/users/getActions"
import { courseGetByStudent } from "@/constans"


export const getMyPurchaseCourse = async () => {
    const purchase = await getsActions(courseGetByStudent);
    return purchase
};


export const getMyPurchaseCourseBySubAdmin = async () => {
    const purchase = await getsActionSubAdmin(courseGetByStudent);
    return purchase
}