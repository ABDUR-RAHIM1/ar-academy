"use client"
import React, { useState } from 'react';
import { Youtube, FileText, FileDown } from 'lucide-react';

export default function SolutionTable({ solutionTable }) {
    const [selectedSubject, setSelectedSubject] = useState('সব');
    const [openAnswers, setOpenAnswers] = useState({}); // keyed by question ID

    // Unique subject list
    const subjects = ['সব', ...new Set(solutionTable.map(item => item.Subject))];

    // Filtered data
    const filteredQuestions = selectedSubject === 'সব'
        ? solutionTable
        : solutionTable.filter(item => item.Subject === selectedSubject);

    // Toggle answer visibility
    const toggleAnswer = (id) => {
        setOpenAnswers(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="mt-4 max-w-4xl mx-auto px-4">
            {/* Subject Filter */}
            <div className="mb-6 flex items-center gap-4 flex-wrap">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                    বিষয় বেছে নিন:
                </label>
                <select
                    id="subject"
                    className="border p-2 rounded-md"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                >
                    {subjects.map((subject, idx) => (
                        <option key={idx} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
                <span className="py-1 px-3 bg-gray-100 rounded-md text-gray-700 font-semibold">
                    মোট: {filteredQuestions.length}
                </span>
            </div>

            {/* Question List */}
            {filteredQuestions.length === 0 ? (
                <p className="text-gray-500">এই বিষয়ের অধীনে কোনো প্রশ্ন পাওয়া যায়নি।</p>
            ) : (
                <div className="space-y-6">
                    {filteredQuestions.map((item) => (
                        <div
                            key={item.ID}
                            className="p-5 bg-white border rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Question */}
                            <p className="font-semibold text-lg mb-3 underline text-gray-800">
                                প্রশ্ন {item.ID} / {item.Question}
                            </p>

                            {/* Options */}
                            <ul className="ml-4 space-y-1 text-gray-700">
                                <li>⏺ ক) {item.Option1}</li>
                                <li>⏺ খ) {item.Option2}</li>
                                <li>⏺ গ) {item.Option3}</li>
                                {item.Option4 && <li>⏺ ঘ) {item.Option4}</li>}
                            </ul>

                            {/* Toggle Answer Button */}
                            {/* <button
                                onClick={() => toggleAnswer(item.ID)}
                                className=" border px-2 py-1 rounded-md mt-4 text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                            >
                                {openAnswers[item.ID] ? '➖ উত্তর লুকাও' : '➕ উত্তর দেখাও'}
                            </button> */}

                            {/* Extra Reference Buttons (Always Shown) */}
                            <div className='mt-4 flex flex-wrap gap-3'>

                                {/* Detailed Explanation */}
                                <button
                                    onClick={() => toggleAnswer(item.ID)}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition"
                                >
                                    <FileText size={18} />
                                    বিস্তারিত ব্যাখ্যা
                                </button>


                                {/* YouTube Video */}
                                <button
                                    onClick={() => alert("এই প্রশ্নের জন্য কোন ভিডিও নেই")}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
                                >
                                    <Youtube size={18} />
                                    ভিডিও দেখুন
                                </button>

                                {/* PDF Download */}
                                <button
                                  onClick={() => alert("এই প্রশ্নের জন্য কোন PDF নেই")}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
                                >
                                    <FileDown size={18} />
                                    PDF ডাউনলোড
                                </button>
                            </div>

                            {/* Answer & Explanation */}
                            {openAnswers[item.ID] && (
                                <div className="mt-3 bg-blue-50 p-4 rounded-md border border-blue-200">
                                    <p className="font-semibold text-green-700">
                                        ✔️ সঠিক উত্তর: {item.CorrectAnswer}
                                    </p>
                                    {item.Explanation ? (
                                        <p className="mt-2 text-gray-700 leading-relaxed">
                                            <span className=' text-green-700 font-bold'>📝 ব্যাখ্যা: </span> {item.Explanation}
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-red-700 italic">
                                            <span className=' text-green-700 font-bold'>📝 ব্যাখ্যা: </span> আপডেট করা হচ্ছে
                                        </p>
                                    )}


                                </div>
                            )}

                            {/* Subject info */}
                            <p className="mt-4 text-sm italic text-gray-500 text-right">
                                বিষয়: {item.Subject}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
