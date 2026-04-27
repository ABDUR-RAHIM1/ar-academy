"use client"
import React, { useState } from 'react';
import { Youtube, FileText, CheckCircle2, ListFilter } from 'lucide-react';

export default function SolutionTable({ solutionTable }) {
    const [selectedSubject, setSelectedSubject] = useState('সব');
    const [openAnswers, setOpenAnswers] = useState({});

    const subjects = ['সব', ...new Set(solutionTable.map(item => item.Subject))];

    const filteredQuestions = selectedSubject === 'সব'
        ? solutionTable
        : solutionTable.filter(item => item.Subject === selectedSubject);

    const toggleAnswer = (id) => {
        setOpenAnswers(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="mt-8 max-w-5xl mx-auto px-4 pb-12">
            {/* Header & Filter Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                        <ListFilter size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">প্রশ্ন ফিল্টার করুন</h3>
                        <p className="text-xs text-slate-500">বিষয় অনুযায়ী সমাধান দেখুন</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        className="bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all cursor-pointer"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        {subjects.map((subject, idx) => (
                            <option key={idx} value={subject}>{subject}</option>
                        ))}
                    </select>
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-indigo-200 shadow-lg">
                        মোট: {filteredQuestions.length}
                    </div>
                </div>
            </div>

            {/* Question List */}
            {filteredQuestions.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
                    <p className="text-slate-400 font-medium">এই বিষয়ের অধীনে কোনো প্রশ্ন পাওয়া যায়নি।</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredQuestions.map((item, index) => (
                        <div
                            key={item.ID}
                            className="group bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden"
                        >
                            <div className="p-6">
                                {/* Question Header */}
                                <div className="flex items-start gap-3 mb-5">
                                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <h2 className="font-bold text-lg text-slate-800 leading-snug pt-0.5">
                                        {item.Question}
                                    </h2>
                                </div>

                                {/* Options Grid - এক সারিতে ২টি করে */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                    {[
                                        { label: 'ক', text: item.Option1 },
                                        { label: 'খ', text: item.Option2 },
                                        { label: 'গ', text: item.Option3 },
                                        { label: 'ঘ', text: item.Option4 }
                                    ].map((opt, i) => opt.text && (
                                        <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-50 bg-slate-50/50 group-hover:bg-white group-hover:border-slate-100 transition-colors">
                                            <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                                {opt.label}
                                            </span>
                                            <span className="text-slate-700 text-[15px]">{opt.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-50">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleAnswer(item.ID)}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-bold shadow-md shadow-indigo-100 active:scale-95"
                                        >
                                            <FileText size={16} />
                                            {openAnswers[item.ID] ? "ব্যাখ্যা লুকান" : "বিস্তারিত ব্যাখ্যা"}
                                        </button>

                                        <button
                                            onClick={() => alert("ভিডিও শীঘ্রই আসছে")}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-100 text-red-600 rounded-xl hover:bg-red-50 transition-all text-sm font-bold active:scale-95"
                                        >
                                            <Youtube size={18} />
                                            ভিডিও
                                        </button>
                                    </div>
                                    <span className="text-[12px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {item.Subject}
                                    </span>
                                </div>

                                {/* Animated Answer & Explanation */}
                                {openAnswers[item.ID] && (
                                    <div className="mt-5 animate-in slide-in-from-top-2 duration-300">
                                        <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100">
                                            <div className="flex items-center gap-2 text-emerald-700 font-black mb-2">
                                                <CheckCircle2 size={18} />
                                                সঠিক উত্তর: {item.CorrectAnswer}
                                            </div>
                                            <div className="text-slate-600 text-[14.5px] leading-relaxed pl-7 border-l-2 border-emerald-200 ml-2">
                                                <span className="font-bold text-slate-800">বিশ্লেষণ: </span>
                                                {item.Explanation || "এই প্রশ্নের ব্যাখ্যাটি শীঘ্রই যুক্ত করা হবে। আমাদের সাথেই থাকুন।"}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}