import PageBanner from '@/utils/PageBanner';
import React from 'react';
import NoData from '@/utils/NoData';
import { getAllQuestions } from '@/app/apiActions/questions';
import QuestionCard from './QuestionCard';

export default async function ExamPage() {

    const { status, data } = await getAllQuestions();

    if (!status || status !== 200 || !data || data.length <= 0) {
        return <NoData text={"কোন প্রশ্ন পাওয়া যায়নি !"} />
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Banner */}
            <PageBanner text="নিজেকে যাচাই করুন" />

            {/* Questions Section */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-[#1e708a] pl-3">📚 পরীক্ষার তালিকা</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((exam, index) => (
                        <QuestionCard key={index}
                            exam={exam}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
