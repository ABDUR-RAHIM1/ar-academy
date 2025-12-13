import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { TrophyIcon } from "lucide-react";

export default function PurchaseCourseDetails({ courseData = [], viewQuestions = false }) {
    if (!courseData || courseData.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                কোনো কোর্স পাওয়া যায়নি।
            </div>
        );
    }

    return (
        <div className=" w-full md:max-w-5xl mx-auto p-0 md:p-4 grid gap-6">
            {courseData.map((course) => (
                <div
                    key={course._id}
                    className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition-all"
                >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4 gap-3">

                        {/* Course Title */}
                        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
                            {course.name}
                        </h2>

                        {/* Buttons Container */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4">

                            {/* Questions Button */}
                            {viewQuestions && (
                                <Link
                                    href={`/profile/exam/${course._id}`}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition w-full sm:w-auto text-center"
                                >
                                    প্রশ্ন দেখুন
                                </Link>
                            )}

                            {/* Leaderboard Button */}
                            <Button
                                asChild
                                className="bg-blue-600 text-white w-full sm:w-auto"
                            >
                                <Link
                                    href={`/profile/leaderboard/${course._id}`}
                                    className="flex items-center justify-center gap-2 text-center"
                                >
                                    <TrophyIcon /> লিডারবোর্ড দেখুন
                                </Link>
                            </Button>
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
