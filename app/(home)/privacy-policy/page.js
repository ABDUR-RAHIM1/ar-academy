import { privecyPolicyMetaData } from "@/seo/privecyPolicyMetaData";
import Link from "next/link";
import React from "react";

export const metadata = privecyPolicyMetaData;

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">গোপনীয়তা নীতি</h1>

        <p className="mb-4">
          আমরা আপনার গোপনীয়তাকে গুরুত্ব সহকারে গ্রহণ করি। এই নীতিতে ব্যাখ্যা করা হয়েছে কিভাবে আমরা আপনার তথ্য সংগ্রহ, ব্যবহার এবং রক্ষা করি।
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">তথ্য সংগ্রহ</h2>
        <p className="mb-4">
          আমরা আপনার নাম, ইমেইল ঠিকানা, ফোন নম্বর এবং আপনার প্রদত্ত অন্যান্য তথ্য সংগ্রহ করতে পারি যখন আপনি আমাদের ওয়েবসাইট ব্যবহার করেন বা ফর্ম পূরণ করেন।
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">তথ্যের ব্যবহার</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>আপনার অনুরোধ এবং অর্ডার প্রক্রিয়া করতে।</li>
          <li>আপনার সাথে যোগাযোগ করতে এবং সেবা উন্নত করতে।</li>
          <li>নতুন পণ্য, অফার বা আপডেট জানাতে।</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">তথ্যের সুরক্ষা</h2>
        <p className="mb-4">
          আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষার জন্য পর্যাপ্ত নিরাপত্তা ব্যবস্থা গ্রহণ করেছি। তৃতীয় পক্ষের সাথে আপনার তথ্য শেয়ার করা হয় না, যদি না এটি আইনত প্রয়োজন হয়।
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">কুকিজ (Cookies)</h2>
        <p className="mb-4">
          আমাদের ওয়েবসাইটে আপনার অভিজ্ঞতা উন্নত করার জন্য আমরা কুকিজ ব্যবহার করতে পারি। আপনি চাইলে আপনার ব্রাউজার থেকে কুকিজ নিষ্ক্রিয় করতে পারেন।
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">তৃতীয় পক্ষের লিঙ্ক</h2>
        <p className="mb-4">
          আমাদের ওয়েবসাইটে অন্যান্য ওয়েবসাইটের লিঙ্ক থাকতে পারে। তাদের গোপনীয়তা নীতির জন্য আমরা দায়ী নই, অনুগ্রহ করে তারা কীভাবে তথ্য ব্যবহার করে তা নিজে যাচাই করুন।
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">নীতির পরিবর্তন</h2>
        <p className="mb-4">
          আমরা আমাদের গোপনীয়তা নীতিতে যেকোনো সময় পরিবর্তন আনতে পারি। পরিবর্তন হলে আমরা এই পৃষ্ঠায় আপডেট করবো।
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-2">যোগাযোগ</h2>
        <p>
          যদি আপনি আমাদের গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন বা উদ্বেগ প্রকাশ করতে চান, অনুগ্রহ করে আমাদের সাথে <Link href={"/contact"} className=" inline-block border py-2 px-4 my-4 text-blue-600 font-semibold">যোগাযোগ করুন</Link>।
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
