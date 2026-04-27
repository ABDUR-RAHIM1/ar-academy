import { CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import React from 'react'

export default function McqResultDetails({mcqResultData}) {
    return (
        <div className="space-y-4">
            {mcqResultData.map((result, index) => (
                <div
                    key={result._id || index}
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
                                <p className="mt-1 ml-6 text-gray-800">{result.selectAns || "উত্তর দেননি"}</p>
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
    )
}
