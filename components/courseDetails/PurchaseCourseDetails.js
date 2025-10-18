import Link from "next/link";
import React from "react";

export default function PurchaseCourseDetails({ courseData = [], viewQuestions = false }) {
    if (!courseData || courseData.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                কোনো কোর্স পাওয়া যায়নি।
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 grid gap-6">
            {courseData.map((course) => (
                <div
                    key={course._id}
                    className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition-all"
                >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{course.name}</h2>
                        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                            <span className="text-xl font-semibold text-green-600">
                                ৳{course.offerPrice}
                            </span>
                            <span className="text-gray-400 line-through ml-2">
                                ৳{course.regularPrice}
                            </span>
                            {/* Questions Button */}
                            {
                                viewQuestions &&
                                <Link
                                    href={`/profile/exam/${course._id}`}
                                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    প্রশ্ন দেখুন
                                </Link>}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        {course.title}
                    </h3>

                    {/* Short Description */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">সংক্ষিপ্ত বিবরণ:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {course.shortDesc
                                ?.split(",")
                                .map((item, index) => (
                                    <li key={index}>{item.trim()}</li>
                                ))}
                        </ul>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">বিস্তারিত:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {course.description
                                ?.split(",")
                                .map((item, index) => (
                                    <li key={index}>{item.trim()}</li>
                                ))}
                        </ul>
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-wrap justify-between items-center border-t pt-4 text-sm text-gray-600">
                        <p>সময়কাল: {course.duration} মাস</p>
                        <p>
                            তৈরি: {new Date(course.createdAt).toLocaleDateString("bn-BD")}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
