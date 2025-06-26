"use client"
import { demoProfilePhoto } from "@/Images/Images";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function LiveSupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [firstMessageSent, setFirstMessageSent] = useState(false);

    useEffect(() => {
        const savedChat = Cookies.get("live_support_chat");
        if (savedChat) {
            setChat(JSON.parse(savedChat));
            setFirstMessageSent(true);
        }
    }, []);

    useEffect(() => {
        if (chat.length > 0) {
            Cookies.set("live_support_chat", JSON.stringify(chat), { expires: 1 / 24 }); // 1 hour expiry
        }
    }, [chat]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (message.trim() === "") return;

        const updatedChat = [...chat, { text: message, sender: "user" }];
        setChat(updatedChat);
        setMessage("");

        if (!firstMessageSent) {
            setFirstMessageSent(true);

            setTimeout(() => {
                setChat((prevChat) => [
                    ...prevChat,
                    {
                        text: "স্বাগতম! আমাদের সাপোর্ট টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে। দয়া করে আপনার প্রশ্নের জন্য অপেক্ষা করুন।",
                        sender: "system",
                    },
                ]);
            }, 2000);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 font-sans">
            {isOpen && (
                <div className="w-80 h-[450px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-2 rounded-t-lg">
                        <div className="flex items-center space-x-2">
                            <Image
                                width={100}
                                height={100}
                                src={demoProfilePhoto}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <h4 className="font-semibold text-lg">Onushilon Academy</h4>
                        </div>
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
                            <p className="text-gray-500">আপনার প্রশ্ন লিখুন, আমরা দ্রুত উত্তর দেব।</p>
                        ) : (
                            chat.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`text-sm p-2 rounded-lg max-w-[80%] ${msg.sender === "user"
                                        ? "bg-blue-100 self-end ml-auto"
                                        : msg.sender === "system"
                                            ? "bg-green-100 self-start"
                                            : "bg-gray-200"
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
            <button
                onClick={toggleChat}
                className="bg-blue-600 text-white rounded-full px-5 py-3 shadow-md hover:bg-blue-700 transition"
                aria-label="Toggle live support chat"
            >
                {isOpen ? "Close Chat" : "Live Support"}
            </button>
        </div>
    );
}
