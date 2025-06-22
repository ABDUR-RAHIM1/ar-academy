"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { questionDelete } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function QuestionsTable({ questionsData }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (questionsData) {
            setQuestions(questionsData)
        }
    }, [questionsData]);

    const columns = [
        {
            name: "নং",
            selector: (row, index) => index + 1,
            width: "50px"
        },
        {
            name: "সাবজেক্ট",
            selector: row => row.isAll ? row.isAllTitle : <div className='my-3'>
                <p>{row.sub_categorie?.sub_name}</p>
                <p>{row.chapter?.chapter_name}</p>
            </div>,
            wrap: true
        },
        {
            name: "ধরণ",
            selector: row =>
                row.isAll ? (
                    <span className="py-1 px-2 bg-yellow-200 text-yellow-800 rounded-lg text-sm font-medium">
                        Free Trial
                    </span>
                ) : row.type === "free" ? (
                    <span className="py-1 px-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        Free
                    </span>
                ) : (
                    <span className="py-1 px-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        Premium
                    </span>
                )
        },
        {
            name: "মোট প্রশ্ন",
            selector: row => row.questionsCount || 0
        },
        {
            name: "আপডেট করুন",
            selector: row => <EditActionButton data={row} path={"/dashboard/questions/edit"} />
        },
        {
            name: "ডিলেট করুন",
            selector: row => <DeleteActionButton deleteRoute={questionDelete + row._id} />
        },
    ]

    return (
        <div className='my-10'>
            <DataTable
                title={"প্রশ্ন তালিকা"}
                columns={columns}
                data={questions}
                pagination
                highlightOnHover
            />
        </div>
    )
}
