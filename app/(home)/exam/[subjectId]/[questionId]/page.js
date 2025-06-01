import { getSingleQuestion } from '@/app/apiActions/questions';
import ExamForm from '@/components/clients/exam/ExamForm';
import Heading from '@/components/clients/globals/Heading';
import NoData from '@/utils/NoData';
import { BookOpen } from 'lucide-react';
import React from 'react';

export default async function ExamQuestionsPage({ params }) {
    const { questionId } = await params;
    const { status, data } = await getSingleQuestion(questionId);

    if (!status || status !== 200 || !data) {
        return <NoData text={"কোন প্রশ্ন পাওয়া যায়নি !"} />
    }

    const demoQuestions = [
        {
            id: '1',
            title: 'গণিত মডেল টেস্ট - ১',
            subject: 'গণিত',
        },
        {
            id: '2',
            title: 'বাংলা ব্যাকরণ মডেল টেস্ট',
            subject: 'বাংলা',
        },
        {
            id: '3',
            title: 'ইতিহাস মডেল টেস্ট',
            subject: 'ইতিহাস',
        },
    ];
    return (
        <div className=' bg-gray-100 px-3 md:px-16 py-10 flex items-start justify-between flex-wrap gap-4'>
            <main className="max-w-3xl p-3 md:p-6 bg-white shadow-md rounded-lg">

                {/* Sub-category Name show only if isAll is false */}
                {!data.isAll && data.sub_categorie && (
                    <h1 className="text-2xl font-bold mb-4">
                        বিষয়ঃ {data.sub_categorie.sub_name}
                    </h1>
                )}

                {/* Title for isAll */}
                {data.isAll && data.isAllTitle && (
                    <h1 className="text-2xl font-bold mb-4 color2">
                        {data.isAllTitle}
                    </h1>
                )}
                <ExamForm questions={data.questions} />
            </main>
            {/*  sidbar ti alada component korte hobe */}
            <aside className=' flex-1 bg-white p-3 md:p-6'>
                <h3 className=' font-bold text-2xl italic uppercase border-b color2'>Related Question</h3>
                <ul className="space-y-4">
                    {demoQuestions.map((q) => (
                        <li key={q.id} className="border rounded-lg p-4 hover:shadow transition-all">
                            <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                                <BookOpen className="w-5 h-5" />
                                <span>{q.title}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">বিষয়ঃ {q.subject}</p>
                        </li>
                    ))}
                </ul>

            </aside>
        </div>
    );
}
