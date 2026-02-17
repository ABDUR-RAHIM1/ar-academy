"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { TrophyIcon, ChevronDown, ChevronUp } from "lucide-react";

export default function PurchaseCourseDetails({
    courseData = [],
    path = "profile",
}) {
    const leaderboardRoute = path === "profile" ? "/profile" : "/subAdmin";

    const [openCourseId, setOpenCourseId] = useState(null);

    const toggleCourse = (id) => {
        setOpenCourseId((prev) => (prev === id ? null : id));
    };

    if (!courseData || courseData.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                কোনো কোর্স পাওয়া যায়নি।
            </div>
        );
    }

    return (
        <div className="w-full md:max-w-5xl mx-auto p-0 md:p-4 grid gap-6">
            {courseData.map((course) => {
                const isOpen = openCourseId === course._id;

                return (
                    <div
                        key={course._id}
                        className="bg-white shadow-md rounded-2xl border transition-all"
                    >
                        {/* ---------- HEADER ---------- */}
                        <div className="p-6">

                            {/* Top Row: Title + Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                {/* Course Title */}
                                <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
                                    {course.name}
                                </h2>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    {path === "profile" && (
                                        <Link
                                            href={`/profile/exam/${course._id}`}
                                            className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition text-center"
                                        >
                                            প্রশ্ন দেখুন
                                        </Link>
                                    )}

                                    <Button asChild className="bg-blue-600 text-white">
                                        <Link
                                            href={`${leaderboardRoute}/leaderboard/${course._id}`}
                                            className="flex items-center gap-2"
                                        >
                                            <TrophyIcon size={18} />
                                            লিডারবোর্ড
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Bottom: Toggle Button (Centered) */}
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={() => toggleCourse(course._id)}
                                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                                >
                                    {isOpen ? "লুকান" : "বিস্তারিত দেখুন"}
                                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                            </div>

                        </div>


                        {/* ---------- EXPANDABLE CONTENT ---------- */}
                        {isOpen && (
                            <div className="px-6 pb-6 border-t space-y-4">
                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {course.title}
                                </h3>

                                {/* Short Description */}
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        যে সকল বিষয়ের উপর পরীক্ষা নেওয়া হবে:
                                    </h4>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {course.shortDesc
                                            ?.split(",")
                                            .map((item, index) => (
                                                <li key={index}>{item.trim()}</li>
                                            ))}
                                    </ul>
                                </div>

                                {/* Description */}
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        বিস্তারিত:
                                    </h4>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {course.description
                                            ?.split(",")
                                            .map((item, index) => (
                                                <li key={index}>{item.trim()}</li>
                                            ))}
                                    </ul>
                                </div>

                                {/* Access Links */}
                                {
                                    course.links &&
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">
                                            যা যা এক্সেস পাবেন:
                                        </h4>
                                        <div className=" flex flex-col text-gray-700 space-y-1">
                                            {course.links?.map((item, index) => (
                                                <Link key={index}
                                                    href={item.path}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {item.itemName}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>}

                                {/* Footer */}
                                <div className="flex flex-wrap justify-between items-center border-t pt-4 text-sm text-gray-600">
                                    <p>সময়কাল: {course.duration} মাস</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
