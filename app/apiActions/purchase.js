import { getsActionSubAdmin } from "@/actions/subAdmins/getsActionSubAdmin";
import { getsActions } from "@/actions/users/getActions"
import { courseGetByStudent, courseGetBySubAdmin } from "@/constans"


export const getMyPurchaseCourse = async () => {
    const purchase = await getsActions(courseGetByStudent);
    return purchase
};


export const getMyCreatedCourseBySubAdmin = async () => {
    const purchase = await getsActionSubAdmin(courseGetBySubAdmin);
    return purchase
}