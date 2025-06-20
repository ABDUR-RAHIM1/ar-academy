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
            selector: (row, index) => index + 1
        },
        {
            name: "সাবজেক্ট",
            selector: row => row.isAll ? row.isAllTitle : row.sub_categorie?.sub_name
        },
        {
            name: "ধরণ",
            selector: row => row.isAll ? "Free trail (premium)" : row.sub_categorie?.type
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
