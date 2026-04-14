import { getAllCourse } from "@/app/apiActions/Course";
import NoData from "@/utils/NoData"; 
import Heading from "@/components/clients/globals/Heading"; 
import CourseCard from "./CourseCard";

export async function generateMetadata() {
    return {
        title: "আমাদের কোর্সসমূহ | Onushilon Academy",
        description: "অনুশীলন একাডেমির সকল প্রিমিয়াম এবং ফ্রি কোর্সগুলো এখানে দেখুন। আপনার দক্ষতা বৃদ্ধিতে আমরা আছি আপনার পাশে।",
        openGraph: {
            title: "আমাদের কোর্সসমূহ - Onushilon Academy",
            description: "সেরা সব অনলাইন কোর্স নিয়ে সাজানো আমাদের প্ল্যাটফর্ম।",
            type: "website",
        },
    };
}

export default async function Courses() {

    const { status, data } = await getAllCourse()


    if (status !== 200 || !data) {
        return <NoData text={"কোন কোর্স পাওয়া যায়নি!"} />
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Heading text={"আমাদের কোর্সসমূহ"} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  gap-6">
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
