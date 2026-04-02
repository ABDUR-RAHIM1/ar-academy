"use client"
import { postActions } from '@/actions/admins/postActions';
import { postActionsSubAdmin } from '@/actions/subAdmins/postActionsSubAdmin';
import LoadingSpinner from '@/components/spinner-01';
import { resultUpdatePublishedStatus, resultUpdatePublishedStatusBySubAdmin } from '@/constans';
import { contextD } from '@/contextApi/DashboardState';
import { CheckCircle, HelpCircle, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function ResultDetails({ writtenResultData, isAdmin, editorRole, resultId }) {
    const { showToast } = useContext(contextD);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    // ২. মার্কস জমা রাখার জন্য অবজেক্ট স্টেট: { "id": value }
    const [marks, setMarks] = useState({});


    // শুরুতে ডাটাবেজের নম্বরগুলো দিয়ে অবজেক্টটি পূর্ণ করা 
    useEffect(() => {
        if (writtenResultData) {

            const initialMarks = {};
            writtenResultData.forEach(item => {
                initialMarks[item.id] = item.obtainMarks || 0;
            });
            setMarks(initialMarks);
        }
    }, [writtenResultData]);

    // Marks Data update (onChange)
    const handleMarkChange = (id, value) => {
        setMarks(prev => ({
            ...prev,
            [id]: Number(value)
        }));
    };


    const publishedResult = async () => {

        setIsLoading(true)

        try {

            let updateApiUrl;
            let postActionFunc;

            if (editorRole === "super_admin") {
                updateApiUrl = resultUpdatePublishedStatus;
                postActionFunc = postActions;
            }
            if (editorRole === "sub_admin") {
                updateApiUrl = resultUpdatePublishedStatusBySubAdmin;
                postActionFunc = postActionsSubAdmin
            }

            const payload = {
                method: "PUT",
                api: `${updateApiUrl}${resultId}`,
                body: marks
            };

            const { status, data } = await postActionFunc(payload);
            showToast(status, data);
            if (status === 200) {
                router.refresh();
            }

        } catch (error) {
            console.log(error)
            showToast(500, "Failed to published Result")
        } finally {
            setIsLoading(false)
        }

    };


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b pb-2">লিখিত পরীক্ষার খাতা মূল্যায়ন</h2>

            {writtenResultData.map((result, index) => (
                <div
                    key={result.id || index}
                    className={`group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${result.status === 'answered' ? 'border-indigo-100' : 'border-slate-200'
                        }`}
                >
                    {/* উপরের অংশ: প্রশ্ন এবং স্ট্যাটাস */}
                    <div className="p-5 border-b border-slate-50 bg-slate-50/50">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">প্রশ্ন {index + 1}</span>
                                <h3 className="text-lg font-semibold text-slate-800 mt-1 leading-snug">
                                    {result.questionText}
                                </h3>
                            </div>
                            <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${result.status === 'answered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                {result.status === 'answered' ? '● উত্তরিত' : '○ স্কিপড'}
                            </span>
                        </div>
                    </div>

                    {/* মাঝখানের অংশ: উত্তর (ছবি) এবং মার্ক ইনপুট */}
                    <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* বাম পাশ: উত্তরপত্রের ছবি */}
                        <div className="lg:col-span-8">
                            <p className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" /> শিক্ষার্থীর উত্তরপত্র:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {result.answerImages && result.answerImages.length > 0 ? (
                                    result.answerImages.map((img, imgIndex) => (
                                        <div key={imgIndex} className="relative group/img">
                                            <Image
                                                width={500}
                                                height={500}
                                                src={img}
                                                alt={`Answer sheet ${imgIndex}`}
                                                className="w-32 h-44 object-cover rounded-lg border shadow-sm cursor-zoom-in hover:scale-105 transition-transform"
                                                onClick={() => window.open(img, '_blank')}
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-lg transition-opacity pointer-events-none">
                                                <span className="text-white text-[10px] font-bold">ক্লিক করে দেখুন</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full py-10 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400">
                                        <HelpCircle className="w-8 h-8 mb-2 opacity-20" />
                                        <p className="text-xs italic">কোন উত্তরপত্র আপলোড করা হয়নি</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col justify-center">
                            {isAdmin ? (
                                // ✅ যদি অ্যাডমিন হয় - তবে এডিট করার অপশন দেখাবে
                                <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 shadow-sm">
                                    <label className="text-[10px] font-black text-indigo-400 uppercase mb-2 block tracking-widest text-center">
                                        নম্বর প্রদান করুন (অ্যাডমিন প্যানেল)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="00"
                                            defaultValue={result.obtainMarks}
                                            onChange={(e) => handleMarkChange(result.id, e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:ring-0 outline-none font-black text-lg text-center text-indigo-700 transition-all"
                                        />

                                    </div>
                                    <p className="mt-2 text-[9px] text-indigo-400 text-center font-medium italic">
                                        * নম্বর পরিবর্তন করে সেভ বাটনে ক্লিক করুন
                                    </p>
                                </div>
                            ) : (
                                // ❌ যদি অ্যাডমিন না হয় - তবে শুধু নম্বরটি দেখাবে (No Edit)
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">প্রাপ্ত নম্বর</span>
                                    <div className="relative">
                                        <h5 className="text-4xl font-black text-slate-800 tabular-nums">
                                            {result.obtainMarks || 0}
                                        </h5>

                                        <div className="absolute -top-1 -right-3 h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    </div>
                                    <p className="mt-2 text-[10px] text-slate-400 font-medium italic">
                                        (শিক্ষকের মূল্যায়ন অনুযায়ী)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* নিচের অংশ: মেটা ডাটা */}
                    <div className="px-5 py-3 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center text-[11px] text-slate-400 uppercase tracking-widest font-semibold">

                        <span>ধরণ: {result.type}</span>
                    </div>
                </div>
            ))}


            {/* ✅ Published Result Button */}
            <button
                onClick={publishedResult}
                className="w-full py-3 px-4 bg-emerald-500/10 border bg-emerald-100 border-emerald-500/20 text-emerald-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-default shadow-sm hover:bg-emerald-500 hover:cursor-pointer hover:text-white"
            >

                {
                    isLoading ? <LoadingSpinner /> : <>
                        <CheckCircle size={18} className="animate-pulse" /> "Published Result"
                    </>
                }
            </button>

        </div >
    );
}