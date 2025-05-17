import React from 'react'

export default function ExtractRules() {
    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">📄 ডকুমেন্ট আপলোডের নিয়মাবলি</h2>

            <p className="mb-4 text-gray-700">
                আপনার <code>.docx</code> ফাইল অবশ্যই নিচের নিয়ম অনুযায়ী সাজানো থাকতে হবে, যাতে আমরা স্বয়ংক্রিয়ভাবে Excel ফাইল তৈরি করতে পারি:
            </p>

            <h3 className="font-semibold text-lg mb-2 text-gray-800">🔷 প্রতিটি প্রশ্নের জন্য ৮টি লাইন:</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-1">
                <li>প্রশ্ন নম্বরসহ প্রশ্ন (যেমন: <code>১.</code> বা <code>১)</code>)</li>
                <li>অপশন ১</li>
                <li>অপশন ২</li>
                <li>অপশন ৩</li>
                <li>অপশন ৪</li>
                <li>সঠিক উত্তর (Correct Answer)</li>
                <li>ব্যাখ্যা (Clearance / Explanation)</li>
                <li>বিষয় (Subject Name)</li>
            </ol>

            <h3 className="font-semibold text-lg mb-2 text-gray-800">📝 উদাহরণ:</h3>
            <div className="bg-gray-100 rounded-md p-4 text-sm font-mono whitespace-pre-wrap text-gray-800 mb-4">
                {`* ১. বাংলার নববর্ষ পহেলা বৈশাখ চালু করেছিলেন কে?
* লক্ষণ সেন
* ইলিয়াস শাহ
* আকবর
* বিজয় সেন
* আকবর
* বাংলা সনের প্রবর্তন করেন মুঘল সম্রাট আকবর।
* বাংলা সাহিত্য`}
            </div>

            <h3 className="font-semibold text-lg mb-2 text-red-600">⚠️ গুরুত্বপূর্ণ নির্দেশনা:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>প্রতিটি প্রশ্ন অবশ্যই ঠিক ৮টি লাইনে থাকতে হবে</li>
                <li>যদি কোনো লাইন খালি থাকে, এক্সেলে সেই ঘরে <code>N/A</code> বসানো হবে</li>
                <li>প্রশ্ন নম্বরের শেষে ডট (.) বা বন্ধনী ( ) ব্যবহার করা যেতে পারে (যেমন: <code>১.</code> অথবা <code>১)</code>)</li>
                <li>প্রশ্নের শুরুতে <code>*</code> চিহ্ন ব্যবহার করুন</li>
                <li>অপশন এবং সঠিক উত্তর চিহ্নিত করতে <code>*</code> চিহ্ন ব্যবহার করুন</li>
                <li>ব্যাখ্যা (Clearance) চিহ্নিত করতে <code>~</code> এবং বিষয় (Subject Name) চিহ্নিত করতে <code>!</code> চিহ্ন ব্যবহার করুন</li>
            </ul>
        </div>
    )
}
