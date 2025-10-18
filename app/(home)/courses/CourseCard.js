import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/clients/globals/Heading";
import CoursePreview from "@/components/courseActions/CoursePreview";
import { Clock, Star } from "lucide-react"; // ⏱ duration এর icon

export default function CourseCard({ course }) {
    return (
        <Card
            className="rounded-2xl shadow-md hover:shadow-xl transition w-full"
        >
            <div className={"w-full p-2 border text-center"}>
                {
                    course.courseType !== "subAdmin" ? "শিক্ষার্থীদের জন্য" : "সাব এডমিনের জন্য"
                }
            </div>
            <CardHeader>

                <CardTitle className="text-lg font-semibold">
                    <div className=" flex items-center justify-between flex-wrap">
                        <div className=" flex items-center gap-2 text-blue-600">
                            <span>
                                <Star size={20} />
                            </span>
                            {course.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span>সময়কালঃ {course.duration} মাস</span>
                        </div>
                    </div>
                    <div className={`my-2 text-sm font-semibold flex items-center gap-2`}>
                        কোর্সের ধরনঃ {
                            course?.offerPrice <= 0 ? <p className="text-blue-500">ফ্রী</p> : <p className=" text-red-500">
                                প্রিমিয়াম
                            </p>
                        }
                    </div>

                    <p className=" my-2">
                        {course.title}
                    </p>



                </CardTitle>


                <p className="text-sm text-gray-600 font-bold underline mt-3">
                    যে বিষয়গুলোর উপর পরিক্ষা হবেঃ
                </p>
                <ul className="ml-4 list-disc">
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

                <CoursePreview courseId={course._id} />
            </CardContent>
        </Card>
    )
}
