import { getSingleQuestionsSheetById } from '@/app/apiActions/questionSheet';
import QuestionSheetDetails from '@/components/QuestionSheetDetails';
import NoData from '@/utils/NoData';
import React from 'react'

export default async function SheetDetails({ params }) {

    const { questionSheetId } = await params;
    const { status, data: questionSheetData } = await getSingleQuestionsSheetById(questionSheetId);



    if (status !== 200 || !questionSheetData) {
        return <NoData text={questionSheetData?.message} />
    }


    return <QuestionSheetDetails data={questionSheetData} />
}
