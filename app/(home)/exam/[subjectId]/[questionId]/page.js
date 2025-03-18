import { getSingleQuestion } from '@/app/apiActions/client/clientApi';
import ExamForm from '@/components/clients/exam/ExamForm';
import NoData from '@/utils/NoData';
import React from 'react';

export default async function ExamQuestionsPage({ params }) {
    const { questionId } = await params;
    const { status, data } = await getSingleQuestion(questionId);

    if (!status || status !== 200 || !data) {
        return <NoData text={"কোন প্রশ্ন পাওয়া যায়নি !"} />
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">

            {/* Question List Form for exam */}
            {/* Sub-category Name */}
            <h1 className="text-2xl font-bold mb-4">বিষয়ঃ {data.sub_categorie.sub_name}</h1>
            <ExamForm questions={data.questions} />

         
        </div>
    );
}