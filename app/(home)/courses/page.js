import { getAllCourse } from "@/app/apiActions/Course";
import NoData from "@/utils/NoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/clients/globals/Heading";
import CoursePreview from "@/components/courseActions/CoursePreview";
import { Clock, Star } from "lucide-react"; // ⏱ duration এর icon
import CourseCard from "./CourseCard";

export default async function Courses() {

    const { status, data } = await getAllCourse()


    if (status !== 200 || !data) {
        return <NoData text={"কোন কোর্স পাওয়া যায়নি!"} />
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Heading text={"আমাদের কোর্সসমূহ"} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                {data.map((course) => (
                    <CourseCard
                        key={course._id}
                        course={course}
                    />
                ))}
            </div>
        </div>
    );
}
