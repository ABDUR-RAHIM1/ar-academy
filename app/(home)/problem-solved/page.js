"use client"
import React, { useState, useEffect } from "react";
import PageBanner from "@/utils/PageBanner";

export default function ProblemAndSolved() {
    const [searchTerm, setSearchTerm] = useState("");
    const [problems, setProblems] = useState([]); // State to avoid SSR mismatch

    useEffect(() => {
        const dummyData = Array.from({ length: 20 }, (_, index) => ({
            _id: index + 1,
            problem: `Problem No: ${index + 1}`,
            solution: [`Solution ${index + 1} - Point 1`, `Solution ${index + 1} - Point 2`],
            like: Array.from({ length: Math.floor(Math.random() * 10) }, () => "👍"),
            comment: Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => `Comment ${i + 1}`),
        }));

        setProblems(dummyData); // Set the state after mounting
    }, []);

    const filteredData = problems.filter((item) =>
        item.problem.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <PageBanner text="সমস্যা ও সমাধান" />

            <div className=" py-10 px-4 md:px-6 mt-4">
                {/* Search Input */}
                <div className="">
                    <input
                        type="text"
                        placeholder="Search problem..."
                        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Problems List */}
                <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((item) => (
                        <div key={item._id} className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
                            {/* Problem Title */}
                            <h3 className="text-lg font-semibold text-gray-800">{item.problem}</h3>

                            {/* Solutions */}
                            <ul className="mt-2 text-gray-600 text-sm">
                                {item.solution.map((sol, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        ✅ {sol}
                                    </li>
                                ))}
                            </ul>

                            {/* Like & Comment Section */}
                            <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                                <div className="flex items-center gap-1">
                                    👍 {item.like.length} Likes
                                </div>
                                <div className="flex items-center gap-1">
                                    💬 {item.comment.length} Comments
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
