import { getsActionSubAdmin } from "@/actions/subAdmins/getsActionSubAdmin"
import { subAdminStudentsAccount } from "@/constans"

export const getSubAdminStudentAccount = async () => {
    const subStudent = await getsActionSubAdmin(subAdminStudentsAccount);
    return subStudent;
}