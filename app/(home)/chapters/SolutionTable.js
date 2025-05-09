import React, { useState } from 'react';

export default function SolutionTable({ solutionTable }) {
    const [selectedSubject, setSelectedSubject] = useState('সব');

    // Unique subject list
    const subjects = ['সব', ...new Set(solutionTable.map(item => item.subject))];

    // Filtered data
    const filteredQuestions = selectedSubject === 'সব'
        ? solutionTable
        : solutionTable.filter(item => item.subject === selectedSubject);

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
                <span className=' py-2 px-4 bg-gray-100 rounded-md mx-2'>
                    {filteredQuestions?.length}
                </span>
            </div>

            {/* Question List */}
            {filteredQuestions.length === 0 ? (
                <p className="text-gray-500">এই বিষয়ের অধীনে কোনো প্রশ্ন পাওয়া যায়নি।</p>
            ) : (
                <div className="space-y-6">
                    {filteredQuestions.map((item, index) => (
                        <div key={index} className="p-4 bg-white border rounded-md shadow-sm flex justify-between flex-wrap">
                            {/* Left: Question & Options */}
                            <div className="w-full md:w-4/5">
                                <p className="font-medium mt-2 mb-2">{item.Question}</p>

                                <ul className="ml-4 space-y-1">
                                    <li>ক) {item.Option1}</li>
                                    <li>খ) {item.Option2}</li>
                                    <li>গ) {item.Option3}</li>
                                    {item.Option4 && <li>ঘ) {item.Option4}</li>}
                                </ul>

                                <p className="mt-2 font-medium text-green-700">
                                    ✅ সঠিক উত্তর: {item.CorrectAnswer}
                                </p>
                            </div>

                            {/* Right: Meta Info */}
                            <div className="w-full md:w-1/5 text-right mt-4 md:mt-0">
                                <p className="font-semibold text-lg">প্রশ্ন {item.ID}</p>
                                <p className="text-sm text-gray-500 italic">বিষয়: {item.subject}</p>
                                {item.Clearance && (
                                    <p className="text-xs text-gray-400 mt-1 italic">Clearence: {item.Clearance}</p>
                                )}
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}
