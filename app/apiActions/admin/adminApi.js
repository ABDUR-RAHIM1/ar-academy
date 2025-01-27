
// admin api handlers

import { getsActions } from "@/actions/admins/getsAction"
import { chapters } from "@/constans"

// get all chapter without Contents for admin (dashboard/chapters/view)
export const getAllChapters = async () => {
    const resposne = await getsActions(chapters);

    return resposne;
}