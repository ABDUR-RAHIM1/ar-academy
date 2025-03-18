import PageBanner from '@/utils/PageBanner';
import React from 'react';
import { getAllQuestions } from '@/app/apiActions/client/clientApi';
import NoData from '@/utils/NoData';
import Link from 'next/link';

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
                        <div key={exam._id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
                            <div className='my-3 flex items-center justify-between flex-wrap'>
                                <h3 className="text-lg font-semibold text-gray-900"> প্রশ্ন নংঃ {index + 1}</h3>
                                <button className={` ${exam.sub_categorie.type === "free" ? "bg-green-600" : "bg-red-500"} px-3 py-1 text-sm rounded-md text-white font-bold`}>
                                    {exam.sub_categorie.type === "free" ? "ফ্রি" : "প্রিমিয়াম"}
                                </button>
                            </div>
                            <div className=' flex flex-col gap-2 text-gray-600 text-sm'>
                                <p>📝 বিষয়: <span className="font-medium">{exam.sub_categorie.sub_name}</span></p>
                                <p>📊 মোট প্রশ্ন: <span className="font-medium">{exam.questions?.length || 0}</span></p>

                                <p>👥 অংশগ্রহণকারী: <span className="font-medium">{Math.floor(Math.random() * 2000) + 800}</span></p>
                                <p>🔍 প্রশ্ন ধরন: <span className="font-medium">{"MCQ"}</span></p>

                            </div>
                            <Link href={`/exam/${exam.sub_categorie.identifier}/${exam._id}`} className=" inline-block mt-4 px-4 py-2 bg1 text-white rounded-lg text-sm hover:bg2 hover:text-black transition">
                                পরীক্ষা দিন
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
