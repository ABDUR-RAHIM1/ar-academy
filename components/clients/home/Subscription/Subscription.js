import React from "react";
import Heading from "../../globals/Heading";
import Link from "next/link";
import { BookOpenCheck, Sparkles, ArrowRight } from "lucide-react";

export default async function Subscription() {
  return (
    <div id="plans" className="relative my-16 px-4 py-16 md:py-24 rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl border border-slate-800">
      
      {/* Background Decor - Floating Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-wide animate-pulse">
          <Sparkles className="w-4 h-4" />
          সীমিত সময়ের অফার
        </div>

        <div className="mb-6">
            {/* Heading text color override for dark background if needed */}
            <Heading text="আপনার পছন্দের কোর্সটি বেছে নিন" className="text-white" />
        </div>
        
        <p className="mb-10 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          সেরা মেন্টরদের নির্দেশনায় শুরু হোক আপনার নতুন যাত্রা। 
          <span className="text-white font-medium"> সীমিত আসন সংখ্যা, </span> 
          তাই আজই নিজের জায়গাটি নিশ্চিত করুন!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/courses"
            className="group relative inline-flex items-center justify-center gap-3 rounded-2xl w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black text-lg py-5 px-10 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 active:scale-95"
          >
            <BookOpenCheck className="w-6 h-6" />
            সবগুলো কোর্স দেখুন
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-slate-500 text-sm font-medium">
             ইতিমধ্যেই <span className="text-blue-400">৫০০০+</span> শিক্ষার্থী যুক্ত হয়েছেন
          </p>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
    </div>
  );
}