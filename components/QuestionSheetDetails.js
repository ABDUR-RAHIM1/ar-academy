import React from 'react';
import { Button } from './ui/button';

export default function QuestionSheetDetails({ data }) {
    const { classId, subjectId, chapterId, questions, createdAt } = data;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-extrabold text-blue-600 mb-2">প্রশ্নপত্রের বিস্তারিত</h1>
                <p className="text-gray-500">ক্লাস, বিষয়, অধ্যায় এবং প্রশ্নসমূহের তথ্য</p>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-inner">
                    <p><strong>ক্লাস:</strong> {classId.name}</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-lg shadow-inner">
                    <p><strong>বিষয়:</strong> {subjectId.name}</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg shadow-inner">
                    <p><strong>অধ্যায়:</strong> {chapterId.name} - {chapterId.title}</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-pink-100 to-pink-50 rounded-lg shadow-inner">
                    <p><strong>প্রস্তুতকরণ তারিখ:</strong> {new Date(createdAt).toLocaleDateString("bn-BD")}</p>
                </div>
            </div>

            {/* Questions */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">প্রশ্নসমূহ</h2>
            <div className="space-y-5">
            {questions.map((q, index) => (
  <div
    key={q.ID}
    className="p-5 border rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
      
      {/* Left side: Question + Options + Correct Answer */}
      <div className="md:w-2/3">
        <p className="font-semibold text-gray-800 mb-2">
          {index + 1}. {q.Question}
        </p>

        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
          <li>{q.Option1}</li>
          <li>{q.Option2}</li>
          <li>{q.Option3}</li>
        </ul>

        <p className="mt-2 text-green-600 font-medium">
          সঠিক উত্তর: <span className="font-bold">{q.CorrectAnswer}</span>
        </p>
      </div>

      {/* Right side: Explanation */}
      {q.Explanation && (
        <div className="mt-4 md:mt-0 md:w-1/3 md:ml-6 text-gray-600">
          <p className="font-medium">ব্যাখ্যা:</p>
          <p>{q.Explanation}</p>
        </div>
      )}
    </div>
  </div>
))}


            </div>

            {/* Download Button */}
            <div className="mt-8 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300">
                    প্রশ্নপত্র ডাউনলোড
                </Button>
            </div>
        </div>
    );
}
