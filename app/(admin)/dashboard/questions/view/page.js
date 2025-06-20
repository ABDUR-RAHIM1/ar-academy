
import NoData from '@/utils/NoData';
import React from 'react'
import QuestionsTable from './QuestionsTable';
import { getAllQuestionsForAdmin } from '@/app/apiActions/admin/questions';

export default async function QuestionsList() {
    const { status, data } = await getAllQuestionsForAdmin();


    if (!status || status !== 200 || !data) {
        return <NoData text={"কোন প্রশ্ন পাওয়া যায়নি !"} />
    }

    return <QuestionsTable questionsData={data} />
}
