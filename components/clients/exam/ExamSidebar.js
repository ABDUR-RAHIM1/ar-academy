import { getQuestionByChapterId, getQuestionsByIsAllTitle } from '@/app/apiActions/questions';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function ExamSidebar({ data }) {
    let relatedQuestions = [];
  

    if (!data.isAll) {
        relatedQuestions = await getQuestionByChapterId(data.chapter._id);
    } else {
        relatedQuestions = await getQuestionsByIsAllTitle(data.isAllTitle);
    }

    // যদি API থেকে data wrap থাকে তাহলে unwrap করতে পারো (depending on your API response)
    const questions = relatedQuestions?.data || relatedQuestions || [];

    return (
        <aside className=" w-full md:flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="font-bold text-2xl italic uppercase border-b border-indigo-400 pb-3 mb-6 text-indigo-700">
                Related Questions
            </h3>

            {questions.length === 0 ? (
                <p className="text-gray-500 italic text-center">কোন প্রশ্ন পাওয়া যায়নি।</p>
            ) : (
                <ul className="space-y-5">
                    {questions.map((q, index) => (
                        <li
                            key={q._id || index}
                            className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                            <Link
                                href={
                                    q.isAll
                                        ? `/exam/all-subject/${q._id}`
                                        : `/exam/${q.sub_categorie.identifier}/${q._id}`
                                }
                            >
                                <div className="flex items-center gap-3 mb-2 text-indigo-600 font-semibold">
                                    <BookOpen className="w-6 h-6" />
                                    <h4 className="text-lg truncate font-medium">
                                        {q.isAllTitle || (q.sub_categorie?.sub_name ?? "No Title")}
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    বিষয়ঃ {q.sub_categorie?.sub_name || 'সব'}
                                </p>
                                <p className="text-xs mt-1 text-gray-400">
                                    মোট প্রশ্ন: {q.questions ? q.questions.length : 'N/A'}
                                </p>
                            </Link>
                        </li>

                    ))}
                </ul>
            )}
        </aside>
    );
}