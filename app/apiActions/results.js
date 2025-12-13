import { getsActions } from "@/actions/users/getActions"; 
import { resultDetails, resultMy } from "@/constans";


//  get single result for details  (for admin / users )
export const getResultById = async (resultId) => {
    const api = resultDetails + resultId
    const resposne = await getsActions(api , 0);

    return resposne;
}

//  exam result for users Profile (logged in users result)
export const getMyResultData = async () => {
    const myResults = await getsActions(resultMy, 0); 

    return myResults
}