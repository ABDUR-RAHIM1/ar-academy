"use client";

import { postActionUser } from "@/actions/users/postActions";
import { questionsSubmit, studentLogin } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import LoginAlertModal from "@/utils/LoginAlertModal";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, useRef } from "react";
import ExamTimerSection from "./ExamTimerSection";
import useExamTimerRegular from "./ExamTimerRegular";
import useExamTimerRetake from "./ExamTimerRetake";
import ExamSubmitLoading from "./ExamSubmitLoading";

export default function ExamForm({ questionsData }) {
    const { _id, duration, questions } = questionsData;
    const router = useRouter();

    const { showToast, token } = useContext(contextD);

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [hasSubmittedResult, setHasSubmittedResult] = useState(false);

    const submitOnceRef = useRef(false); // 🔒 prevent duplicate submit

    const [formData, setFormData] = useState(
        questions.map((q) => ({ ...q, selectAns: "" }))
    );

    // option select
    const handleOptionChange = (question, selectedOption) => {
        if (!token) {
            setLoginModalOpen(true);
            return;
        }

        setFormData((prev) =>
            prev.map((q) =>
                Number(q.ID) === Number(question.ID)
                    ? { ...q, selectAns: selectedOption }
                    : q
            )
        );
    };

    // selected count
    const selectedCount = formData.filter((q) => q.selectAns).length;

    // timers
    const regular = useExamTimerRegular({
        startDate: questionsData.startDate,
        startTime: questionsData.startTime,
        duration: questionsData.duration,
        stop: hasSubmittedResult,
    });

    const retake = useExamTimerRetake({
        duration: questionsData.duration,
        stop: hasSubmittedResult,
    });

    const isRetakeMode =
        questionsData.allowRetake && regular.status === "finished";

    const { status, timeLeft } = isRetakeMode ? retake : regular;

    // ⏱️ auto submit when time finished
    useEffect(() => {
        if (
            !hasSubmittedResult &&
            (status === "finished" ||
                timeLeft === "00:00:00" ||
                timeLeft === "0:0:0")
        ) {
            handleSubmitQuestion();
        }
    }, [status, timeLeft]);

    // Exam Dewar por submit Dewa hocche.
    const handleSubmitQuestion = async (e = null) => {
        if (e?.preventDefault) e.preventDefault();

        if (submitOnceRef.current) return; // 🛑 block double submit
        submitOnceRef.current = true;

        if (!token) {
            setLoginModalOpen(true);
            submitOnceRef.current = false;
            return;
        }

        setIsSubmit(true);

        try {
            const updatedFormData = formData.map((q) => {
                const isCorrect = String(q.selectAns) === String(q.CorrectAnswer);
                const isSkipped = !q.selectAns;

                return {
                    ...q,
                    status: isSkipped ? "skipped" : isCorrect ? "correct" : "wrong",
                };
            });

            const correctCount = updatedFormData.filter(
                (q) => q.status === "correct"
            ).length;
            const wrongCount = updatedFormData.filter(
                (q) => q.status === "wrong"
            ).length;
            const skippedCount = updatedFormData.filter(
                (q) => q.status === "skipped"
            ).length;

            const totalMark =
                correctCount -
                wrongCount * Number(questionsData.nagetiveMark);

            const isPass = totalMark >= Number(questionsData.passMark);

            const resultSheetData = {
                question: _id,
                results: updatedFormData,
                correctAns: correctCount,
                wrongAns: wrongCount,
                skip: skippedCount,
                totalmark: totalMark,
                totalQuestions: updatedFormData.length,
                nagetiveMark: questionsData.nagetiveMark,
                passMark: questionsData.passMark,
                isPass,
                isRetake: isRetakeMode,
            };

            const payload = {
                method: "POST",
                api: questionsSubmit,
                body: resultSheetData,
            };

            const { status, data } = await postActionUser(payload);
            showToast(status, data);

            if (status === 200 || status === 201) {
                setHasSubmittedResult(true);
            }
        } catch (error) {
            console.error(error);
            showToast(500, "Failed to submit exam");
            submitOnceRef.current = false;
        } finally {
            setIsSubmit(false);
        }
    };

    if (isSubmit) return <ExamSubmitLoading />;



    



    return (
        <>
            {/* 📱 Mobile Timer */}
            <div className="block lg:hidden sticky top-20 z-20">
                <ExamTimerSection
                    token={token}
                    timeLeft={timeLeft}
                    status={status}
                    durationInMinutes={duration}
                    isSubmit={isSubmit}
                    handleSubmitQuestion={handleSubmitQuestion}
                    totalQuestions={formData.length}
                    selectedCount={selectedCount}
                />
            </div>

            {/* 💻 Desktop Layout */}
            <div className="flex gap-6">
                {/* Questions */}
                <div className="w-full lg:w-[70%]">
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
                                                className={`w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center ${question.selectAns === option ? "border-blue-500 bg-green-600" : ""
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
                </div>

                {/* 💻 Desktop Sidebar */}
                <div className="hidden lg:block lg:w-[30%]">
                    <div className="sticky top-24">
                        <ExamTimerSection
                            token={token}
                            timeLeft={timeLeft}
                            status={status}
                            durationInMinutes={duration}
                            isSubmit={isSubmit}
                            handleSubmitQuestion={handleSubmitQuestion}
                            totalQuestions={formData.length}
                            selectedCount={selectedCount}
                        />
                    </div>
                </div>
            </div>

            {/* Login Alert */}
            <LoginAlertModal
                open={loginModalOpen}
                setOpen={setLoginModalOpen}
                text="আপনি এখনো লগইন করেননি। পরীক্ষায় অংশগ্রহণ করতে লগইন করতে হবে।"
                onRedirect={() => {
                    setLoginModalOpen(false);
                    router.push(studentLogin);
                }}
            />
        </>
    );
}
