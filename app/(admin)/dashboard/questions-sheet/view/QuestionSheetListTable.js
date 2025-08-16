"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import { Button } from '@/components/ui/button';
import { questionSheetListDelete } from '@/constans';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function QuestionSheetListTable({ data }) {
    const [questionSheetData, setQuestionSheetData] = useState([]);

    useEffect(() => {
        setQuestionSheetData(data)
    }, [data]);


    const columns = [
        {
            name: "নং",
            selector: (row, index) => index + 1,
            width: "100px"
        },
        {
            name: "প্রশ্ন সংখ্যা",
            selector: row => row?.questionsCount || 0,
            wrap: true
        },
        {
            name: "শ্রেনী",
            selector: row => row.classId?.name || "N/A",
            wrap: true
        },
        {
            name: "বিষয়",
            selector: row => row.subjectId?.name || "N/A",
            wrap: true
        },

        {
            name: "চ্যাপ্টার",
            selector: row => <div className=' my-3'>
                <p>{row.chapterId?.name || "N/A"}</p>
                <small>{row.chapterId?.title || "N/A"}</small>
            </div>,
            wrap: true
        },
        {
            name: "বিস্তারিত",
            selector: row => (
                <Link href={`/dashboard/questions-sheet/details/${row._id}`} passHref>
                    <Button className="text-sm bg-blue-500 text-white">
                        প্রশ্নপত্র দেখুন
                    </Button>
                </Link>
            )
        },
        {
            name: "ডিলিট",
            selector: row => <DeleteActionButton deleteRoute={questionSheetListDelete + row._id} />
        },
    ]

    return (
        <div className=' my-10 px-5'>

            <DataTable
                columns={columns}
                data={questionSheetData}
                pagination
                highlightOnHover
                selectableRowsHighlight
            />
        </div>
    )
}
