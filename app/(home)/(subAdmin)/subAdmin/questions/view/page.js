import { getSingleQuestionBySubAdmin } from '@/app/apiActions/questions'
import NoData from '@/utils/NoData';
import React from 'react'
import QuestionsTable from '../QuestionsTable';

export default async function ManegeQuestions() {

  const { status, data } = await getSingleQuestionBySubAdmin();

  if (!status || status !== 200 || !data) {
    return <NoData text={data.message || "কোন প্রশ্ন পাওয়া যায়নি !"} />
  }


  return (
    <div className=' overflow-x-auto'>
      <QuestionsTable questionsData={data} />
    </div>
  )
}; 
