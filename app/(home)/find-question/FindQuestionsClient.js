"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2, Search, BookOpen, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Heading from "@/components/clients/globals/Heading";
import { getsActions } from "@/actions/users/getActions";
import { getMergeAllQuestionsWithSearch } from "@/constans";
import FindInfo from "./FIndInfo";
import { Label } from "@/components/ui/label";

export default function FindQuestionsClient() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [questions, setQuestions] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 1200); // ডিবাউন্স টাইম কিছুটা কমানো হয়েছে দ্রুত রেসপন্সের জন্য
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!debouncedTerm.trim()) {
                setQuestions([]);
                setQuestionCount(0);
                return;
            }
            try {
                setLoading(true);
                const searchText = encodeURIComponent(debouncedTerm);
                const { status, data } = await getsActions(getMergeAllQuestionsWithSearch + searchText);

                if (status === 200) {
                    setQuestions(data.questions);
                    setQuestionCount(data.total);
                } else {
                    setQuestions([]);
                    setQuestionCount(0);
                }
            } catch (error) {
                console.error("❌ Fetching error:", error);
                setQuestions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [debouncedTerm]);

    return (
        <div className="min-h-screen bg-slate-50/50 px-4 py-12">
            <div className="max-w-6xl mx-auto text-center mb-10">
                <Heading text={"প্রশ্ন অনুসন্ধান করুন"} />
                <p className="text-slate-500 mt-2 font-medium">হাজারো প্রশ্নের ভাণ্ডার থেকে আপনার কাঙ্ক্ষিত প্রশ্নটি খুঁজে নিন</p>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-12">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <Input
                        name="search"
                        type="text"
                        placeholder="প্রশ্ন, বিষয় বা কী-ওয়ার্ড দিয়ে খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-4 py-7 bg-white border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-100 transition-all text-lg"
                    />
                </div>
                <Label className="text-[13px] text-slate-500 mt-4 block text-center leading-relaxed px-4">
                    যেমনঃ <span className="text-indigo-600 font-bold italic">"Noun"</span>, 
                    <span className="text-indigo-600 font-bold italic ml-1">"বাংলার ইতিহাস"</span>, 
                    <span className="text-indigo-600 font-bold italic ml-1">"সন্ধি"</span>
                </Label>
            </div>

            {/* Result Area */}
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                        <p className="text-slate-500 font-bold animate-pulse">আপনার জন্য প্রশ্নগুলো লোড হচ্ছে...</p>
                    </div>
                ) : (
                    <>
                        {questions.length > 0 && (
                            <div className="flex items-center gap-2 mb-8 bg-indigo-50 w-fit px-4 py-2 rounded-full border border-indigo-100">
                                <BookOpen size={18} className="text-indigo-600" />
                                <span className="text-indigo-700 font-bold text-sm">
                                    মোট {questionCount} টি প্রশ্ন পাওয়া গিয়েছে
                                </span>
                            </div>
                        )}

                        {searchTerm === "" && <FindInfo />}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {questions.length > 0 ? (
                                questions.map((q, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-3xl shadow-sm p-6 border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col"
                                    >
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3">
                                                {q.Subject || "সাধারণ"}
                                            </span>
                                            <h3 className="text-lg font-bold text-slate-800 leading-snug">
                                                {q.Question}
                                            </h3>
                                        </div>

                                        <div className="space-y-2 mt-2">
                                            {["Option1", "Option2", "Option3", "Option4"].map((opt, i) => {
                                                if (!q[opt]) return null;
                                                const isCorrect = q[opt] === q.CorrectAnswer;
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-colors ${
                                                            isCorrect 
                                                            ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold" 
                                                            : "bg-slate-50/50 border-slate-100 text-slate-600"
                                                        }`}
                                                    >
                                                        <span className="text-[14.5px] leading-tight">{q[opt]}</span>
                                                        {isCorrect && <CheckCircle2 size={16} className="shrink-0" />}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {q.Explanation && (
                                            <div className="mt-6 pt-4 border-t border-slate-50">
                                                <p className="text-[13px] text-slate-500 leading-relaxed italic">
                                                    <span className="font-bold text-indigo-600 not-italic">ব্যাখ্যা: </span> 
                                                    {q.Explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                searchTerm !== "" && (
                                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                        <AlertCircle size={48} className="text-slate-300 mb-4" />
                                        <p className="text-slate-500 font-bold text-xl">দুঃখিত, কোনো প্রশ্ন খুঁজে পাওয়া যায়নি!</p>
                                        <button 
                                            onClick={() => setSearchTerm("")}
                                            className="mt-4 text-indigo-600 font-bold hover:underline"
                                        >
                                            আবার চেষ্টা করুন
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}