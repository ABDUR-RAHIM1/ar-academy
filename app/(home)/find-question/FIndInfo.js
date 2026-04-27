import React from 'react';
import { Info, Search, BookCheck, Zap, RefreshCw } from 'lucide-react';

export default function FindInfo() {
    return (
        <div className="max-w-4xl mx-auto mt-10 overflow-hidden">
            {/* Main Header Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 mb-8 relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Search size={120} />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                            <Info size={24} className="text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold italic">আপনি যা খুঁজছেন তা এখানেই পাবেন!</h2>
                    </div>
                    <p className="text-indigo-50 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                        আমাদের বিশাল ডাটাবেসে <span className="text-yellow-300 font-black underline underline-offset-4">লক্ষ লক্ষ যাচাইকৃত MCQ প্রশ্ন</span> সংরক্ষিত রয়েছে। একাডেমিক থেকে বিসিএস — সব প্রস্তুতি এখন এক জায়গায়।
                    </p>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                        <Zap size={22} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-1">স্মার্ট অনুসন্ধান</h4>
                        <p className="text-sm text-slate-500 leading-snug">বিষয়ের নাম, প্রশ্ন বা ব্যাখ্যার অংশ দিয়ে দ্রুত সার্চ করুন।</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                        <BookCheck size={22} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-1">যাচাইকৃত সমাধান</h4>
                        <p className="text-sm text-slate-500 leading-snug">প্রতিটি প্রশ্নের সাথে সঠিক উত্তর ও প্রফেশনাল ব্যাখ্যা পাবেন।</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
                        <Search size={22} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-1">উদাহরণ</h4>
                        <p className="text-sm text-slate-500 leading-snug italic">"Planet", "শেকসপিয়র", "১৯৪৫" লিখে ট্রাই করুন।</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                        <RefreshCw size={22} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-1">নিয়মিত আপডেট</h4>
                        <p className="text-sm text-slate-500 leading-snug">সিস্টেমে প্রতিদিন নতুন প্রশ্ন ও গুরুত্বপূর্ণ তথ্য যুক্ত করা হয়।</p>
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <div className="mt-8 text-center">
                <p className="inline-block px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full font-bold text-sm border border-indigo-100">
                    🚀 আজই শুরু করুন আপনার স্মার্ট প্রস্তুতি!
                </p>
            </div>
        </div>
    );
}