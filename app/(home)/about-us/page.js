import PageBanner from '@/utils/PageBanner';
import React from 'react';

export default function AboutUs() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Banner */}
            <PageBanner text="আমাদের সম্পর্কে" />

            {/* Hero Section */}
            <div className="text-center my-10 py-10 px-4 md:px-8 bg-blue-100 rounded-lg shadow-lg mx-4 md:mx-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">শেখার নতুন দিগন্তে আপনাকে স্বাগতম!</h2>
                <p className="mt-2 text-gray-600 text-sm md:text-base">
                    আমরা একটি আধুনিক অনলাইন লার্নিং প্ল্যাটফর্ম, যেখানে একাডেমিক পড়াশোনা, ভর্তি প্রস্তুতি, চাকরি প্রস্তুতি এবং জব এক্সাম প্রশ্ন সমাধানসহ
                    নানান বিষয় শেখার সুযোগ পাবেন।
                </p>
            </div>

            {/* আমাদের সেবা */}
            <div className="mt-10 px-4 md:px-12">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-[#1e708a] pl-3">📌 আমাদের সেবা</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "🎓 একাডেমিক পড়াশোনা",
                        "📝 ভর্তি প্রস্তুতি",
                        "💼 চাকরি প্রস্তুতি",
                        "📖 জব এক্সাম প্রশ্ন সমাধান",
                        "🧠 সাধারণ জ্ঞান",
                        "🚀 ক্যারিয়ার গাইডলাইন"
                    ].map((service, index) => (
                        <div key={index} className="bg-white shadow-md p-4 rounded-lg flex items-center gap-3 border border-gray-200">
                            <span className="text-blue-500 text-lg">✅</span> {service}
                        </div>
                    ))}
                </div>
            </div>

            {/* কেন আমাদের প্ল্যাটফর্ম? */}
            <div className="mt-12 px-4 md:px-12">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-[#1e708a] pl-3">🔹 কেন আমাদের প্ল্যাটফর্ম?</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>🎯 দক্ষ শিক্ষকদের দ্বারা তৈরি কোর্স ও গাইডলাইন</li>
                    <li>📱 মোবাইল ফ্রেন্ডলি ইন্টারফেস</li>
                    <li>⏳ ২৪/৭ অ্যাক্সেস</li>
                    <li>🎥 লাইভ ক্লাস ও রেকর্ডেড লেকচার</li>
                    <li>📊 মডেল টেস্ট ও এক্সাম প্রিপারেশন</li>
                </ul>
            </div>

            {/* শিক্ষার্থীদের মতামত */}
            <div className="mt-12 px-4 md:px-12 pb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-[#1e708a] pl-3">🗣️ আমাদের শিক্ষার্থীরা যা বলে</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "সাদিয়া ইসলাম", review: "এই প্ল্যাটফর্মের সাহায্যে আমি চাকরির পরীক্ষার জন্য ভালোভাবে প্রস্তুতি নিতে পেরেছি।" },
                        { name: "রাশেদুল হক", review: "একাডেমিক পড়াশোনার জন্য অসাধারণ! সহজবোধ্য ব্যাখ্যা ও মডেল টেস্টগুলো অনেক সহায়ক।" },
                        { name: "তাহসিন আহমেদ", review: "লাইভ ক্লাস ও রেকর্ডেড লেকচারগুলো খুবই কার্যকরী। আমি দারুণ উপকৃত হয়েছি!" },
                    ].map((student, index) => (
                        <div key={index} className="bg-white shadow-lg p-4 rounded-lg border border-gray-200">
                            <p className="text-gray-700">" {student.review} "</p>
                            <p className="mt-2 text-blue-600 font-semibold">- {student.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
