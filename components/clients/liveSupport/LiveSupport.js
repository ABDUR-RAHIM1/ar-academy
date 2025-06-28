"use client";
import React, { useState } from "react";

const dummyQA = [
    {
        question: "কোর্স কত টাকা | price | course price",
        answer: "আমাদের কোর্সের মূল্য বিভিন্ন রকম, বিস্তারিত জানতে ওয়েবসাইটের কোর্স পেইজ ভিজিট করুন।"
    },
    {
        question: "কিভাবে সাবস্ক্রিপশন  কিনবো | how to purchase subscription | kivabe subscription kinbo",
        answer: "আমাদের ওয়েবসাইটে সাবস্ক্রিপশন প্ল্যান থেকে আপনার পছন্দ মতো প্ল্যান বেছে নিয়ে সাবস্ক্রিপশন কিনতে পারবেন।"
    },
    {
        question: "কি কি বিষয় আছে | available subjects | course list | ki ki bisoy ache",
        answer: "আমাদের প্ল্যাটফর্মে BCS, Bank Job, সকল চাকরির প্রস্তুতি, অনলাইন লাইভ পরীক্ষা, এবং একাডেমিক কোর্স সমূহ পাওয়া যায়।"
    },
    {
        question: "পেমেন্ট মেথড কি কি | payment methods | kivabe payment korbo",
        answer: "আপনি বিকাশ, নগদ, রকেট অথবা ব্যাংক ট্রান্সফার এর মাধ্যমে পেমেন্ট করতে পারবেন।"
    },
];



export default function LiveSupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const toggleChat = () => setIsOpen(!isOpen);

    const findAnswer = (msg) => {
        const userMsg = msg.toLowerCase();

        for (const qa of dummyQA) {
            const keywords = qa.question.toLowerCase().split("|").map(k => k.trim());

            for (const word of keywords) {
                if (userMsg.includes(word)) {
                    return qa.answer;
                }
            }
        }

        return "আপনার প্রশ্নটি বুঝতে পারিনি। দয়া করে আরেকবার স্পষ্টভাবে লিখুন।";
    };



    const handleSend = () => {
        if (message.trim() === "") return;

        const userMsg = message.trim();

        // Show user message
        setChat((prev) => [...prev, { text: userMsg, sender: "user" }]);

        // Find answer from dummyQA
        const ans = findAnswer(userMsg);

        // Show answer after short delay (optional)
        setTimeout(() => {
            setChat((prev) => [...prev, { text: ans, sender: "system" }]);
        }, 500);

        setMessage("");
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 font-sans">
            {isOpen && (
                <div className="w-80 h-[450px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-2 rounded-t-lg">
                        <h4 className="font-semibold text-lg">Onushilon Academy Support</h4>
                        <button
                            onClick={toggleChat}
                            className="text-white text-xl hover:text-gray-300"
                            aria-label="Close chat"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="flex-1 p-4 text-gray-700 overflow-y-auto space-y-2 bg-gray-50">
                        {chat.length === 0 ? (
                            <p className="text-gray-500">
                                আপনার প্রশ্ন লিখুন, আমরা দ্রুত উত্তর দেব।
                            </p>
                        ) : (
                            chat.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`text-sm p-2 rounded-lg max-w-[80%] ${msg.sender === "user"
                                        ? "bg-blue-100 self-end ml-auto"
                                        : "bg-green-100 self-start"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="flex items-center p-2 border-t">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-400 text-sm"
                            placeholder="আপনার বার্তা লিখুন..."
                        />
                        <button
                            onClick={handleSend}
                            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-sm"
                        >
                            পাঠান
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {
                !isOpen &&
                <button
                    onClick={toggleChat}
                    className="bg-blue-600 text-white rounded-full px-5 py-3 shadow-md hover:bg-blue-700 transition"
                    aria-label="Toggle live support chat"
                >
                    Live Support
                </button>
            }
        </div>
    );
}
