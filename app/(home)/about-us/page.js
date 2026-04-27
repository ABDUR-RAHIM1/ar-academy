import { aboutMetadata } from '@/seo/aboutMetadata'; 
import PageBanner from '@/utils/PageBanner';
import React from 'react';
import { Target, Users, Zap, BookOpenText, Clapperboard, Award, Star } from 'lucide-react';

export const metadata = aboutMetadata;

export default function AboutUs() {

    // ফিচার সেকশনের ডাটা আইকন সহ
    const whyUs = [
        { icon: <Users size={24} />, title: "দক্ষ শিক্ষক", text: "সেরা গাইডলাইন ও কোর্স" },
        { icon: <Zap size={24} />, title: "২৪/৭ অ্যাক্সেস", text: "যেকোনো সময়, যেকোনো জায়গায়" },
        { icon: <BookOpenText size={24} />, title: "মডেল টেস্ট", text: "সেরা এক্সাম প্রিপারেশন" },
        { icon: <Clapperboard size={24} />, title: "লাইভ ক্লাস", text: "ও রেকর্ডেড লেকচার" },
    ];

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* 1. Page Banner */}
            <PageBanner text="আমাদের সম্পর্কে" />

            {/* 2. Hero / Intro Section */}
            <div className="max-w-4xl mx-auto text-center my-16 py-10 px-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full font-bold text-xs uppercase tracking-wider mb-3">
                    অনুশীলন একাডেমি
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight">
                    শেখার নতুন দিগন্তে <br />
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">আপনাকে স্বাগতম!</span>
                </h2>
                <p className="mt-6 text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                    আমরা একটি আধুনিক অনলাইন লার্নিং প্ল্যাটফর্ম, যেখানে একাডেমিক পড়াশোনা, ভর্তি প্রস্তুতি, চাকরি প্রস্তুতি এবং জব এক্সাম প্রশ্ন সমাধানসহ নানান বিষয় শেখার সুযোগ পাবেন। আপনার লক্ষ্য অর্জনে আমরা সর্বদা প্রতিশ্রুতিবদ্ধ।
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 space-y-20">
                {/* 3. আমাদের সেবা (Our Services) */}
                <section>
                    <div className="flex items-center gap-3 mb-10">
                        <Award className="text-indigo-600" size={28} />
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800">আমাদের সেবা</h3>
                        <div className="h-1 flex-1 bg-slate-100 rounded-full ml-4"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "একাডেমিক পড়াশোনা",
                            "ভর্তি প্রস্তুতি",
                            "চাকরি প্রস্তুতি",
                            "জব এক্সাম প্রশ্ন সমাধান",
                            "সাধারণ জ্ঞান",
                            "ক্যারিয়ার গাইডলাইন"
                        ].map((service, index) => (
                            <div key={index} className="group bg-white shadow-sm hover:shadow-xl p-6 rounded-2xl flex items-center gap-4 border border-slate-100 hover:border-indigo-100 transition-all duration-300">
                                <div className="w-12 h-12 bg-indigo-50 group-hover:bg-indigo-600 rounded-xl flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                                    <Target size={24} />
                                </div>
                                <span className="font-bold text-slate-700 text-lg">{service}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. কেন আমাদের প্ল্যাটফর্ম? (Why Us - Re-designed) */}
                <section className="bg-slate-50 py-16 px-6 rounded-3xl border border-slate-100">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800">কেন আমাদের প্ল্যাটফর্ম?</h3>
                        <p className="text-slate-500 mt-2 font-medium">আমরা কেন অন্যদের চেয়ে আলাদা</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {whyUs.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl text-center shadow-sm border border-slate-100">
                                <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-indigo-50">
                                    {feature.icon}
                                </div>
                                <h4 className="font-bold text-slate-800 text-lg">{feature.title}</h4>
                                <p className="text-sm text-slate-500 mt-1.5 font-medium">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. শিক্ষার্থীদের মতামত (Testimonials) */}
                <section>
                    <div className="flex items-center gap-3 mb-10">
                        <Users className="text-indigo-600" size={28} />
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800">আমাদের শিক্ষার্থীরা যা বলে</h3>
                        <div className="h-1 flex-1 bg-slate-100 rounded-full ml-4"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: "সাদিয়া ইসলাম", review: "এই প্ল্যাটফর্মের সাহায্যে আমি চাকরির পরীক্ষার জন্য ভালোভাবে প্রস্তুতি নিতে পেরেছি।" },
                            { name: "রাশেদুল হক", review: "একাডেমিক পড়াশোনার জন্য অসাধারণ! সহজবোধ্য ব্যাখ্যা ও মডেল টেস্টগুলো অনেক সহায়ক।" },
                            { name: "তাহসিন আহমেদ", review: "লাইভ ক্লাস ও রেকর্ডেড লেকচারগুলো খুবই কার্যকরী। আমি দারুণ উপকৃত হয়েছি!" },
                        ].map((student, index) => (
                            <div key={index} className="bg-white shadow-lg p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                                        {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed font-medium">" {student.review} "</p>
                                </div>
                                
                                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm">
                                        {student.name.split(' ').map(n=>n[0]).join('')}
                                    </div>
                                    <p className="text-indigo-700 font-bold">{student.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}