import React from 'react';
import PageBanner from '@/utils/PageBanner';
import {
    Code2,
    Lightbulb,
    Rocket,
    GraduationCap,
    MonitorSmartphone,
    Cpu,
    CheckCircle2,
    Heart,
    Users
} from 'lucide-react';

import developer from "@/public/Images/developer.png"
import Image from 'next/image';

// SEO Metadata
export const metadata = {
    title: 'ডেভেলপারের কথা | Onushilon Academy',
    description: 'জানুন অনুশীলন একাডেমি তৈরির পেছনের গল্প। আব্দুর রহিম, একজন সেলফ-টট সফটওয়্যার ইঞ্জিনিয়ারের সমস্যা সমাধানের যাত্রা এবং তার তৈরি ক্যাম্পাস কম্পিউটার ও স্কুল ম্যানেজমেন্ট সফটওয়্যার সম্পর্কে।',
    keywords: ['Abdur Rahim Developer', 'Onushilon Academy Founder', 'MERN Stack Developer Bangladesh', 'Campus Computer Software', 'Software Engineer Story'],
};

export default function DeveloperKotha() {
    const skills = [
        "MERN Stack (MongoDB, Express, React, Node)",
        "Next.js (App Router) & Tailwind CSS",
        "React Native & Expo Router",
        "Database Design & API Integration",
        "Problem Solving & Logic Building",
        "IT Business Automation"
    ];

    const projects = [
        {
            title: "Onushilon Academy",
            role: "Live Exam & Question Builder",
            desc: "শিক্ষার্থীদের রিয়েল-টাইম পরীক্ষা এবং শিক্ষকদের জন্য স্বয়ংক্রিয় প্রশ্ন তৈরির একটি সম্পূর্ণ ইকোসিস্টেম।"
        },
        {
            title: "Campus Computer",
            role: "College Student Assistant",
            desc: "কলেজ শিক্ষার্থীদের অনলাইন আবেদন, স্টেশনারি এবং ডিজিটাল সেবা সহজ করার জন্য একটি নিবেদিত প্ল্যাটফর্ম।"
        },
        {
            title: "School Management System",
            role: "Digital Administration",
            desc: "স্কুল, কলেজ, বিশ্ববিদ্যালয়ের প্রশাসনিক কাজগুলো ডিজিটাল করার একটি বিশেষ সমাধান।"
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* ১. ব্যানার সেকশন */}
            <PageBanner text="ডেভেলপারের কথা" />

            <div className="max-w-6xl mx-auto px-4">

                {/* ২. ইন্ট্রোডাকশন (Self-taught Story) */}
                <section className="mt-16 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold">
                            <Cpu size={18} />
                            <span>Self-taught Software Engineer</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-800 leading-10">
                            আমি <span className="text-indigo-600">আব্দুর রহিম</span>, কোডিংয়ের মাধ্যমে সমস্যা সমাধানে বিশ্বাসী।
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            কম্পিউটার সায়েন্সের জটিল বিষয়গুলো আমি নিজের প্রচেষ্টায় (Self-learning) আয়ত্ত করেছি। প্রথাগত চাকরির পেছনে না ছুটে আমি সবসময় চেয়েছি এমন কিছু তৈরি করতে যা মানুষের বাস্তব জীবনের সমস্যা সমাধান করবে। আমার লার্নিং এবং ডেভেলপমেন্টের মূল কেন্দ্রবিন্দু হলো 'প্রবলেম সলভিং'।
                        </p>
                    </div>
                    <div className="flex-1 bg-slate-100 aspect-square rounded-[3rem] rotate-3 border-4 border-indigo-100 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-indigo-100">
                        {/* <Code2 size={120} className="text-indigo-200" />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent"></div> */}
                        <Image
                            src={developer}
                            width={500}
                            height={500}
                            alt='Abdur Rahim - Developer'
                            className='w-full h-full'
                        />
                    </div>
                </section>

                {/* ৩. কেন 'অনুশীলন একাডেমি'? (The Vision) */}
                <section className="mt-24 p-8 md:p-16 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Lightbulb size={300} />
                    </div>
                    <div className="relative z-10 max-w-3xl">
                        <h3 className="text-2xl md:text-4xl font-bold mb-8 flex items-center gap-3">
                            <Rocket className="text-indigo-400" /> কেন এই 'অনুশীলন একাডেমি'?
                        </h3>
                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                            <p>
                                আমাদের দেশে অনেক মেধাবী শিক্ষার্থী সঠিক গাইডলাইন এবং প্র্যাকটিস করার প্ল্যাটফর্মের অভাবে পিছিয়ে পড়ে। বিশেষ করে একাডেমিক এবং জব প্রিপারেশনের জন্য একটি কেন্দ্রীয় 'Live Exam' সিস্টেমের অভাব আমি অনুভব করেছি।
                            </p>
                            <p>
                                সেই অভাব থেকেই **অনুশীলন একাডেমি**-র জন্ম। এটি কেবল একটি ওয়েবসাইট নয়, এটি একটি সম্পূর্ণ **Question Builder** এবং **Exam Management** ইকোসিস্টেম, যা শিক্ষার্থীদের প্রস্তুতিকে করবে আরও স্মার্ট এবং কার্যকর।
                            </p>
                        </div>
                    </div>
                </section>

                {/* ৪. প্রবলেম সলভার হিসেবে আমার প্রজেক্টগুলো */}
                <section className="mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <h3 className="text-3xl font-black text-slate-800">রিয়েল-লাইফ প্রবলেম সলভার</h3>
                            <p className="text-slate-500 mt-2 font-medium">আমার তৈরি উল্লেখযোগ্য সফটওয়্যার সমাধানসমূহ</p>
                        </div>
                        <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100">
                            মোট প্রজেক্ট: ২০+
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                            <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    {i === 1 ? <Users size={28} /> : <MonitorSmartphone size={28} />}
                                </div>
                                <h4 className="text-xl font-bold text-slate-800 mb-2">{p.title}</h4>
                                <p className="text-indigo-600 text-[13px] font-black uppercase tracking-wider mb-4">{p.role}</p>
                                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ৫. টেকনিক্যাল স্কিলস */}
                <section className="mt-24 bg-gradient-to-br from-indigo-50 to-white rounded-[3rem] p-8 md:p-16 border border-indigo-100">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 w-full">
                            <h3 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                <GraduationCap className="text-indigo-600" /> টেকনিক্যাল স্কিলস
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow-sm border border-indigo-100/50 hover:border-indigo-400 transition-colors">
                                        <CheckCircle2 size={18} className="text-emerald-500" />
                                        <span className="font-bold text-slate-700 text-[15px]">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/20 border border-slate-50">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">ভবিষ্যৎ পরিকল্পনা</h3>
                            <p className="text-slate-600 leading-relaxed font-medium mb-6">
                                বর্তমানে আমি **Campus Computer**-কে কলেজ শিক্ষার্থীদের জন্য একটি পূর্ণাঙ্গ অনলাইন অ্যাসিস্ট্যান্ট হিসেবে গড়ে তুলছি। আমার লক্ষ্য হলো প্রযুক্তির মাধ্যমে ল্যাপটপ বা কম্পিউটার ছাড়াই একজন শিক্ষার্থী যেন তার প্রয়োজনীয় সব ডিজিটাল সেবা হাতের মুঠোয় পায়।
                            </p>
                            <div className="flex items-center gap-2 text-indigo-600 font-black pt-4 border-t border-slate-50">
                                <Heart fill="currentColor" size={20} className="animate-pulse" />
                                <span>Build with Passion, Driven by Logic</span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}