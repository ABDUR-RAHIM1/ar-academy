"use client"
import { Button } from '@/components/ui/button';
import { COMMON_ALT_TEXT } from '@/constans';
import { heroImage } from '@/Images/Images';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen, FiUserCheck } from 'react-icons/fi';
import heroImg from "@/public/Images/heroImg3.png"
export default function Hero() {
  return (
    <div className="relative w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-5 md:px-16 py-10 md:py-24 border-b overflow-hidden bg-white">
      
      {/* Background Decor */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      {/* Text Content */}
      <div className="w-full lg:w-[55%] text-center lg:text-left space-y-6 md:space-y-8 z-10">
        
        {/* Main Heading Fix */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.2] md:leading-[1.1]">
             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
               অনুশীলন একাডেমী
             </span>
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-700">
            শেখা এখন আরও <span className="text-blue-600 italic">সহজ ও মজার</span>
          </h2>
        </div>

        <p className="text-base md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          এক জায়গায় সবকিছু: পড়াশোনা, প্রস্তুতি, পরীক্ষা ও মূল্যায়ন! 
          <span className="hidden md:inline"> অনলাইনে ঘরে বসেই নিজের গতিতে দক্ষ হয়ে ওঠো।</span>
        </p>

        {/* Action Buttons - Mobile: 2 Columns, Desktop: 2 Columns */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto lg:mx-0">
          
          <Button
            asChild
            className="group bg-blue-600 hover:bg-blue-700 text-white h-12 md:h-14 rounded-xl md:rounded-2xl shadow-lg transition-all duration-300"
          >
            <Link href="/account/student/register" className="flex items-center justify-center gap-1 md:gap-2 text-[12px] md:text-lg font-semibold">
              শিক্ষার্থী <FiArrowRight className="hidden md:block group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-12 md:h-14 rounded-xl md:rounded-2xl border-2 border-slate-200 hover:bg-slate-50 transition-all text-[12px] md:text-lg font-semibold"
          >
            <Link href="/account/subAdmin/register" className="flex items-center justify-center gap-1 md:gap-2">
              <FiUserCheck className="hidden md:block" /> সাব অ্যাডমিন
            </Link>
          </Button>

          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white h-12 md:h-14 rounded-xl md:rounded-2xl shadow-lg transition-all text-[12px] md:text-lg font-semibold"
          >
            <Link href="/courses" className="flex items-center justify-center gap-1 md:gap-2">
               <FiBookOpen className="hidden md:block" /> কোর্স সমূহ
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all text-[12px] md:text-lg font-semibold"
          >
            <Link href="/categories">ফিচারস</Link>
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[45%] flex justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative animate-float w-[80%] md:w-full">
          <Image
            // src={heroImage}
            src={heroImg}
            width={800}
            height={800}
            alt={COMMON_ALT_TEXT}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}