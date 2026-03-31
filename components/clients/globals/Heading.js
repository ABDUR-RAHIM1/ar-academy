import React from 'react'

export default function Heading({ text }) {
    return (
        <div className="text-center my-12 md:my-16">
            <div className="relative inline-block group">
                {/* মূল শিরোনাম */}
                <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight transition-all duration-300">
                    {text || "শীর্ষক নেই"}
                </h2>

                {/* ডেকোরেটিভ আন্ডারলাইন ডিজাইন */}
                <div className="flex items-center justify-center mt-3">
                    {/* বাম পাশের ছোট ডট */}
                    <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>

                    {/* মেইন আন্ডারলাইন বার */}
                    <div className="relative h-[4px] w-24 md:w-32 mx-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-[60%] bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full transition-all duration-700 group-hover:w-full"></div>
                    </div>

                    {/* ডান পাশের ছোট ডট */}
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                </div>


                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl md:text-6xl font-black text-slate-100/50 -z-10 select-none whitespace-nowrap uppercase tracking-[0.2em] hidden sm:block">
                    {text?.slice(0, 10)}
                </span>
            </div>
        </div>
    )
}