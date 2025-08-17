"use client"
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function QuestionSheetPreview({ questionSheetHead, questions, setQuestions }) {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const { institute, duration, examName, marks, details, subject } = questionSheetHead;

    const bulletPoint = ["ক", "খ", "গ", "ঘ"];

    //  dummy 
    const showExplanation = false;
    const showMinusBtn = false 

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
                                className="questions py-10"
                            >
                                {questions.map((q, index) => (
                                    <div
                                        key={index}
                                        className="question-block"
                                    >
                                        <div className=" flex items-center gap-2">
                                            <p className=" text-sm">
                                                {q.ID || index + 1})
                                                <span className="mx-2">
                                                    {q.Question}
                                                </span>
                                            </p>
                                            {/* Minus button */}
                                            {
                                                showMinusBtn &&
                                                <button
                                                    onClick={() => removeQuestion(index)}
                                                    className="text-red-600 font-bold ml-4"
                                                    title="Remove Question"
                                                >
                                                    −
                                                </button>}
                                        </div>
                                        <ul className="ml-6 mt-2 text-gray-700 space-y-[0.5] grid grid-cols-2 text-sm">
                                            {[q.Option1, q.Option2, q.Option3, q.Option4].map((opt, i) => (
                                                <li key={i}>
                                                    <span className="mr-2">
                                                        {bulletPoint?.[i] || ""}.
                                                    </span>
                                                    {opt}
                                                </li>
                                            ))}
                                        </ul>
                                        {showExplanation && q.Explanation && (
                                            <div className=" p-2 border rounded-sm">
                                                <p className="mt-2 text-gray-600">
                                                    <strong>Explanation: </strong> {q.Explanation}
                                                </p>
                                            </div>
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
