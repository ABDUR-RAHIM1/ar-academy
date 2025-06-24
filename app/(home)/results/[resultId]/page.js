
import { getResultById } from '@/app/apiActions/results';
import NoData from '@/utils/NoData';
import React from 'react'


export const metadata = {
    title: "Results",
};


export default async function ResultDeatils({ params }) {
    const { resultId } = await params;
    const { status, data } = await getResultById(resultId);

    if (!status || !data) {
        return <NoData text={" কোন রেজাল্ট পাওয়া যায়নি"} />
    }


    return (
        <div className='bg-gradient-to-b from-indigo-50 via-indigo-100 to-white min-h-screen overflow-hidden'>

            <div className=" my-10 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6">রেজাল্ট শীট</h1>

                {/* Exam Info Section */}
                <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                    <h2 className="text-xl font-semibold text-center text-indigo-700 mb-6 border-b pb-2">📋 পরীক্ষার তথ্য</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[15px] text-gray-800">

                        {/* Subject & Chapter */}
                        {data.examInfo?.isAll ? (
                            <div className="bg-indigo-50 px-4 py-2 rounded shadow-sm border border-indigo-100">
                                <strong className="text-indigo-700">বিষয়:</strong> {data.examInfo.isAllTitle || "N/A"}


                            </div>
                        ) : (
                            <>
                                <div className="bg-indigo-50 px-4 py-2 rounded shadow-sm border border-indigo-100">
                                    <strong className="text-indigo-700">বিষয়:</strong> {data.examInfo?.sub_categorie?.sub_name || "N/A"}
                                </div>
                                <div className="bg-violet-50 px-4 py-2 rounded shadow-sm border border-violet-100">
                                    <strong className="text-violet-700">অধ্যায়:</strong> {data.examInfo?.chapter?.chapter_name || "N/A"}
                                </div>
                            </>
                        )}

                        {/* Total Questions */}
                        <div className="bg-blue-50 px-4 py-2 rounded shadow-sm border border-blue-100">
                            <strong className="text-blue-700">মোট প্রশ্ন:</strong> {data.results?.length || 0} টি
                        </div>

                        {/* Correct */}
                        <div className="bg-green-50 px-4 py-2 rounded shadow-sm border border-green-100">
                            <strong className="text-green-700">✅ সঠিক উত্তর:</strong> {data?.correctAns} টি
                        </div>

                        {/* Wrong */}
                        <div className="bg-red-50 px-4 py-2 rounded shadow-sm border border-red-100">
                            <strong className="text-red-700">❌ ভুল উত্তর:</strong> {data?.wrongAns} টি
                        </div>

                        {/* Skipped */}
                        <div className="bg-yellow-50 px-4 py-2 rounded shadow-sm border border-yellow-100">
                            <strong className="text-yellow-700">⏭️ স্কিপ:</strong> {data?.skip} টি
                        </div>

                        {/* Date */}
                        <div className="bg-gray-50 px-4 py-2 rounded shadow-sm border border-gray-100">
                            <strong className="text-gray-700">📅 পরীক্ষার তারিখ:</strong> {new Date(data.createdAt).toLocaleDateString('bn-BD')}
                        </div>

                        {/* Total Duration */}
                        <div className="bg-blue-50 px-4 py-2 rounded shadow-sm border border-blue-100">
                            <strong className="text-blue-700">⏱️ মোট সময়:</strong> {data.examInfo?.duration} মিনিট
                        </div>

                        {/* Used Time */}
                        <div className="bg-green-50 px-4 py-2 rounded shadow-sm border border-green-100">
                            <strong className="text-green-700">✅ ব্যবহৃত সময়:</strong> {data.examInfo?.usedTime}
                        </div>
                    </div>
                </div>




                <div className="space-y-4">
                    {data.results.map((result, index) => (
                        <div
                            key={result.ID}
                            className={`p-4 border rounded-lg ${result.status === 'correct' ? 'bg-green-100' : result.status === 'skipped' ? 'bg-gray-100' : 'bg-red-100'}`}
                        >
                            <div className="flex justify-between items-center">
                                <span className=" text-[17px] md:text-xl font-semibold">Q{index + 1}: {result.Question}</span>
                                <span className={`text-sm font-bold ${result.status === 'correct' ? 'text-green-600' : result.status === 'skipped' ? 'text-gray-600' : 'text-red-600'}`}>
                                    {result.status === 'correct' ? '✔️ সঠিক' : result.status === 'skipped' ? '⏭️ স্কিপ' : '❌ ভুল'}
                                </span>
                            </div>

                            <div className="mt-2">
                                <div className="flex justify-around flex-wrap gap-3">
                                    <div className='w-[48%] sm:w-auto text-center'>
                                        <span className={` text-center px-3 py-1 rounded-full ${result.selectAns === result.Option1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>

                                            {result.selectAns === result.Option1 && (
                                                <span className=" text-xs text-white">👉 </span>
                                            )}
                                            {result.Option1}

                                        </span>
                                    </div>
                                    <div className='w-[48%] sm:w-auto text-center'>
                                        <span className={` text-center px-3 py-1 rounded-full ${result.selectAns === result.Option2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>

                                            {result.selectAns === result.Option2 && (
                                                <span className=" text-xs text-white">👉 </span>
                                            )}

                                            {result.Option2}

                                        </span>
                                    </div>
                                    <div className='w-[48%] sm:w-auto text-center'>
                                        <span className={` text-center px-3 py-1 rounded-full ${result.selectAns === result.Option3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>

                                            {result.selectAns === result.Option3 && (
                                                <span className="text-xs text-white">👉  </span>
                                            )}

                                            {result.Option3}
                                        </span>
                                    </div>
                                    <div className='w-[48%] sm:w-auto text-center flex items-center'>
                                        <span className={`text-center px-3 py-1 rounded-full ${result.selectAns === result.Option4 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>

                                            {result.selectAns === result.Option4 && (
                                                <span className=" text-xs text-white">👉  </span>
                                            )}

                                            {result.Option4}
                                        </span>
                                    </div>

                                </div>


                                <div className="mt-4 text-sm text-gray-600">
                                    <p><strong>আপনার নির্বাচিত উত্তর:</strong> {result.selectAns}</p>
                                    <p><strong>সঠিক উতর:</strong> {result.CorrectAnswer}</p>
                                    <p><strong>ব্যাখ্যা:</strong> {result.Explanation || "N/A"}</p>
                                </div>

                                <div className=" text-right">
                                    <small className=" text-gray-500 text-sm">
                                        {
                                            result.Subject || "N/A"
                                        }
                                    </small>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}