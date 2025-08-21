"use client"
import { Button } from "@/components/ui/button";
import { questionFormatTypes } from "@/LocalDatabase/questionsFormat";
import { PrinterIcon } from "lucide-react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function QuestionSheetPreview({ questionSheetHead, questions, setQuestions }) {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const { institute, duration, examName, marks, details, subject, fontSize, type, questionFormat, isExplanation: showExplanation, isDeleteButton: showMinusBtn } = questionSheetHead;

    const { bullets: bulletPoint, serial } = questionFormatTypes[type]



    const removeQuestion = (indexToRemove) => {
        setQuestions(prevQuestions =>
            prevQuestions.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <div className="my-10 px-10">
            <Button
                onClick={reactToPrintFn}
                className="mb-4 hover:bg-black bg-gray-800 text-white rounded flex items-center justify-center gap-2"
            >
                <PrinterIcon />  প্রিন্ট করুন
            </Button>

            <div ref={contentRef} className="w-full h-auto px-5 md:px-10">

                {/* ✅ Header + Questions একসাথে */}
                <div className="exam-wrapper">

                    {/* Header */}
                    <div className="w-full py-3 text-center border-b header">
                        <h1 className="text-2xl font-medium">{institute}</h1>
                        <p>পরিক্ষাঃ {examName}</p>
                        <p>বিষয়ঃ {subject}</p>
                        <div className="my-2 flex items-center justify-between text-sm">
                            <p>পূর্ণমানঃ {marks}</p>
                            {details && <p>[ {details} ]</p>}
                            <p>সময়ঃ {duration}</p>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="rounded-xl overflow-auto">
                        {questions.length === 0 ? (
                            <p className="text-gray-500 italic text-center">
                                এখনো কোন প্রশ্ন যোগ করা হয়নি।
                            </p>
                        ) : (
                            <div
                                style={{ columnCount: 2, columnGap: "20px" }}
                                className="questions pt-5 pb-10"
                            >
                                {questions.map((q, index) => (
                                    <div
                                        key={index}
                                        className="question-block"
                                    >
                                        <div className=" flex items-center justify-between ">
                                            <div className=" flex items-center gap-2"
                                                style={{ fontSize: fontSize }}
                                            >
                                                <p>
                                                    {serial[index]}
                                                    <span className="mx-2">
                                                        {q.Question}
                                                    </span>
                                                </p>
                                                {/* Minus button */}
                                                {
                                                    showMinusBtn === "yes" &&
                                                    <button
                                                        onClick={() => removeQuestion(index)}
                                                        className="text-red-600 font-bold ml-4"
                                                        title="Remove Question"
                                                    >
                                                        −
                                                    </button>}

                                            </div>
                                            <div className=" text-left mr-5"
                                                style={{ fontSize: fontSize }}
                                            >
                                                {q.QuestionMark}
                                            </div>
                                        </div>

                                        <ul className="ml-6 mt-2 text-gray-700 space-y-[0.5] grid grid-cols-2"
                                            style={{ fontSize: fontSize }}
                                        >
                                            {[q.Option1, q.Option2, q.Option3, q.Option4].map((opt, i) => (
                                                <li key={i}>
                                                    <span className="mr-2">
                                                        {bulletPoint?.[i] || ""}.
                                                    </span>
                                                    {opt}
                                                </li>
                                            ))}
                                        </ul>
                                        {showExplanation === "yes" && q.Explanation && (
                                            <blockquote className="my-4 ml-4 border-l-4 border-blue-400 bg-blue-50 px-4 py-3 rounded-md shadow-sm">
                                                <p className="text-gray-700 mt-1" style={{ fontSize: fontSize }}>
                                                    ✅ উত্তর: <span className="font-normal">{q.CorrectAnswer}</span>
                                                </p>
                                                <p className="text-gray-600 mt-2 leading-relaxed" style={{ fontSize: fontSize }}>
                                                    📖 ব্যাখ্যা: <span className="font-normal">{q.Explanation}</span>
                                                </p>
                                            </blockquote>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
