"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { questionDelete } from '@/constans';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import dayjs from 'dayjs';
import { getExamStatus } from '@/utils/getExamStatus';
import { getAllCourse } from '@/app/apiActions/Course';

export default function QuestionsTable({ questionsData }) {
    const [questions, setQuestions] = useState([]);
    const [course, setCourse] = useState([]);
    console.log(course)
    useEffect(() => {
        if (questionsData) {
            setQuestions(questionsData)
        }
    }, [questionsData]);

    const fetchAllCourse = async () => {
        const { status, data } = await getAllCourse();
        console.log(data)
        if (status === 200) {
            setCourse(data)
        }
    }

    useEffect(() => {
        fetchAllCourse();
    }, [])

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
            selector: row => <div className=' space-y-2 py-2'>
                <div>{row.subjectName}</div>
                <div className={" text-[12px]"}>({row.questionType})</div>
            </div>,
            wrap: true
        },
        {
            name: "মোট প্রশ্ন",
            selector: row => row.questionsCount || 0
        },
        {
            name: "শুরুর হবে",
            selector: row => <div className=' space-y-2'>
                <p>{dayjs(row.startDate).format("DD/MM/YYYY")}</p>
                <p>{row.startTime}</p>
            </div>
        },

        {
            name: "সময়",
            selector: row => `${row.duration || 0} মিনিট`
        },
        {
            name: "অংশগ্রহণকারী",
            selector: row => `${row.participant?.length || 0} জন`
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
            selector: row => <EditActionButton data={row || undefined} path={"/dashboard/course/questions/edit"} />
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
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    )
}
