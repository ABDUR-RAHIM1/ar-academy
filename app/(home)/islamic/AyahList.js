"use client"
import { useState, useRef } from "react";

export default function AyahList({ verses }) {
    const [selectedAudio, setSelectedAudio] = useState(null); // অডিও সোর্স সংরক্ষণ করবে
    const audioRef = useRef(null); // অডিও প্লেয়ার রেফারেন্স

    const handleAudioChange = (audioSrc) => {
        setSelectedAudio(audioSrc); // সোর্স আপডেট
        if (audioRef.current) {
            audioRef.current.load(); // অডিও প্লেয়ার রিফ্রেশ
            audioRef.current.play(); // অডিও প্লে শুরু করুন
        }
    };
    return (
        <div className="mt-6 space-y-6 pb-20"> {/* নিচে ফিক্সড প্লেয়ারের জন্য স্পেস */}
            {verses.map((ayah, index) => (
                <div
                    key={index}
                    className={`bg-white shadow-md p-6 rounded-lg border relative ${ayah.is_sajdah_ayat ? "border-red-500" : "border-gray-200"
                        }`}
                >
                    {/* আয়াত সংখ্যা */}
                    <span className="absolute top-2 right-3 text-gray-400 text-sm">({ayah.id})</span>

                    {/* আরবি টেক্সট */}
                    <p className="text-right text-2xl font-semibold text-gray-800 leading-loose">
                        {ayah.arabic_text}
                    </p>

                    {/* বাংলা অনুবাদ */}
                    <p className="text-lg text-gray-700 mt-2">{ayah.bangl_text}</p>

                    {/* ইংরেজি অনুবাদ */}
                    <p className="text-sm text-gray-500 italic mt-1">"{ayah.english_text}"</p>

                    {/* "শুনুন" বাটন */}
                    <button
                        className="mt-4 px-4 py-2 bg1 text-white rounded hover:bg2 transition"
                        onClick={() => handleAudioChange(ayah.audio)}
                    >
                        🔊 
                    </button>

                    {/* অতিরিক্ত তথ্য */}
                    <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-3">
                        <span className="bg-gray-100 px-2 py-1 rounded">📖 পৃষ্ঠা: {ayah.page}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">🕌 রুকু: {ayah.ruku}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">📖 জুজ: {ayah.juz}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">📖 মানযিল: {ayah.manzil}</span>
                        {ayah.is_sajdah_ayat && (
                            <span className="bg-red-200 text-red-600 px-2 py-1 rounded">🕌 সিজদাহ আয়াত</span>
                        )}
                    </div>
                </div>
            ))}

            {/* ✅ ফিক্সড অডিও প্লেয়ার */}
            {selectedAudio && (
                <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 border-t flex items-center justify-between">
                    <audio ref={audioRef} controls autoPlay className="w-full">
                        <source src={selectedAudio} type="audio/mp3" />
                        আপনার ব্রাউজার অডিও ফরম্যাট সাপোর্ট করে না।
                    </audio>
                </div>
            )}
        </div>
    );
}
