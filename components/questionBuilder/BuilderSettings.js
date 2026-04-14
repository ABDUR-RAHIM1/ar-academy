"use client"
import { contextD } from '@/contextApi/DashboardState';
import React, { useContext } from 'react'
import { X, Type, Globe, Settings2, ChevronDown } from 'lucide-react';

export default function QuestionBuilderSettings() {
    const {
        qBuilderSettingsOpen,
        setQBuilderSettingOpen,
        fontSize, setFontSize,
        questionLang, setQuestionLang
    } = useContext(contextD);

    // ৫ থেকে ২০ পর্যন্ত ফন্ট সাইজ
    const fontSizes = Array.from({ length: 16 }, (_, i) => i + 5);
  

    
    return (
        <div className={`
            ${qBuilderSettingsOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed top-[50px] left-0 w-[280px] h-[calc(100vh-50px)] 
            bg-white border-r border-gray-200 shadow-2xl transition-transform duration-300 z-[100]
            print:hidden
        `}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <div className="flex items-center gap-2 font-bold text-gray-700">
                    <Settings2 size={18} className="text-blue-600" />
                    <span>সেটিংস</span>
                </div>
                <button
                    onClick={() => setQBuilderSettingOpen(false)}
                    className="p-1 hover:bg-red-50 rounded-full transition-colors group"
                >
                    <X size={20} className="text-gray-400 group-hover:text-red-500" />
                </button>
            </div>

            <div className="p-5 space-y-8">

                {/* Font Size Select Section */}
                <section>
                    <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <Type size={14} />
                        <span>ফন্ট সাইজ (PX)</span>
                    </div>

                    <div className="relative">
                        <select
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                        >
                            {fontSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size} Pixel
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <ChevronDown size={18} />
                        </div>
                    </div>
                </section>

                {/* Language Based Style Section */}
                <section>
                    <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <Globe size={14} />
                        <span>প্রশ্নের ভাষা ও স্টাইল</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Bangla Option */}
                        <button
                            onClick={() => setQuestionLang('bn')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${questionLang === 'bn'
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                }`}
                        >
                            <span className="text-lg font-bold">বাংলা</span>
                            <span className="text-[10px] mt-1 opacity-70">১, ২ | ক, খ</span>
                        </button>

                        {/* English Option */}
                        <button
                            onClick={() => setQuestionLang('en')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${questionLang === 'en'
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                }`}
                        >
                            <span className="text-lg font-bold">English</span>
                            <span className="text-[10px] mt-1 opacity-70">1, 2 | a, b</span>
                        </button>
                    </div>
                </section>

                {/* Info Note */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-10">
                    <p className="text-[11px] text-blue-700 leading-relaxed">
                        <b>টিপস:</b> ভাষা পরিবর্তন করলে আপনার প্রশ্নের ক্রমিক নম্বর এবং অপশনের বুলেটগুলো অটোমেটিক ওই ভাষার স্টাইলে কনভার্ট হয়ে যাবে।
                    </p>
                </div>
            </div>
        </div>
    )
}