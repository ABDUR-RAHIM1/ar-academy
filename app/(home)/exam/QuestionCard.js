import Link from 'next/link'
import React from 'react'

export default function QuestionCard({ exam, index }) {
    const isAll = exam.isAll;

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
            <div className='my-3 flex items-center justify-between flex-wrap'>
                <h3 className="text-lg font-semibold text-gray-900">প্রশ্ন নংঃ {index + 1}</h3>

                {!isAll ? (
                    <button className={` ${exam.sub_categorie.type === "free" ? "bg-green-600" : "bg-red-500"} px-3 py-1 text-sm rounded-md text-white font-normal`}>
                        {exam.sub_categorie.type === "free" ? "ফ্রি" : "প্রিমিয়াম"}
                    </button>

                )
                    :
                    (
                        <button className={` bg-rose-500 hover:bg-rose-600 px-3 py-1 text-sm rounded-md text-white font-normal`}>
                            ফ্রি ট্রায়াল (প্রিমিয়াম)
                        </button>
                    )
                }
            </div>

            <div className='flex flex-col gap-2 text-gray-600 text-sm'>

                {isAll ? (
                    <>
                        <p>📝 প্রশ্ন সেট: <span className="font-medium">{exam.isAllTitle}</span></p>
                    </>
                ) : (
                    <>
                        <p>📝 বিষয়: <span className="font-medium">{exam.sub_categorie.sub_name}</span></p>
                        <p>📝 অধ্যায়: <span className="font-medium">{exam.chapter.chapter_name}</span></p>
                    </>
                )}

                <p>📊 মোট প্রশ্ন: <span className="font-medium">{exam.questions?.length || 0}</span></p>
                <p>👥 অংশগ্রহণকারী: <span className="font-medium">{Math.floor(Math.random() * 2000) + 800}</span></p>
                <p>🔍 প্রশ্ন ধরন: <span className="font-medium">MCQ</span></p>
            </div>

            <Link
                href={
                    isAll
                        ? `/exam/all-subject/${exam._id}`
                        : `/exam/${exam.sub_categorie.identifier}/${exam._id}`
                }
                className="inline-block mt-4 px-3 py-2 bg2 text-white rounded-lg text-sm hover:bg1   transition"
            >
                পরীক্ষা দিন
            </Link>
        </div>
    )
}
