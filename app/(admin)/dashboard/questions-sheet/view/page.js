import { getQuestionsHSeetOverview } from '@/app/apiActions/questionSheet'
import NoData from '@/utils/NoData';
import React from 'react'
import QuestionSheetListTable from './QuestionSheetListTable';

export default async function QuestionsSheetManage() {

    const { status, data } = await getQuestionsHSeetOverview();
 

    if (status !== 200 || !data) {
        return <NoData text={"প্রশ্নপত্র পাওয়া যায়নি!"} />
    }

    return <QuestionSheetListTable data={data} />
}
