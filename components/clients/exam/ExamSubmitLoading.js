"use client";
import React from "react";
import { Loader2 } from "lucide-react"; // lucide-react icon ব্যবহার করছি

export default function ExamSubmitLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-[9999]">
      <div className="bg-white/90 rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10 mb-3" />
        <p className="text-lg font-semibold text-gray-700">জমা দেওয়া হচ্ছে...</p>
        <p className="text-sm text-gray-500 mt-1">একটু অপেক্ষা করুন</p>
      </div>
    </div>
  );
}
