import { getStudentQuestionsListByCourse } from '@/app/apiActions/questions';
import NoData from '@/utils/NoData';
import React from 'react';
import QuestionCard from '../QuestionCard';
import { BookOpen, FileText, LayoutGrid, BrushCleaning, ClipboardList } from 'lucide-react'; // আইকন ব্যবহার করলে ভালো দেখায়


export default async function ExamList({ params }) {
    const { courseId } = await params;
    const { status, data } = await getStudentQuestionsListByCourse(courseId);

    if (!status || status !== 200 || !data) {
        return <NoData text={"কোন প্রশ্ন পাওয়া যায়নি !"} />
    };

    const { mcq = [], written = [] } = data;

    return (
        <div className="max-w-7xl mx-auto px-5 py-12 min-h-screen bg-slate-50/30">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4 text-blue-600">
                    <LayoutGrid size={32} />
                </div>
                <h1 className='text-4xl font-extrabold text-slate-800 tracking-tight'>প্রশ্ন তালিকা</h1>
                <p className="text-slate-500 mt-2">আপনার কোর্সের সকল MCQ এবং লিখিত পরীক্ষার তালিকা এখানে পাবেন</p>
            </div>

            {/* MCQ Section */}
            <section className="mb-12">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">MCQ Questions</h2>
                        <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            {mcq.length}
                        </span>
                    </div>
                </div>

                {mcq.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mcq.map((exam, index) => (
                            <QuestionCard key={exam._id || index} exam={exam} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <div className=" bg-amber-500 text-white p-4 rounded-full shadow-sm mb-4">
                            <span className="text-3xl">
                                <ClipboardList />
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">এখনও কোনো প্রশ্ন নেই</h3>
                        <p className="text-gray-500 text-center max-w-[250px] mt-1 text-sm">
                            এই ক্যাটাগরিতে এখনও কোনো প্রশ্ন পাবলিশ করা হয়নি। নিয়মিত আপডেট পেতে আমাদের সাথেই থাকুন।
                        </p>
                    </div>
                )}
            </section>

            {/* Written Section */}
            <section>
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                            <FileText size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Written Questions</h2>
                        <span className="bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            {written.length}
                        </span>
                    </div>
                </div>

                {written.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {written.map((exam, index) => (
                            <QuestionCard key={exam._id || index} exam={exam} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <div className=" bg-amber-500 text-white p-4 rounded-full shadow-sm mb-4">
                            <span className="text-3xl">
                                <ClipboardList />
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">এখনও কোনো প্রশ্ন নেই</h3>
                        <p className="text-gray-500 text-center max-w-[250px] mt-1 text-sm">
                            এই ক্যাটাগরিতে এখনও কোনো প্রশ্ন পাবলিশ করা হয়নি। নিয়মিত আপডেট পেতে আমাদের সাথেই থাকুন।
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}