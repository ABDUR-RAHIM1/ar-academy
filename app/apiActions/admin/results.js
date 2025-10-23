import { getsActions } from "@/actions/admins/getsAction"
import { getsActionSubAdmin } from "@/actions/subAdmins/getsActionSubAdmin"
import { resultGetAll, resultGetAllSubAdmin } from "@/constans"

//  get all results (admin)
export const getAllResults = async () => {
    const resulls = await getsActions(resultGetAll)

    return resulls
}

//  subAdmin students result 
export const getAllResultsBySubAdmin = async () => {
    const resulls = await getsActionSubAdmin(resultGetAllSubAdmin)

    return resulls
}
