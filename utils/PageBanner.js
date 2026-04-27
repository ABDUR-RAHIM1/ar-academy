import React from 'react'

export default function PageBanner({ text }) {
    return (
        <div className="relative w-full py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden border-b border-slate-100">
            {/* Background Decorative Elements - হালকা শেইপ যা ব্যানারকে সুন্দর করবে */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="inline-block group">
                    {/* Main Text */}
                    <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight transition-all duration-300">
                        {text || "তথ্য পাওয়া যায়নি"}
                    </h2>
                    
                    {/* Modern Animated Underline */}
                    <div className="mt-4 flex justify-center items-center gap-1">
                        <div className="h-1.5 w-12 bg-indigo-600 rounded-full"></div>
                        <div className="h-1.5 w-3 bg-indigo-300 rounded-full animate-pulse"></div>
                        <div className="h-1.5 w-1.5 bg-indigo-200 rounded-full"></div>
                    </div>
                    
                    {/* Optional Breadcrumb Style Text */}
                    <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-lg mx-auto">
                        আপনার শিক্ষার যাত্রাকে সহজ করতে আমরা আছি আপনার পাশে।
                    </p>
                </div>
            </div>
        </div>
    )
}