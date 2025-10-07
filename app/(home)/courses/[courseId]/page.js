import { getSignleCourse } from '@/app/apiActions/Course';
import React from 'react'
import NoData from '@/utils/NoData';
import CoursePurchaseButton from '@/components/courseActions/CoursePurchase';
import SubAdminCoursePurchaseButton from '@/components/courseActions/SubAdminPurchaseCourse';

//  course Details
export default async function CoursePreview({ params }) {

    const { courseId } = await params

    const { status, data: course } = await getSignleCourse(courseId);


    if (status !== 200 || !course) {
        return <NoData />
    }

    return (
        <div className=" bg-gray-50 rounded-md md:p-10 my-10 mx-4 md:mx-10 p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left side - course details */}
            <div className="md:col-span-2 space-y-6 md:border-r">
                {/* Title */}
                <h1 className=" text-[24px] text-center md:text-3xl font-bold">{course.title}</h1>
                <div>
                    <h3 className=' color2 text-lg font-bold my-2 underline '>যেসব বিষয়ের উপর পরিক্ষা নেওয়া হবেঃ</h3>
                    <ul className="text-gray-600 ml-3 list-disc">
                        {course.shortDesc &&
                            course.shortDesc.split(",").map((item, index) => (
                                <li key={index}> {item}</li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h3 className=' color2 text-lg font-bold my-2 underline '>
                        বিস্তারিতঃ
                    </h3>
                    {/* <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                        {course.description}
                    </p> */}
                    <ul className="text-gray-600 ml-3 list-disc">
                        {course.description &&
                            course.description.split(",").map((item, index) => (
                                <li key={index}> {item}</li>
                            ))
                        }
                    </ul>
                </div>


                {/* Useful Links */}
                <div>
                    <h3 className='color2 text-lg font-bold my-2 underline'> কোর্সের সাথে যা যা আক্সেস পাবেন </h3>
                    <ul className="list-disc list-inside text-blue-600 space-y-1">
                        {course.links.map((link) => (
                            <li key={link._id}>

                                {link.itemName || "N/A"}

                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right side - order/summary card */}
            <div className="md:col-span-1">
                <div className="p-6 rounded-2xl shadow-lg bg-white sticky top-20 space-y-4">
                    <div className={"w-full p-2 border text-center"}>
                        {
                            course.courseType !== "subAdmin" ? "শিক্ষার্থীদের জন্য" : "সাব এডমিনের জন্য"
                        }
                    </div>
                    <h2 className="text-xl font-bold">অর্ডার সারসংক্ষেপ</h2>

                    <div className="flex justify-between text-gray-700">
                        <span>রেগুলার মূল্য</span>
                        <span className="line-through">{course.regularPrice} ৳</span>
                    </div>

                    <div className="flex justify-between text-gray-700">
                        <span>অফার মূল্য</span>
                        <span className="font-semibold text-green-600">
                            {course.offerPrice} ৳
                        </span>
                    </div>

                    <div className="border-t pt-4 flex justify-between text-lg font-bold">
                        <span>মোট</span>
                        <span>{course.offerPrice} ৳</span>
                    </div>

                    {
                        course.courseType !== "student" ?
                            <SubAdminCoursePurchaseButton
                                courseId={course._id}
                            />
                            :
                            <CoursePurchaseButton
                                courseId={course._id}
                            />

                    }
                </div>
            </div>
        </div>
    );
}