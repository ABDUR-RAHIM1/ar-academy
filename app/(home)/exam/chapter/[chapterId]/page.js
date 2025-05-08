import { getQuestionByChapterId } from '@/app/apiActions/questions';
import React from 'react'
import QuestionCard from '../../QuestionCard';

export default async function ExamPageByChapter({ params }) {
    const { chapterId } = await params;
    const { status, data } = await getQuestionByChapterId(chapterId)

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-[#1e708a] pl-3">📚 পরীক্ষার তালিকা ( অধ্যায় ভিত্তিক ) </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    status !== 200 || data?.length === 0 ?
                        <h3 className=' text-2xl text-red-500 font-bold'>
                            {data.message || "not found"}
                        </h3>
                        :
                        data.map((exam, index) => (
                            <QuestionCard key={index}
                                exam={exam}
                                index={index}
                            />
                        ))}
            </div>
        </div>
    )
}
