import { getsActions } from "@/actions/users/getActions"
import { courseGetAll, courseGetSingle } from "@/constans";

//  all course for admin and user without token
export const getAllCourse = async () => {
    const courses = await getsActions(courseGetAll);
    return courses;
};

//  get single Course
export const getSignleCourse = async (courseId) => {
    const course = await getsActions(courseGetSingle + courseId);
    return course;
}