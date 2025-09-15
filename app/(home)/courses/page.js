import { getAllCourse } from "@/app/apiActions/Course";
import NoData from "@/utils/NoData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Heading from "@/components/clients/globals/Heading";

export default async function Courses() {

    const { status, data } = await getAllCourse()

    if (status !== 200 || !data) {
        return <NoData text={"কোন কোর্স পাওয়া যায়নি!"} />
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Heading text={"আমাদের কোর্সসমূহ"} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((course) => (
                    <Card
                        key={course._id}
                        className="rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                {course.title}
                            </CardTitle>
                            <p className="text-sm text-gray-600 font-bold underline">
                                যে বিষয়গুলোর উপর পরিক্ষা হবেঃ 
                            </p>
                            <ul className={" ml-4 list-disc"}>
                                {
                                    course.shortDesc && course.shortDesc.split(",").map((item, index) => (
                                        <li key={index}>  
                                            {item} 
                                        </li>   
                                    ))  
                                }
                            </ul>
                        </CardHeader>

                        <CardContent>
                            <div className="mb-4">
                                <p className="text-red-500 line-through text-sm">
                                    {course.regularPrice > 0 && `${course.regularPrice} টাকা`}
                                </p>
                                <p className="text-xl font-bold color1">
                                    {course.offerPrice > 0 ? `${course.offerPrice} টাকা` : "ফ্রি"}
                                </p>
                            </div>

                            <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-500">কোর্স কিনুন</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}