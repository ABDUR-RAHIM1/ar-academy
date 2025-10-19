import { getStudentCourseListByCourse } from '@/app/apiActions/questions';
import NoData from '@/utils/NoData';
import React from 'react'
import QuestionCard from '../QuestionCard';
import PageBanner from '@/utils/PageBanner';

export default async function ExamList({ params }) {

    const { courseId } = await params;
    const { status, data } = await getStudentCourseListByCourse(courseId);

    if (!status || status !== 200 || !data || data.length <= 0) {
        return <NoData text={"কোন প্রশ্ন পাওয়া যায়নি !"} />
    };

    const dataWithModified = data.map(exam => ({
        ...exam,
        participantCount: Math.floor(Math.random() * 2000) + 800
    }));

    return (
        <div className="bg-blue-50 px-5  min-h-screen">
            <PageBanner text="প্রশ্ন তালিকা" />
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
