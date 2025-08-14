import { getsActions } from "@/actions/admins/getsAction"
import { subjectListGetAll, subjectListGetByQuery } from "@/constans";


//  get all public and admin 
export const getAllSubjectList = async () => {
    const subjectList = await getsActions(subjectListGetAll);
    return subjectList;
}

//  get subject by Query parameters (subjectID)
export const getSubjectByQuery = async (classId) => {
    const api = subjectListGetByQuery + classId;
     
    const subjects = await getsActions(api)
    return subjects;
}