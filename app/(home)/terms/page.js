import React from 'react';
import { ShieldCheck, Scale, FileText, Lock, Bell, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const TermsAndConditions = () => {
    const termsData = [
        {
            title: "১. সাধারণ নিয়মাবলী",
            icon: Scale,
            content: "অনুশীলন একাডেমির সেবা গ্রহণ করার মাধ্যমে আপনি আমাদের সকল নিয়ম ও শর্তাবলী মেনে নিচ্ছেন বলে গণ্য হবে। আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার রাখি।"
        },
        {
            title: "২. অ্যাকাউন্ট এবং নিরাপত্তা",
            icon: Lock,
            content: "রেজিস্ট্রেশনের সময় আপনাকে সঠিক তথ্য প্রদান করতে হবে। আপনার অ্যাকাউন্টের পাসওয়ার্ড গোপন রাখা আপনার দায়িত্ব। ডিফল্ট পাসওয়ার্ড দ্রুত পরিবর্তন করার পরামর্শ দেওয়া হচ্ছে।"
        },
        {
            title: "৩. কোর্স এবং পেমেন্ট",
            icon: FileText,
            content: "যেকোনো কোর্সে ভর্তি হওয়ার জন্য নির্ধারিত ফি পরিশোধ করতে হবে। পেমেন্ট সফল হওয়ার পর আপনি কোর্সের এক্সেস পাবেন। পেমেন্ট সংক্রান্ত যেকোনো সমস্যার জন্য আমাদের সাপোর্টে যোগাযোগ করুন।"
        },
        {
            title: "৪. কন্টেন্ট ব্যবহারের নীতিমালা",
            icon: ShieldCheck,
            content: "আমাদের প্ল্যাটফর্মের সকল ভিডিও, লেকচার শিট এবং প্রশ্নপত্র শুধুমাত্র ব্যক্তিগত শিক্ষার জন্য। এগুলো বাণিজ্যিক উদ্দেশ্যে ব্যবহার বা অন্য কোথাও শেয়ার করা আইনত দণ্ডনীয়।"
        },
        {
            title: "৫. রিফান্ড পলিসি",
            icon: Bell,
            content: "কোর্সে ভর্তি হওয়ার নির্দিষ্ট সময় পর (যদি প্রযোজ্য হয়) সাধারণত রিফান্ড দেওয়া হয় না। তবে বিশেষ ক্ষেত্রে আমাদের রিফান্ড পলিসি অনুযায়ী সিদ্ধান্ত নেওয়া হবে।"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 md:px-0">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-block p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
                        <Scale size={32} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">শর্তাবলী ও নীতিমালা</h1>
                    <p className="text-slate-500 font-medium">সর্বশেষ আপডেট: ২৭ এপ্রিল, ২০২৬</p>
                </div>

                {/* Main Content Area */}
                <div className="bg-white shadow-xl shadow-slate-200/60 rounded-[2.5rem] p-6 md:p-12 border border-slate-100">
                    <p className="text-slate-600 leading-relaxed mb-10 text-lg">
                        অনুশীলন একাডেমিতে আপনাকে স্বাগতম। আমাদের সেবাগুলো স্বচ্ছ এবং সুন্দরভাবে পরিচালনার জন্য কিছু নিয়ম অনুসরণ করা হয়। দয়া করে নিচের শর্তাবলীগুলো মনোযোগ দিয়ে পড়ুন।
                    </p>

                    <div className="space-y-10">
                        {termsData.map((item, index) => (
                            <div key={index} className="flex gap-4 md:gap-6 group">
                                <div className="shrink-0 w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    <item.icon size={24} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-16 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                        <div className="flex items-start gap-4">
                            <HelpCircle className="text-indigo-600 mt-1" size={20} />
                            <div>
                                <h4 className="font-bold text-indigo-900 mb-1">আপনার কি কোনো প্রশ্ন আছে?</h4>
                                <p className="text-indigo-700 text-sm">
                                    আমাদের শর্তাবলী নিয়ে কোনো প্রশ্ন থাকলে সরাসরি আমাদের <Link href="/contact" className="underline font-bold">সাপোর্ট সেন্টারে</Link> যোগাযোগ করুন।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center mt-10">
                    <Link href="/" className="text-slate-400 hover:text-indigo-600 font-bold transition-colors text-sm flex items-center justify-center gap-2">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;