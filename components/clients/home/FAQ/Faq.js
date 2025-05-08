"use client"
import { useState } from "react"; 
import { FiChevronDown } from "react-icons/fi";

const faqData = [
    {
        question: "এই প্ল্যাটফর্মে কোন কোন বিষয়ের উপর কোর্স পাওয়া যাবে?",
        answer:
            "আমাদের প্ল্যাটফর্মে বাংলা, ইংরেজি, গণিত, ইসলামিক (কুরআন-হাদিস), জব প্রস্তুতি, ভর্তি প্রস্তুতি সহ আরও অনেক বিষয়ের কোর্স রয়েছে।",
    },
    {
        question: "কীভাবে পরীক্ষায় অংশগ্রহণ করবো?",
        answer:
            "একটি বিষয় নির্বাচন করে সেখানে নির্ধারিত পরীক্ষা বোতামে ক্লিক করে আপনি অনলাইন পরীক্ষায় অংশ নিতে পারবেন। ফলাফল আপনার প্রোফাইলে সংরক্ষিত থাকবে।",
    },
    {
        question: "এই সাইটে কিভাবে রেজিস্ট্রেশন করবো?",
        answer:
            "হোমপেজে 'Join Now' অথবা 'Register' বাটনে ক্লিক করে আপনার নাম, মোবাইল নম্বর এবং পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন সম্পন্ন করতে পারবেন।",
    },
    {
        question: "ফলাফল কিভাবে দেখবো?",
        answer:
            "আপনার প্রোফাইল থেকে যেকোনো পরীক্ষার ফলাফল, পারফরম্যান্স রিপোর্ট ও বিষয়ভিত্তিক বিশ্লেষণ দেখতে পারবেন।",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gradient-to-br from-cyan-600 to-blue-800 text-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">প্রশ্নোত্তর (FAQ)</h2>
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-md">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center text-left"
                            >
                                <span className="text-lg font-semibold">{item.question}</span>
                                <FiChevronDown
                                    className={`h-5 w-5 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="mt-3 text-sm text-white/90">{item.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
