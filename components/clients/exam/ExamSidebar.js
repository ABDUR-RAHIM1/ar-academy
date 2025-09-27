import { getReletedQuestionsByCourseName } from '@/app/apiActions/questions';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function ExamSidebar({ data }) {



    const { status, data: matchData } = await getReletedQuestionsByCourseName(data?.subjectName);



    return (
        <aside className=" w-full md:flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="font-bold text-2xl italic uppercase border-b border-indigo-400 pb-3 mb-6 text-indigo-700">
                Related Questions
            </h3>

            {matchData.length === 0 || status !== 200 ? (
                <p className="text-gray-500 italic text-center">কোন প্রশ্ন পাওয়া যায়নি।</p>
            ) : (
                <ul className="space-y-5">
                    {matchData.map((q, index) => (
                        <li
                            key={q._id || index}
                            className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                            <Link
                                href={`/exam/${q.subjectName}/${q?.course?._id}`}
                            >
                                <div className="mb-2 text-indigo-600 font-semibold">
                                    <div className=' flex items-center gap-3'>
                                        <BookOpen className="w-6 h-6" />
                                        <h4 className="text-lg truncate font-medium">
                                            {q?.course?.name}
                                        </h4>
                                    </div>
                                    <p className=' text-sm'>
                                        {
                                            q?.course?.title
                                        }
                                    </p>
                                </div>
                                <p className="text-sm text-gray-600">
                                    বিষয়ঃ {q?.subjectName || 'সব'}
                                </p>
                            </Link>
                        </li>

                    ))}
                </ul>
            )}
        </aside>
    );
}