import { getsActions } from "@/actions/admins/getsAction"
import { resultGetAll } from "@/constans"

//  get all results (admin)
export const getAllResults = async () => {
    const resulls = await getsActions(resultGetAll)

    return resulls
}