import { getsActions } from "@/actions/users/getActions";
import { resultGetAll, resultDetails, resultMy } from "@/constans";


//  get all results (admin)
export const getAllResults = async () => {
    const resulls = await getsActions(resultGetAll)

    return resulls
}

//  get single result for details  (for admin / users )
export const getResultById = async (resultId) => {
    const api = resultDetails + resultId
    const resposne = await getsActions(api);

    return resposne;
}

//  exam result for users Profile (logged in users result)
export const getMyResultData = async (cacheTime = 0) => {
    const myResults = await getsActions(resultMy, cacheTime);

    return myResults
}