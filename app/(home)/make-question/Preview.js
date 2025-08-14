import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import React from "react";

export default function Preview({ form, questions, bulletPoint }) {
    // দুইটি কলামের জন্য প্রশ্ন ভাগ করা
    const mid = Math.ceil(questions.length / 2);
    const firstColumn = questions.slice(0, mid);
    const secondColumn = questions.slice(mid);


    const dummyQuestions = Array.from({ length: 500 }, (_, i) => ({
        position: i + 1,
        question: `প্রশ্ন নম্বর ${i + 1}`,
        option1: `বিকল্প ১`,
        option2: `বিকল্প ২`,
        option3: `বিকল্প ৩`,
        option4: `বিকল্প ৪`,
    }));



    return (
        <>
            <Button
                onClick={() => window.print()}
                className="mb-4 hover:bg-black bg-gray-800 text-white rounded flex items-center justify-center gap-2"
            >
                <PrinterIcon />  প্রিন্ট করুন
            </Button>



            <div className="bg-gray-100 border p-3 px-5 rounded-xl overflow-auto">
                <div
                    id="printableArea"
                    className="bg-white rounded-lg mx-auto p-6"
                    style={{ width: "100%", minHeight: "500px" }}
                >
                    <div className="text-center mb-6"

                    >
                        <h3 className="text-lg font-semibold">
                            {form.institute || "প্রতিষ্ঠানের নাম"}
                        </h3>
                        <p>{form.examName || "পরীক্ষার নাম"}</p>
                        <p>{form.subjectName || "বিষয়ের নাম"}</p>
                        <p>
                            মোট নম্বর: {form.fullMarks || "__"} | সময়: {form.time || "__"}
                        </p>
                    </div>
                    <hr className="mb-4" />

                    {/* প্রশ্ন দেখানো হচ্ছে */}
                    {questions.length === 0 ? (
                        <p className="text-gray-500 italic text-center">
                            এখনো কোন প্রশ্ন যোগ করা হয়নি।
                        </p>
                    ) : (
                        <div
                            style={{ columnCount: 2, columnGap: "20px" }}
                            className="break-inside-avoid p-10"
                        >
                            {questions.map((q, index) => (
                                <div
                                    key={index}
                                    style={{ fontSize: form.fontSize, marginTop: "0px", }}
                                >
                                    <p className="font-semibold">
                                        {q.position || index + 1}. {q.question}
                                    </p>
                                    <ul className="ml-6 text-gray-700 space-y-[0.5] grid grid-cols-2">
                                        {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
                                            <li key={i}>
                                                <span className="font-bold mr-2">
                                                    {bulletPoint?.[i] || ""}
                                                </span>
                                                {opt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
