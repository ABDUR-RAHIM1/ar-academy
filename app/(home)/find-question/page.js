"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Heading from "@/components/clients/globals/Heading";
import { getsActions } from "@/actions/users/getActions";
import { getMergeAllQuestionsWithSearch } from "@/constans";
import FindInfo from "./FIndInfo";

export default function FindQuestions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [questions, setQuestions] = useState([]);
    const [questionCount, setQuestionCount] = useState(0)
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 1500);

        return () => {
            clearTimeout(handler);
        };
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
                setQuestionCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [debouncedTerm]);
 

    return (
        <div className="min-h-screen bg-white px-4 py-10">
            <Heading text={"প্রশ্ন অনুসন্ধান করুন"} />

            <div className="max-w-xl mx-auto mb-8">
                <Input
                    type="text"
                    placeholder="🔍 প্রশ্ন লিখুন যেমন: 'Noun', 'ক্রিয়া'"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {loading ? (
                <p className="text-center text-gray-500">লোড হচ্ছে...</p>
            ) : (
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-6xl mx-auto">
                        {questions.length > 0 && (
                            <h3 className="my-4 text-lg font-medium">
                                {questionCount} টি প্রশ্ন পাওয়া গিয়েছে
                            </h3>
                        )}

                        {searchTerm === "" && (
                            <FindInfo />
                        )}
                    </div>

                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
                        {questions.length > 0 ? (
                            questions.map((q, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all"
                                >
                                    <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                                        প্রশ্ন {index + 1}: {q.Question}
                                    </h3>
                                    <p className=" text-sm  text-gray-600 mb-3">
                                        বিষয়ঃ {q.Subject}
                                    </p>
                                    <ul className="space-y-2 text-gray-800 text-sm">
                                        {["Option1", "Option2", "Option3", "Option4"].map((opt, i) => {
                                            const isCorrect = q[opt] === q.CorrectAnswer;
                                            return (
                                                <li
                                                    key={i}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border 
                          ${isCorrect ? "bg-green-100 border-green-400" : "bg-gray-50 border-gray-200"}`}
                                                >
                                                    <span>{q[opt]}</span>
                                                    {isCorrect && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className="mt-4 text-sm text-gray-700">
                                        <strong>ব্যাখ্যা:</strong> {q.Explanation || "N/A"}
                                    </div>
                                </div>
                            ))
                        ) : (
                            searchTerm !== "" && (
                                <p className="text-center col-span-full text-gray-500 text-lg">
                                    কোনো প্রশ্ন মেলেনি 😕
                                </p>
                            )
                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
}
