

import { getResultById } from '@/app/apiActions/results';
import { resultMetaData } from '@/seo/resultMetadata';
import NoData from '@/utils/NoData';
import { CalendarDays, AlarmClock, CheckCircle, XCircle, SkipForward, ListChecks, BookOpenText, HelpCircle } from 'lucide-react';
import React from 'react'; 

export const metadata = resultMetaData

export default async function ResultDeatils({ params }) {
    const { resultId } = await params;
    const { status, data } = await getResultById(resultId);

    if (!status || !data) {
        return <NoData text={" কোনও রেজাল্ট পাওয়া যায়নি"} />;
    }

    return (
        <div className='bg-gradient-to-b from-indigo-50 via-indigo-100 to-white min-h-screen overflow-hidden'>
            <div id="result-section" className="my-10 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6">রেজাল্ট শীট</h1>
 

                {/* Exam Info Section */}
                <div className="mb-8 border border-gray-200 rounded-lg p-6 shadow-md bg-white">
                    <h2 className="text-xl font-semibold text-center text-indigo-700 mb-6 border-b pb-2 flex justify-center items-center gap-2">
                        <ListChecks className="w-5 h-5" /> পরীক্ষার তথ্য
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[15px] text-gray-800">
                        {data.examInfo?.isAll ? (
                            <div className="bg-indigo-50 px-4 py-2 rounded shadow-sm border border-indigo-100">
                                <strong className="text-indigo-700 flex items-center gap-2"><BookOpenText className="w-4 h-4" /> বিষয়:</strong> {data.examInfo.isAllTitle || "N/A"}
                            </div>
                        ) : (
                            <>
                                <div className="bg-indigo-50 px-4 py-2 rounded shadow-sm border border-indigo-100">
                                    <strong className="text-indigo-700 flex items-center gap-2"><BookOpenText className="w-4 h-4" /> বিষয়:</strong> {data.examInfo?.sub_categorie?.sub_name || "N/A"}
                                </div>
                                <div className="bg-violet-50 px-4 py-2 rounded shadow-sm border border-violet-100">
                                    <strong className="text-violet-700 flex items-center gap-2"><HelpCircle className="w-4 h-4" /> অধ্যায়:</strong> {data.examInfo?.chapter?.chapter_name || "N/A"}
                                </div>
                            </>
                        )}

                        <div className="bg-blue-50 px-4 py-2 rounded shadow-sm border border-blue-100">
                            <strong className="text-blue-700 flex items-center gap-2"><ListChecks className="w-4 h-4" /> মোট প্রশ্ন:</strong> {data.results?.length || 0} টি
                        </div>

                        <div className="bg-green-50 px-4 py-2 rounded shadow-sm border border-green-100">
                            <strong className="text-green-700 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> সঠিক উত্তর:</strong> {data?.correctAns} টি
                        </div>

                        <div className="bg-red-50 px-4 py-2 rounded shadow-sm border border-red-100">
                            <strong className="text-red-700 flex items-center gap-2"><XCircle className="w-4 h-4" /> ভুল উত্তর:</strong> {data?.wrongAns} টি
                        </div>

                        <div className="bg-yellow-50 px-4 py-2 rounded shadow-sm border border-yellow-100">
                            <strong className="text-yellow-700 flex items-center gap-2"><SkipForward className="w-4 h-4" /> স্কিপ:</strong> {data?.skip} টি
                        </div>

                        <div className="bg-gray-50 px-4 py-2 rounded shadow-sm border border-gray-100">
                            <strong className="text-gray-700 flex items-center gap-2"><CalendarDays className="w-4 h-4" /> পরীক্ষার তারিখ:</strong> {new Date(data.createdAt).toLocaleDateString('bn-BD')}
                        </div>

                        <div className="bg-blue-50 px-4 py-2 rounded shadow-sm border border-blue-100">
                            <strong className="text-blue-700 flex items-center gap-2"><AlarmClock className="w-4 h-4" /> মোট সময়:</strong> {data.examInfo?.duration} মিনিট
                        </div>

                        <div className="bg-green-50 px-4 py-2 rounded shadow-sm border border-green-100">
                            <strong className="text-green-700 flex items-center gap-2"><AlarmClock className="w-4 h-4" /> ব্যবহৃত সময়:</strong> {data.examInfo?.usedTime}
                        </div>
                    </div>
                </div>

                {/* Result Details */}
                <div className="space-y-4">
                    {data.results.map((result, index) => (
                        <div
                            key={result.ID}
                            className={`p-4 border rounded-lg ${result.status === 'correct' ? 'bg-green-50' : result.status === 'skipped' ? 'bg-gray-50' : 'bg-red-50'}`}
                        >
                            <div className="flex justify-between items-center flex-wrap gap-2">
                                <span className="text-[17px] md:text-xl font-semibold">Q{index + 1}: {result.Question}</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.status === 'correct' ? 'bg-green-200 text-green-800' :
                                    result.status === 'skipped' ? 'bg-gray-200 text-gray-800' :
                                        'bg-red-200 text-red-800'
                                    }`}>
                                    {result.status === 'correct' ? '✔️ সঠিক' : result.status === 'skipped' ? '⏭️ স্কিপ' : '❌ ভুল'}
                                </span>
                            </div>

                            <div className="mt-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[1, 2, 3, 4].map((num) => {
                                        const option = result[`Option${num}`];
                                        const isSelected = result.selectAns === option;
                                        const isCorrect = result.CorrectAnswer === option;

                                        let bgColor = 'bg-gray-200 text-gray-800';
                                        if (isSelected && isCorrect) bgColor = 'bg-green-500 text-white';
                                        else if (isSelected && !isCorrect) bgColor = 'bg-red-400 text-white';
                                        else if (!isSelected && isCorrect) bgColor = 'bg-blue-100 text-blue-700';

                                        return (
                                            <div key={num} className="w-full">
                                                <span className={`block text-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${bgColor}`}>
                                                    {isSelected && (
                                                        isCorrect
                                                            ? <CheckCircle className="inline-block w-4 h-4 mr-1 text-white" />
                                                            : <XCircle className="inline-block w-4 h-4 mr-1 text-white" />
                                                    )}
                                                    {option}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 space-y-3 text-sm">

                                    {/* Selected Answer */}
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                                        <p className="font-semibold text-yellow-700 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" /> আপনার নির্বাচিত উত্তর:
                                        </p>
                                        <p className="mt-1 ml-6 text-gray-800">{result.selectAns || "N/A"}</p>
                                    </div>

                                    {/* Correct Answer */}
                                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                                        <p className="font-semibold text-green-700 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" /> সঠিক উত্তর:
                                        </p>
                                        <p className="mt-1 ml-6 text-gray-800">{result.CorrectAnswer || "N/A"}</p>
                                    </div>

                                    {/* Explanation */}
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                                        <p className="font-semibold text-blue-700 flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4" /> ব্যাখ্যা:
                                        </p>
                                        <p className="mt-1 ml-6 text-gray-800">{result.Explanation || "N/A"}</p>
                                    </div>

                                </div>


                                <div className="text-right mt-2">
                                    <small className="text-gray-500">{result.Subject || "N/A"}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
