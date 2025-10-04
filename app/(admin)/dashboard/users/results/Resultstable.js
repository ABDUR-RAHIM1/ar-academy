"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Resultstable({ resultsData }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (resultsData) {
            setResults(resultsData);
        }
    }, [resultsData]);


    const columns = [
        {
            name: " বিষয়",
            selector: row => <div className=' flex flex-col gap-2 text-sm'>
                <p>{row?.question?.subjectName || "N/A"}</p>
                <p>{row?.question?.questionType || "N/A"}</p>
            </div>,
            sortable: false
        },
        {
            name: "পরীক্ষার্থী",
            selector: row => <p className=' color1'>{row?.user?.username || "N/A"}</p>,
            sortable: true,
            width: "150px"
        },
        {
            name: " সঠিক",
            cell: row => (
                <span className="bg-green-100 text-green-700 font-semibold py-1 px-2 rounded-md">
                    {row.correctAns}
                </span>
            ),
            sortable: true
        },
        {
            name: "ভুল",
            cell: row => (
                <span className="bg-red-100 text-red-700 font-semibold py-1 px-2 rounded-md">
                    {row.wrongAns}
                </span>
            ),
            sortable: true
        },
        {
            name: " স্কিপ",
            cell: row => (
                <span className="bg-yellow-100 text-yellow-800 font-semibold py-1 px-2 rounded-md">
                    {row.skip}
                </span>
            ),
            sortable: true
        },
        {
            name: "মোট নম্বর",
            cell: row => (
                <span className="bg-yellow-100 text-yellow-800 font-semibold py-1 px-2 rounded-md">
                    {row.totalmark || "N/A"}
                </span>
            ),
            sortable: true,
            width: "150px"
        },
        {
            name: "মোট প্রশ্ন",
            cell: row => (
                <span className="bg-blue-100 text-blue-800 font-semibold py-1 px-2 rounded-md">
                    {row.totalQuestions}
                </span>
            ),
            sortable: true,
            width: "150px"
        },
        {
            name: "রেজাল্ট",
            cell: row => (
                <span className="bg-blue-100 text-blue-800 font-semibold py-1 px-2 rounded-md">
                    {row.isPass ? "পাশ" : "ফেল"}
                </span>
            ),
            sortable: true,
            width: "100px"
        },
        {
            name: "প্রতিযোগিতায়",
            cell: row => (
                <span className=" inline-block w-full text-center bg-blue-100 text-blue-800 font-semibold py-1 px-2 rounded-md">
                    {row.isRetake ? "না" : "হ্যাঁ "}
                </span>
            ),
            sortable: true,
            width: "140px"
        },
        {
            name: "📅 তারিখ",
            selector: row => new Date(row.createdAt).toLocaleDateString('bn-BD'),
            sortable: true,
            width: "150px"
        },
        {
            name: "🔍 বিস্তারিত",
            cell: row => (
                <Link
                    className="inline-block py-2 px-3 rounded-sm bg-violet-600 text-white transition-all hover:bg-violet-700 my-3"
                    href={`/results/${row._id}`}
                >
                    👁️ দেখুন
                </Link>
            ),
            width: "150px"
        }
    ];

    // ✅ Conditional row style
    const conditionalRowStyles = [
        {
            when: row => row.isRetake === true,
            style: {
                backgroundColor: 'rgba(255, 200, 200, 0.3)', // light red
            },
        },
        {
            when: row => row.isPass === false,
            style: {
                backgroundColor: 'rgba(255, 220, 220, 0.3)', // light pink fail
            },
        },
    ];

    return (
        <div className="my-10 p-4 bg-gray-100 rounded-lg shadow-lg">
            <DataTable
                title={`ফলাফল তালিকা`}
                columns={columns}
                data={results}
                pagination
                highlightOnHover
                subHeader
                conditionalRowStyles={conditionalRowStyles} // ✅ conditional background
                customStyles={{
                    headCells: {
                        style: {
                            backgroundColor: '#4c4f69',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '400',
                        },
                    },
                    cells: {
                        style: {
                            fontSize: '14px',
                            color: '#333',
                        },
                    },
                }}
            />
        </div>
    );
}
