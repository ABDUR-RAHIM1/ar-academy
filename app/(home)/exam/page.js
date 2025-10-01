import NoData from '@/utils/NoData'; 
import { getAllQuestions } from '@/app/apiActions/questions';
import PageBanner from '@/utils/PageBanner'; 
import { examMetaData } from '@/seo/examMetaData';
import QuestionClient from './QuestionClient';

 
export const metadata = examMetaData;

export default async function ExamPage() {
    const { status, data } = await getAllQuestions();

    if (!status || status !== 200 || !data || data.length <= 0) {
        return <NoData text={"কোন প্রশ্ন পাওয়া যায়নি !"} />
    }


    const dataWithModified = data.map(exam => ({
        ...exam,
        participantCount: Math.floor(Math.random() * 2000) + 800
    }));

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageBanner text="নিজেকে যাচাই করুন" />

            <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
                <QuestionClient questions={dataWithModified} /> {/* 👈 pass data to client */}
            </div>
        </div>
    );
}
