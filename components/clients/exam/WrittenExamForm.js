"use client";
import { postActionUser } from "@/actions/users/postActions";
import { questionsSubmit, studentLogin } from "@/constans";
import { contextD } from "@/contextApi/DashboardState";
import LoginAlertModal from "@/utils/LoginAlertModal";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ExamTimerSection from "./ExamTimerSection";
import useExamTimerRegular from "./ExamTimerRegular";
import useExamTimerRetake from "./ExamTimerRetake";
import ExamSubmitLoading from "./ExamSubmitLoading";
import { UploadCloud, Image as ImageIcon, XCircle, FileText } from "lucide-react";

export default function WrittenExamForm({ questionsData }) {
    const { _id, duration, questions } = questionsData;
    const router = useRouter();
    const { showToast, token } = useContext(contextD);

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [hasSubmittedResult, setHasSubmittedResult] = useState(false);

    // শুধুমাত্র ফাইল রাখার জন্য স্টেট
    const [formData, setFormData] = useState(
        questions.map((q) => ({
            ...q,
            files: [] // আপলোড করা ছবিগুলোর স্টোরেজ
        }))
    );

    // ফাইল সিলেক্ট এবং প্রিভিউ হ্যান্ডেল
    const handleFileChange = (id, files) => {
        const fileList = Array.from(files);
        setFormData(prev => prev.map(q => {
            if (q.ID === id) {
                // নতুন ফাইলগুলো আগের ফাইলের সাথে যুক্ত হবে
                return { ...q, files: [...q.files, ...fileList] };
            }
            return q;
        }));
    };

    // console.log(formData )

    // ভুল করে আপলোড করা ফাইল ডিলিট করা
    const removeFile = (questionId, fileIndex) => {
        setFormData(prev => prev.map(q => {
            if (q.ID === questionId) {
                const updatedFiles = q.files.filter((_, index) => index !== fileIndex);
                return { ...q, files: updatedFiles };
            }
            return q;
        }));
    };

    // টাইমার লজিক
    const regular = useExamTimerRegular({
        startDate: questionsData.startDate,
        startTime: questionsData.startTime,
        duration: questionsData.duration,
        stop: hasSubmittedResult
    });

    const retake = useExamTimerRetake({
        duration: questionsData.duration,
        stop: hasSubmittedResult
    });

    const isRetakeMode = questionsData.allowRetake && regular.status === "finished";
    const { status, timeLeft } = isRetakeMode ? retake : regular;

    useEffect(() => {
        if (status === "finished" || timeLeft === "00:00:00") {
            handleSubmitQuestion();
        }
    }, [status, timeLeft]);

    //  written exam submit 
    // const handleSubmitQuestion = async (e = null) => {
    //     if (e?.preventDefault) e.preventDefault();
    //     if (!token) { setLoginModalOpen(true); return; }

    //     setIsSubmit(true);
    //     try {
    //         // ফাইল আপলোডের জন্য FormData ব্যবহার করা জরুরি
    //         const submitData = new FormData();
    //         submitData.append("questionId", _id);
    //         submitData.append("isRetake", isRetakeMode);

    //         formData.forEach((q) => {
    //             q.files.forEach((file) => {
    //                 // ব্যাকএন্ডে question ID সহ ফাইল পাঠানো হচ্ছে যাতে বোঝা যায় কোন ছবি কোন প্রশ্নের
    //                 submitData.append(`answers_${q.ID}`, file);
    //             });
    //         });

    //         const payload = {
    //             method: "POST",
    //             api: questionsSubmit,
    //             body: submitData 
    //         };

    //         const { status, data } = await postActionUser(payload);
    //         showToast(status, data);
    //         if (status === 200 || status === 201) setHasSubmittedResult(true);

    //     } catch (error) {
    //         console.error(error);
    //         showToast(500, "সাবমিট করতে সমস্যা হয়েছে");
    //     } finally {
    //         setIsSubmit(false);
    //     }
    // };


    const handleSubmitQuestion = async (e = null) => {
        if (e?.preventDefault) e.preventDefault();
        if (!token) { setLoginModalOpen(true); return; }

        setIsSubmit(true);
        const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY"; // আপনার API Key এখানে দিন

        try {
            // ১. প্রতিটি প্রশ্নের উত্তর (ছবিগুলো) আপলোড করা এবং URL সংগ্রহ করা
            const updatedResults = await Promise.all(formData.map(async (question) => {
                const uploadedUrls = [];

                // যদি ঐ প্রশ্নের জন্য কোনো ফাইল থাকে
                if (question.files && question.files.length > 0) {
                    for (const file of question.files) {
                        const imgFormData = new FormData();
                        imgFormData.append("image", file);

                        try {
                            const response = await fetch(`https://api.imgbb.com/1/upload?key=862850e874b9b92bba3bbba84383b4dd`, {
                                method: "POST",
                                body: imgFormData,
                            });
                            const imgData = await response.json();
                            if (imgData.success) {
                                uploadedUrls.push(imgData.data.url); // ImgBB থেকে পাওয়া URL
                            }
                        } catch (err) {
                            console.error("ImgBB Upload Error:", err);
                        }
                    }
                }
              return {
                id: question.ID,
                questionText: question.Question,
                answerImages: uploadedUrls, // ইমেজের লিঙ্কগুলো এখানে থাকবে
                type: "written",
                status: uploadedUrls.length > 0 ? "answered" : "skipped"
            };
        }));

        // ২. স্কিমা অনুযায়ী ফিল্ডগুলো ক্যালকুলেট করা
        const totalQuestionsCount = String(formData.length);
        const skippedCount = String(updatedResults.filter(q => q.answerImages.length === 0).length);

        // যেহেতু এটি লিখিত পরীক্ষা, শুরুতে মার্ক এবং রেজাল্ট 0/false থাকবে (টিচার পরে আপডেট করবেন)
        const resultSheetData = {
            question: _id, // Schema ref: "Questions"
            results: updatedResults, // Array of answers
            correctAns: "0", // String
            wrongAns: "0",   // String
            skip: skippedCount, // String
            totalmark: "0",     // String
            nagetiveMark: String(questionsData.nagetiveMark || "0"), // String
            passMark: Number(questionsData.passMark || 0), // Number
            isPass: false, // Boolean
            isRetake: isRetakeMode, // Boolean
            totalQuestions: totalQuestionsCount, // String
        };

        // ৩. ফাইনাল সাবমিশন
        const payload = {
            method: "POST",
            api: questionsSubmit,
            body: resultSheetData
        };

        const { status, data } = await postActionUser(payload);

        if (status === 200 || status === 201) {
            showToast(status, "আপনার উত্তরপত্রটি সফলভাবে জমা হয়েছে!");
            setHasSubmittedResult(true);
        } else {
            showToast(status, data || "সাবমিট করতে সমস্যা হয়েছে");
        }

    } catch (error) {
        console.error("Submission Error:", error);
        showToast(500, "সার্ভারে কানেক্ট করা যাচ্ছে না");
    } finally {
        setIsSubmit(false);
    }
};


    if (isSubmit) return <ExamSubmitLoading />;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className='w-full sticky top-20 md:top-24 left-0 z-20 mb-8'>
                <ExamTimerSection
                    token={token}
                    timeLeft={timeLeft}
                    status={status}
                    durationInMinutes={duration}
                    isSubmit={isSubmit}
                    handleSubmitQuestion={handleSubmitQuestion}
                    totalQuestions={formData.length}
                    selectedCount={formData.filter(q => q.files.length > 0).length}
                />
            </div>

            <div className="space-y-6 px-4">
                {formData.map((question, index) => (
                    <div key={question.ID} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-lg font-bold text-slate-800 flex gap-2">
                                <span className="text-blue-600">{index + 1}.</span>
                                {question.Question}
                            </h2>
                        </div>

                        {/* File Upload Box */}
                        <div className="space-y-4">
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer group">
                                <UploadCloud className="text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all mb-2" size={32} />
                                <span className="text-sm font-bold text-slate-600">খাতার ছবি আপলোড করুন</span>
                                <p className="text-xs text-slate-400 mt-1">ক্যামেরা দিয়ে ছবি তুলুন বা গ্যালারি থেকে সিলেক্ট করুন</p>
                                <input
                                    type="file"
                                    className="hidden"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(question.ID, e.target.files)}
                                />
                            </label>

                            {/* Image Preview Grid */}
                            {question.files.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                                    {question.files.map((file, fIndex) => (
                                        <div key={fIndex} className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                            {/* File Preview (Simple Icon for performance, can use URL.createObjectURL for real preview) */}
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                <ImageIcon size={20} />
                                                <span className="text-[10px] mt-1 px-1 truncate w-full text-center">{file.name}</span>
                                            </div>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => removeFile(question.ID, fIndex)}
                                                className="absolute -top-1 -right-1 bg-white rounded-full text-red-500 shadow-md hover:text-red-700 transition-colors"
                                            >
                                                <XCircle size={20} fill="white" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <LoginAlertModal
                open={loginModalOpen}
                setOpen={setLoginModalOpen}
                text={"পরীক্ষায় অংশগ্রহণ করতে লগইন করতে হবে।"}
                onRedirect={() => {
                    setLoginModalOpen(false);
                    router.push(studentLogin);
                }}
            />
        </div>
    );
}