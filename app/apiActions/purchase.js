import { fetchActionAdmin } from "@/actions/admins/getsAction";
import { getsActionSubAdmin } from "@/actions/subAdmins/getsActionSubAdmin";
import { getsActions } from "@/actions/users/getActions"
import { courseGetByStudent, courseGetBySubAdmin, packagePurchedGetAll, purchaseCourseGetAll } from "@/constans"


// admin/ modaretor sib gulo purched course dekhte parbe;
export const getAllPurchased = async () => {
    const purchased = await fetchActionAdmin(purchaseCourseGetAll);
    return purchased;
}


// admin/ modaretor sib gulo purched course dekhte parbe;
export const getAllPurchasedPackages = async () => {
    const purchasedPackages = await fetchActionAdmin(packagePurchedGetAll);
    return purchasedPackages;
}



//  student/ user je course kinbe segulo 
export const getMyPurchaseCourse = async () => {
    const purchase = await getsActions(courseGetByStudent);
    return purchase
};



//  sub admin je course create korbe segulo 
export const getMyCreatedCourseBySubAdmin = async () => {
    const purchase = await getsActionSubAdmin(courseGetBySubAdmin);
    return purchase
}