"use client" 
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { questionDeleteSubAdmin } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import dayjs from 'dayjs';
import { getExamStatus } from '@/utils/getExamStatus';
import DeleteActionButtonSubAdmin from '@/actions/Buttons/DeleteActionButtonSubAdmin';

export default function QuestionsTable({ questionsData }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (questionsData) {
            setQuestions(questionsData)
        }
    }, [questionsData]);
    
    // Expandable row component
    const ExpandedComponent = ({ data }) => {
        return (
            <div className="p-3 bg-gray-50 rounded-md">
                <p>⏰ Duration: <strong>{data.duration} মিনিট</strong></p>
                <p>📌 Pass Mark: <strong>{data.passMark}</strong></p>
                <p>❌ Negative Mark: <strong>{data.nagetiveMark || 0}</strong></p>
                <p>🔖 Question Type: <strong>{data.questionType.toUpperCase()}</strong></p>
                <p>📅 Start Date: <strong>{dayjs(data.startDate).format("DD/MM/YYYY")}</strong></p>
                <p>🕒 Start Time: <strong>{data.startTime}</strong></p>
                <p>✅ Allow Retake: <strong>{data.allowRetake ? "Yes" : "No"}</strong></p>
                <p>🔓 Published: <strong>{data.isPublished ? "Yes" : "No"}</strong></p>
                <p>👥 Participants: <strong>{data.participant?.length || 0}</strong></p>
            </div>
        )
    }

    const columns = [
        {
            name: "নং",
            selector: (row, index) => index + 1,
            width: "50px"
        },
        {
            name: "কোর্স",
            selector: row => row?.course?.name || "N/A",
            wrap: true
        },
        {
            name: "বিষয়",
            selector: row => row.subjectName,
            wrap: true
        },
        {
            name: "মোট প্রশ্ন",
            selector: row => row.questionsCount || 0
        },
        {
            name: "শুরুর তারিখ",
            selector: row => dayjs(row.startDate).format("DD/MM/YYYY")
        },
        {
            name: "শুরুর সময়",
            selector: row => row.startTime
        },
        {
            name: "সময়",
            selector: row => `${row.duration || 0} মিনিট`
        },
        {
            name: "স্ট্যাটাস",
            selector: row => getExamStatus(row),
            wrap: true,
            cell: row => {
                const status = getExamStatus(row);
                let color = "gray";

                if (status === "চলছে") color = "green";
                else if (status === "শুরু হয়নি") color = "orange";
                else if (status === "শেষ হয়ে গেছে") color = "red";

                return <span className={`font-medium text-white px-2 py-1 rounded-full`} style={{ backgroundColor: color }}>{status}</span>
            },
            width: "150px"
        },
        {
            name: "আপডেট করুন",
            selector: row => <EditActionButton data={row || undefined} path={"/subAdmin/questions/edit"} />
        },
        {
            name: "ডিলেট করুন",
            selector: row => <DeleteActionButtonSubAdmin deleteRoute={questionDeleteSubAdmin + row._id} />
        },
    ]

    return (
        <div className="my-10  w-full">
            <DataTable
                title={"প্রশ্ন তালিকা"}
                columns={columns}
                data={questions}
                pagination
                highlightOnHover
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    )
}
