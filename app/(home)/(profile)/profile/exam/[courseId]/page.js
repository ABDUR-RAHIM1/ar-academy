import { getStudentQuestionsListByCourse } from '@/app/apiActions/questions';
import NoData from '@/utils/NoData';
import React from 'react'
import QuestionCard from '../QuestionCard'; 

export default async function ExamList({ params }) {

    const { courseId } = await params;
    const { status, data } = await getStudentQuestionsListByCourse(courseId);
 

    if (!status || status !== 200 || !data || data.length <= 0) {
        return <NoData text={"কোন প্রশ্ন পাওয়া যায়নি !"} />
    };

    const dataWithModified = data.map(exam => ({
        ...exam,
        participantCount: Math.floor(Math.random() * 2000) + 800
    }));

    return (
        <div className=" px-5 my-10  min-h-screen">
           
             <h1 className=' text-center my-8 font-medium text-3xl'>প্রশ্ন তালিকা</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
                {dataWithModified.length > 0 ? (
                    dataWithModified.map((exam, index) => (
                        <QuestionCard key={index} exam={exam} index={index} />
                    ))
                ) : (
                    <p className="text-red-500">কোন প্রশ্ন মেলেনি</p>
                )}
            </div>
        </div>
    )
}
