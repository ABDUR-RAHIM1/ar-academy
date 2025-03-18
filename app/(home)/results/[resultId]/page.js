import { getResultById } from '@/app/apiActions/admin/adminApi';
import NoData from '@/utils/NoData';
import React from 'react'

export default async function ResultDeatils({ params }) {
    const { resultId } = await params;
    const { status, data } = await getResultById(resultId);

    if (!status || !data) {
        return <NoData text={"result not found"} />
    }

    return (
        <div className=" my-10 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">রেজাল্ট শীট</h1>

            <div className="space-y-4">
                {data.results.map((result, index) => (
                    <div
                        key={result.ID}
                        className={`p-4 border rounded-lg ${result.status === 'correct' ? 'bg-green-100' : result.status === 'skipped' ? 'bg-gray-100' : 'bg-red-100'}`}
                    >
                        <div className="flex justify-between items-center">
                            <span className=" text-[17px] md:text-xl font-semibold">Q{index + 1}: {result.Question}</span>
                            <span className={`text-sm font-bold ${result.status === 'correct' ? 'text-green-600' : result.status === 'skipped' ? 'text-gray-600' : 'text-red-600'}`}>
                                {result.status === 'correct' ? 'সঠিক' : result.status === 'skipped' ? 'স্কিপ' : 'ভুল'}
                            </span>
                        </div>

                        <div className="mt-2">
                            <div className="flex justify-around flex-wrap gap-3">
                                <div className='w-[48%] sm:w-auto text-center'>
                                    <span className={` text-center px-3 py-1 rounded-full ${result.selectAns === result.Option1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                        {result.Option1}
                                        {result.selectAns === result.Option1 && (
                                            <span className="ml-2 text-xs text-white">Selected</span>
                                        )}
                                    </span>
                                </div>
                                <div className='w-[48%] sm:w-auto text-center'>
                                    <span className={` text-center px-3 py-1 rounded-full ${result.selectAns === result.Option2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                        {result.Option2}
                                        {result.selectAns === result.Option2 && (
                                            <span className="ml-2 text-xs text-white">Selected</span>
                                        )}
                                    </span>
                                </div>
                                <div className='w-[48%] sm:w-auto text-center'>
                                    <span className={` text-center px-3 py-1 rounded-full ${result.selectAns === result.Option3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                        {result.Option3}
                                        {result.selectAns === result.Option3 && (
                                            <span className="ml-2 text-xs text-white">Selected</span>
                                        )}
                                    </span>
                                </div>
                                <div className='w-[48%] sm:w-auto text-center'>
                                    <span className={`text-center px-3 py-1 rounded-full ${result.selectAns === result.Option4 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                        {result.Option4}
                                        {result.selectAns === result.Option4 && (
                                            <span className="ml-2 text-xs text-white">Selected</span>
                                        )}
                                    </span>
                                </div>

                            </div>


                            <div className="mt-4 text-sm text-gray-600">
                                <p><strong>আপনার নির্বাচিত উত্তর:</strong> {result.selectAns}</p>
                                <p><strong>সঠিক উতর:</strong> {result.CorrectAnswer}</p>
                                <p><strong>ব্যাখ্যা:</strong> {result.Clearance}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}