import { getSingleQuestion } from '@/app/apiActions/questions';
import ExamForm from '@/components/clients/exam/ExamForm';
import ExamSidebar from '@/components/clients/exam/ExamSidebar';
import NoData from '@/utils/NoData';
import React from 'react';

export default async function ExamQuestionsPage({ params }) {
    const { questionId } = await params;
    const { status, data } = await getSingleQuestion(questionId);


    if (!status || status !== 200 || !data) {
        return <NoData text={data.message || "কোন প্রশ্ন পাওয়া যায়নি !"} />
    }


    return (
        <>
            <div className=' bg-gray-100 px-3 md:px-12 py-10 flex items-start justify-between flex-wrap gap-4'>

                <main className="w-full md:w-[65%] p-3 md:p-3 bg-white shadow-md rounded-lg">

                    <ExamForm questionsData={data} />
                </main>
                {/*  related questions */}
                <ExamSidebar data={data} />
            </div>

        </>
    );
}
