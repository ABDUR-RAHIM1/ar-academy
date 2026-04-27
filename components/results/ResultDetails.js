

import { resultMetaData } from '@/seo/resultMetadata';
import { CalendarDays, AlarmClock, CheckCircle, XCircle, SkipForward, ListChecks, BookOpenText, Trophy } from 'lucide-react';
import React from 'react';
import getAdminToken from '@/actions/getToken/getAdminToken';
import McqResultDetails from './McqResultDetails';
import WrittenResultDetails from './WrittenResultDetails';
import getSubAdminToken from '@/actions/getToken/getSubAdminToken';
 

export const metadata = resultMetaData

export default async function ResultDeatils({ result }) {

    const adminToken = await getAdminToken();
    const subAdminToken = await getSubAdminToken();

    const isEditMood = !!adminToken || !!subAdminToken
    const editorRole = adminToken ? "super_admin" : "sub_admin"


    return (
        <div className='bg-[#f8fafc] min-h-screen pb-20'>
            <div id="result-section" className="max-w-5xl mx-auto pt-10 px-4">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">পরীক্ষার ফলাফল</h1>
                    <p className="text-slate-500 mt-2 font-medium">বিস্তারিত রেজাল্ট শীট এবং বিশ্লেষণ</p>
                </div>

                {/* Exam Info Card */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-10">

                    {/* Top Bar: Subject & Result Status */}
                    <div className="bg-slate-900 px-2 md:px-8 py-3 md:py-6 text-white flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-500 p-3 rounded-2xl">
                                <BookOpenText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">পরীক্ষার বিষয়</p>
                                <h2 className="text-xl font-bold">{result.question?.subjectName || "N/A"}</h2>
                            </div>
                        </div>
                        <div className={`px-6 py-2 rounded-full font-black text-sm uppercase tracking-tighter ${result?.isPass ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            }`}>
                            {result?.isPass ? "● উত্তীর্ণ (Passed)" : "○ অনুত্তীর্ণ (Failed)"}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    {/* Stats Grid */}
                    <div className="p-3 md:p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {/* Highlighted Score Card */}
                            <div className="col-span-2 md:col-span-2 lg:col-span-1 bg-indigo-600 rounded-3xl p-4 text-white shadow-lg shadow-indigo-200 flex flex-col justify-center">
                                <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">প্রাপ্ত নম্বর</p>
                                <h3 className="text-4xl font-black">{result?.totalmark || 0}</h3>
                                <div className="flex flex-col gap-1 mt-2">
                                    <span className="text-indigo-200 text-[10px] italic font-medium">পাস মার্ক: {result?.question?.passMark}</span>
                                    {/* নেগেটিভ মার্ক যদি ০ এর বেশি হয় তবেই দেখাবে (অপশনাল কন্ডিশন) */}
                                    <span className="bg-white/20 text-white text-[9px] px-2 py-0.5 rounded-full w-fit font-bold">
                                        নেগেটিভ মার্ক: {result?.nagetiveMark || 0}
                                    </span>
                                </div>
                            </div>

                            {/* অন্যান্য স্ট্যাটাস কার্ড */}
                            <StatItem
                                icon={<ListChecks className="text-blue-500" />}
                                label="মোট প্রশ্ন"
                                value={`${result.results?.length || 0} টি`}
                                bgColor="bg-blue-50"
                            />
                            <StatItem
                                icon={<CheckCircle className="text-emerald-500" />}
                                label="সঠিক উত্তর"
                                value={`${result?.correctAns || 0} টি`}
                                bgColor="bg-emerald-50"
                            />
                            <StatItem
                                icon={<XCircle className="text-rose-500" />}
                                label="ভুল উত্তর"
                                value={`${result?.wrongAns || 0} টি`}
                                bgColor="bg-rose-50"
                            />
                            <StatItem
                                icon={<SkipForward className="text-amber-500" />}
                                label="স্কিপ"
                                value={`${result?.skip || 0} টি`}
                                bgColor="bg-amber-50"
                            />
                            <StatItem
                                icon={<CalendarDays className="text-slate-500" />}
                                label="তারিখ"
                                value={new Date(result.createdAt).toLocaleDateString('bn-BD')}
                                bgColor="bg-slate-100"
                            />
                            <StatItem
                                icon={<AlarmClock className="text-sky-500" />}
                                label="মোট সময়"
                                value={`${result.question?.duration || 0} মিনিট`}
                                bgColor="bg-sky-50"
                            />
                            <StatItem
                                icon={<Trophy className="text-violet-500" />}
                                label="পরীক্ষার ধরণ"
                                value={result?.isRetake ? "রিটেক" : "মূল পরীক্ষা"}
                                bgColor="bg-violet-50"
                            />

                        </div>
                    </div>
                </div>

                {/* Detailed Section (MCQ/Written) */}
                <div className="mt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-1.5 bg-indigo-600 rounded-full"></div>
                        <h3 className="text-2xl font-bold text-slate-800">উত্তরপত্রের বিশ্লেষণ</h3>
                    </div>
                    {
                        result?.question.questionType === "mcq"
                            ? <McqResultDetails
                                mcqResultData={result.results}
                                resultId={result._id}
                            />
                            : <WrittenResultDetails
                                writtenResultData={result.results}
                                isAdmin={isEditMood}
                                editorRole={editorRole}
                                resultId={result._id}
                            />
                    }
                </div>
            </div>
        </div>

    )
};

// কাস্টম স্ট্যাট আইটেম কম্পোনেন্ট (একই ফাইলে বা বাইরে রাখতে পারেন)
function StatItem({ icon, label, value, bgColor }) {
    return (
        <div className={`${bgColor} p-4 rounded-2xl border border-white shadow-sm flex flex-col justify-between`}>
            <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center shadow-sm mb-3">
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <div>
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-tight">{label}</p>
                <p className="text-slate-800 font-bold text-base mt-0.5">{value}</p>
            </div>
        </div>
    );
}
