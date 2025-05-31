import React, { useState } from 'react';

export default function SolutionTable({ solutionTable }) {
    const [selectedSubject, setSelectedSubject] = useState('সব');

    // Unique subject list
    const subjects = ['সব', ...new Set(solutionTable.map(item => item.Subject))];

    // Filtered data
    const filteredQuestions = selectedSubject === 'সব'
        ? solutionTable
        : solutionTable.filter(item => item.Subject === selectedSubject);

    return (
        <div className="mt-4">
            {/* Subject Filter */}
            <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">বিষয় বেছে নিন:</label>
                <select
                    id="subject"
                    className="border p-2 rounded-md"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                >
                    {subjects.map((subject, idx) => (
                        <option key={idx} value={subject}>{subject}</option>
                    ))}
                </select>
                <span className='py-2 px-4 bg-gray-100 rounded-md mx-2'>
                    {filteredQuestions?.length}
                </span>
            </div>

            {/* Question List */}
            {filteredQuestions.length === 0 ? (
                <p className="text-gray-500">এই বিষয়ের অধীনে কোনো প্রশ্ন পাওয়া যায়নি।</p>
            ) : (
                <div className="space-y-6">
                    {filteredQuestions.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white border rounded-md shadow-sm flex justify-between flex-wrap group hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
                        >
                            {/* Left: Question & Options */}
                            <div className="w-full md:w-4/5">
                                <p className="font-medium mt-2 mb-2 underline group-hover:text-blue-500 transition-colors duration-200">
                                    <span className="mr-2">প্রশ্ন {item.ID} /</span>
                                    {item.Question}
                                </p>

                                <ul className="ml-4 space-y-1">
                                    <li>⏺ ক) {item.Option1}</li>
                                    <li>⏺ খ) {item.Option2}</li>
                                    <li>⏺ গ) {item.Option3}</li>
                                    {item.Option4 && <li>⏺ ঘ) {item.Option4}</li>}
                                </ul>

                                <p className="mt-2 font-medium color1">
                                    ✔️ সঠিক উত্তর: {item.CorrectAnswer}
                                </p>
                            </div>

                            {/* Right: Meta Info */}
                            <div className="w-full md:w-1/5 text-right mt-4 md:mt-0">
                                <p className="text-sm color2 italic group-hover:text-blue-500 transition-colors duration-200">
                                    বিষয়: {item?.Subject}
                                </p>
                                {item.Explanation ? (
                                    <p className="text-xs text-gray-400 mt-1 italic group-hover:text-gray-700">
                                       📝 ব্যাখ্যা : {item.Explanation}
                                    </p>
                                ) : (
                                    <p className="text-xs text-red-600 mt-1 italic">
                                        ব্যাখ্যা : আপডেট করা হচ্ছে
                                    </p>
                                )}
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}
