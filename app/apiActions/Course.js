import { getsActions } from "@/actions/users/getActions"
import { courseGetAll } from "@/constans";

//  all course for admin and user without token
export const getAllCourse = async () => {
    const courses = await getsActions(courseGetAll);
    return courses;
};