import React from 'react';

export default function HowToWork() {
    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                অ্যাডমিন ড্যাশবোর্ড – কিভাবে কাজ করে?
            </h1>

            <div className="space-y-6 text-lg leading-8">

                {/* 1. Dashboard Overview */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600">১. ড্যাশবোর্ড ওভারভিউ</h2>
                    <p>এই অংশে সাইটের সার্বিক চিত্র দেখা যাবে – মোট ইউজার, ক্যাটাগরি, সাব-ক্যাটাগরি, অধ্যায়, প্রশ্ন ইত্যাদি সংক্ষেপে উপস্থাপন করা হবে।</p>
                </div>

                {/* 2. Categories */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600">২. ক্যাটাগরি ব্যবস্থাপনা</h2>
                    <ul className="list-disc pl-5">
                        <li>👉 <strong>View All Categories:</strong> পূর্বে যুক্ত সব ক্যাটাগরি দেখা যাবে।</li>
                        <li>👉 <strong>Add Category:</strong> নতুন ক্যাটাগরি যোগ করার ফর্ম থাকবে।</li>
                    </ul>
                </div>

                {/* 3. Sub-Categories */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600">৩. সাব-ক্যাটাগরি ব্যবস্থাপনা</h2>
                    <p>প্রতিটি সাব-ক্যাটাগরি যোগ করার সময় সংশ্লিষ্ট ক্যাটাগরির ID দিয়ে সংযুক্ত করতে হবে।</p>
                    <ul className="list-disc pl-5">
                        <li>👉 <strong>View All:</strong> সকল সাব-ক্যাটাগরি দেখা যাবে।</li>
                        <li>👉 <strong>Add Sub-Category:</strong> সাব-ক্যাটাগরি যোগ করার সময় parent ক্যাটাগরি সিলেক্ট করতে হবে।</li>
                    </ul>
                </div>

                {/* 4. Chapters */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600">৪. অধ্যায় (Chapter) ব্যবস্থাপনা</h2>
                    <p>চ্যাপ্টার যুক্ত করার সময় অবশ্যই সংশ্লিষ্ট সাব-ক্যাটাগরির ID যুক্ত করতে হবে।</p>
                    <ul className="list-disc pl-5">
                        <li>👉 <strong>View All:</strong> সমস্ত চ্যাপ্টারের তালিকা দেখা যাবে।</li>
                        <li>👉 <strong>Add Chapter:</strong> সাব-ক্যাটাগরি নির্বাচন করে নতুন অধ্যায় যুক্ত করা যাবে।</li>
                    </ul>
                </div>

                {/* 5. Questions */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600">৫. প্রশ্ন (Questions) ব্যবস্থাপনা</h2>
                    <p>প্রতিটি প্রশ্ন সাব-ক্যাটাগরির সাথে সম্পর্কযুক্ত হবে। প্রশ্ন যুক্ত করার জন্য <strong>Excel Sheet</strong> আপলোড করতে হবে।</p>
                    <ul className="list-disc pl-5">
                        <li>👉 <strong>View All:</strong> পূর্বে যুক্ত প্রশ্নসমূহ দেখা যাবে।</li>
                        <li>👉 <strong>Add Questions:</strong> Excel (.xlsx) ফাইল আপলোডের মাধ্যমে প্রশ্ন যুক্ত করা যাবে।</li>
                    </ul>
                </div>

                {/* 6. Users */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600">৬. ইউজার ব্যবস্থাপনা</h2>
                    <ul className="list-disc pl-5">
                        <li>👉 <strong>User Management:</strong> সকল ইউজারের তালিকা ও অ্যাকশন (Active, Block ইত্যাদি)।</li>
                        <li>👉 <strong>Result:</strong> ইউজারদের পরীক্ষার ফলাফল দেখা যাবে।</li>
                        <li>👉 <strong>Others:</strong> ইউজার সম্পর্কিত অন্যান্য তথ্য ও সেটিংস।</li>
                    </ul>
                </div>

                {/* 7. Settings */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600">৭. সেটিংস</h2>
                    <ul className="list-disc pl-5">
                        <li>👉 <strong>Profile Settings:</strong> অ্যাডমিন নিজের প্রোফাইল তথ্য আপডেট করতে পারবেন।</li>
                        <li>👉 <strong>How to Work:</strong> এই পেইজ যেখানে ড্যাশবোর্ডের ব্যবহার নির্দেশনা দেওয়া হয়েছে।</li>
                    </ul>
                </div>

                {/* 8. Logout */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600">৮. লগআউট</h2>
                    <p>ড্যাশবোর্ড থেকে সুরক্ষিতভাবে বের হওয়ার জন্য লগআউট অপশন ব্যবহার করতে হবে।</p>
                </div>

            </div>
        </div>
    );
}
