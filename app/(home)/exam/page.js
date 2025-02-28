import PageBanner from '@/utils/PageBanner';
import React from 'react';
import ExamAction from './ExamAction';

export default function ExamPage() {
    const exams = Array.from({ length: 8 }, (_, index) => ({
        _id: index + 1,
        title: `পরীক্ষা ${index + 1}`,
        subject: ["গণিত", "ইংরেজি", "বাংলা", "সাধারণ জ্ঞান", "চাকরি প্রস্তুতি"][index % 5],
        totalQuestions: Math.floor(Math.random() * 50) + 10, // 10-50 র্যান্ডম প্রশ্ন
        participants: Math.floor(Math.random() * 500) + 100, // 100-500 র্যান্ডম অংশগ্রহণকারী
        type: ["MCQ", "লিখিত", "উভয়ই"][index % 3]
    }));



    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Banner */}
            <PageBanner text="নিজেকে যাচাই করুন" />

            {/* Questions Section */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
                <ExamAction />
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-[#1e708a] pl-3">📚 পরীক্ষার তালিকা</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.map((exam) => (
                        <div key={exam._id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">📝 বিষয়: <span className="font-medium">{exam.subject}</span></p>
                            <p className="text-gray-600 text-sm">📊 মোট প্রশ্ন: <span className="font-medium">{exam.totalQuestions}</span></p>
                            <p className="text-gray-600 text-sm">👥 অংশগ্রহণকারী: <span className="font-medium">{exam.participants}</span></p>
                            <p className="text-gray-600 text-sm">🔍 প্রশ্ন ধরন: <span className="font-medium">{exam.type}</span></p>

                            <button className="mt-4 px-4 py-2 bg1 text-white rounded-lg text-sm hover:bg2 hover:text-black transition">
                                পরীক্ষা দিন
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
