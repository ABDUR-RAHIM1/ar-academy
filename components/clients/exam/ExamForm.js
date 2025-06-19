"use client";
import { postActionUser } from "@/actions/users/postActions";
import { questionsSubmit, userLogin } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function ExamForm({ questionsData }) {
    const { _id, isAll, isAllTitle, sub_categorie, chapter, questions } = questionsData;

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { showToast, token } = useContext(contextD)

    const [questionHead, setQuestionHead] = useState({
        questionId: "",
        isAll: null,
        isAllTitle: "",
        sub_categorie: {},
        chapter: {}
    })


    const [formData, setFormData] = useState(
        questions.map((q) => ({ ...q, selectAns: "" })) // Initial state with empty selectAns
    );


    // set subject Head State
    useEffect(() => {
        if (isAll) {
            setQuestionHead((prev) => ({
                ...prev,
                questionId: _id,
                isAll: isAll,
                isAllTitle: isAllTitle,
            }))
        } else {
            setQuestionHead((prev) => ({
                ...prev,
                questionId: _id,
                isAll: isAll,
                sub_categorie: sub_categorie,
                chapter: chapter,
            }))
        }
    }, [questionsData])



    // Function to handle option selection
    const handleOptionChange = (question, selectedOption) => {

        const questionId = Number(question.ID);

        setFormData((prev) =>
            prev.map((q) =>
                Number(q.ID) === questionId ? { ...q, selectAns: selectedOption } : q
            )
        );
    };

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();

        if (!token) {
            showToast(400, `আপনি এখনো লগইন করেননি
পরীক্ষা দিতে আগে লগইন করুন। `)
            router.push(userLogin)
            return
        }

        setLoading(true)
        try {
            // মার্কিং করার জন্য নতুন ফর্ম ডাটা তৈরি করা
            const updatedFormData = formData.map((question) => {
                const isCorrect = String(question.selectAns) === String(question.CorrectAnswer);
                const isSkipped = !question.selectAns; // যদি `selectAns` না থাকে, তাহলে স্কিপ

                return {
                    ...question,
                    status: isSkipped ? "skipped" : isCorrect ? "correct" : "wrong",
                };
            });

            // ✅ ইউজারের জন্য ফলাফল গণনা
            const correctCount = updatedFormData.filter(q => q.status === "correct").length;
            const wrongCount = updatedFormData.filter(q => q.status === "wrong").length;
            const skippedCount = updatedFormData.filter(q => q.status === "skipped").length;
            const totalQuestions = updatedFormData.length;

            const resultSheetData = {
                examInfo: questionHead,
                results: updatedFormData,
                correctAns: correctCount,
                wrongAns: wrongCount,
                skip: skippedCount,
                totalQuestions: totalQuestions,
            }


            const payload = {
                method: "POST",
                api: questionsSubmit,
                body: resultSheetData
            }
            const { status, data } = await postActionUser(payload);

            showToast(status, data)

        } catch (error) {
            console.log(error);
            showToast(500, "Failed to submit Question")
        } finally {
            setLoading(false)
        }
    };


    return (
        <div> 
            {formData.map((question, index) => (
                <div key={question.ID} className="mb-6 p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">
                        {index + 1}. {question.Question}
                    </h2>
                    <div className="space-y-2">
                        {[question.Option1, question.Option2, question.Option3, question.Option4].map(
                            (option, i) => (
                                <label key={i} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`question-${question.ID}`}
                                        value={option}
                                        className="hidden peer"
                                        checked={question.selectAns === option}
                                        onChange={() => handleOptionChange(question, option)}
                                    />
                                    <div
                                        className={`w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center ${question.selectAns === option ? "border-blue-500 bg-[#1e708a]" : ""
                                            }`}
                                    >
                                        <svg
                                            className={`w-3 h-3 text-white ${question.selectAns === option ? "block" : "hidden"}`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4 5.6 5.6 12-12L19.6 5 9 16.2z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{option}</span>
                                </label>
                            )
                        )}
                    </div>

                    <div className=" text-right">
                        <small className=" text-gray-500 text-sm">
                            {
                                question.Subject || "N/A"
                            }
                        </small>
                    </div>

                </div>
            ))}

            {/* Submit Button */}
            <button
                onClick={handleSubmitQuestion} // Later you can send this to API
                className=" sticky bottom-0 w-full bg1 hover:bg2 transition-all text-white px-4 py-2 rounded-md mt-4"
            >
                {
                    loading ? "জমা দেওয়া হচ্ছে..." : "সাবমিট করুন"
                }
            </button>
        </div>
    );
}
