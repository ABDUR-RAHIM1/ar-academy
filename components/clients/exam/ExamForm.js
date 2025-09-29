"use client";
import { postActionUser } from "@/actions/users/postActions";
import { questionsSubmit, userLogin } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import ExamTimer from "@/helpers/examTimer/ExamTimer";
import useExamTimer from "@/utils/ExamTimeCountDown";
import LoginAlertModal from "@/utils/LoginAlertModal";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import TestTimer from "./TestTimer";
import ExamTimerSection from "./ExamTimerSection";

export default function ExamForm({ questionsData }) {
    const { _id, duration, questions } = questionsData;


    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { showToast, token, usedTime } = useContext(contextD)
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [questionHead, setQuestionHead] = useState({
        questionId: "",
        isAll: null,
        isAllTitle: "",
        sub_categorie: {},
        chapter: {},
        duration: "",
        usedTime: 0
    })

    const [formData, setFormData] = useState(
        questions.map((q) => ({ ...q, selectAns: "" })) // Initial state with empty selectAns
    );

    // set subject Head State
    // useEffect(() => {
    //     if (isAll) {
    //         setQuestionHead((prev) => ({
    //             ...prev,
    //             questionId: _id,
    //             isAll: isAll,
    //             isAllTitle: isAllTitle,
    //             duration: duration || (questions?.length / 2)
    //         }))
    //     } else {
    //         setQuestionHead((prev) => ({
    //             ...prev,
    //             questionId: _id,
    //             isAll: isAll,
    //             sub_categorie: sub_categorie,
    //             chapter: chapter,
    //             duration: duration || (questions?.length / 2)
    //         }))
    //     }
    // }, [questionsData])

    //  set usedTime (for Exam) from useContext
    useEffect(() => {
        setQuestionHead(prev => ({
            ...prev,
            usedTime: usedTime
        }));
    }, [usedTime]);


    // Function to handle option selection
    const handleOptionChange = (question, selectedOption) => {
        if (!token) {
            setLoginModalOpen(true);
            return;
        }

        const questionId = Number(question.ID);

        setFormData((prev) =>
            prev.map((q) =>
                Number(q.ID) === questionId ? { ...q, selectAns: selectedOption } : q
            )
        );
    };

    const handleSubmitQuestion = async (e = null) => {
        if (e?.preventDefault) e.preventDefault();


        if (!token) {
            setLoginModalOpen(true);
            return;
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

            // const { status, data } = await postActionUser(payload);

            // showToast(status, data)
            // if (status === 200 || status === 201) {
            //     setIsSubmit(true)
            // }

            alert("মান উন্নায়নের কাজ চলছে")

        } catch (error) {
            console.log(error);
            showToast(500, "Failed to submit Question")
        } finally {
            setLoading(false)
        }
    };

    // koto gulu select kora hoyeche
    const selectedCount = formData.filter(q => q.selectAns).length;

    const { status, timeLeft } = useExamTimer({
        startDate: questionsData.startDate,
        startTime: questionsData.startTime,
        duration: questionsData.duration
    });


    return (
        <div>
            <div className='  w-full sticky top-16 md:top-24 left-0 z-20'>
                {/* <ExamTimer
                    token={token}
                    durationInMinutes={duration}
                    isSubmit={isSubmit}
                    handleSubmitQuestion={handleSubmitQuestion}
                    totalQuestions={formData.length || 0}
                    selectedCount={selectedCount}
                /> */}
                {/* <TestTimer exam={questionsData} /> */}
                <div className="bg-blue-500 text-white">
                    <ExamTimerSection
                        token={token}
                        timeLeft={timeLeft}
                        status={status}
                        durationInMinutes={duration}
                        isSubmit={isSubmit}
                        handleSubmitQuestion={handleSubmitQuestion}
                        totalQuestions={formData.length || 0}
                        selectedCount={selectedCount}
                    />
                </div>
            </div>

            <div className=" my-6 ">


            </div>

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
            {/* <button
                onClick={handleSubmitQuestion} // Later you can send this to API
                className=" sticky bottom-0 w-full bg1 hover:bg2 transition-all text-white px-4 py-2 rounded-md mt-4"
            >
                {
                    loading ? "জমা দেওয়া হচ্ছে..." : "সাবমিট করুন"
                }
            </button> */}

            <LoginAlertModal
                open={loginModalOpen}
                setOpen={setLoginModalOpen}
                text={"আপনি এখনো লগইন করেননি। পরীক্ষায় অংশগ্রহণ করতে লগইন করতে হবে।"}
                onRedirect={() => {
                    setLoginModalOpen(false);
                    router.push(userLogin);
                }}
            />

        </div>
    );
}
