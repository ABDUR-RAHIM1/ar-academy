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
        name: "✅ সঠিক উত্তর",
        cell: row => (
            <span className="bg-green-100 text-green-700 font-semibold py-1 px-2 rounded-md">
                 {row.correctAns}
            </span>
        ),
        sortable: true
    },
    {
        name: "❌ ভুল উত্তর",
        cell: row => (
            <span className="bg-red-100 text-red-700 font-semibold py-1 px-2 rounded-md">
                 {row.wrongAns}
            </span>
        ),
        sortable: true
    },
    {
        name: "⏭️ স্কিপ",
        cell: row => (
            <span className="bg-yellow-100 text-yellow-800 font-semibold py-1 px-2 rounded-md">
                 {row.skip}
            </span>
        ),
        sortable: true
    },
    {
        name: "📊 মোট প্রশ্ন",
        cell: row => (
            <span className="bg-blue-100 text-blue-800 font-semibold py-1 px-2 rounded-md">
                 {row.totalQuestions}
            </span>
        ),
        sortable: true
    },
    {
        name: "📅 তারিখ",
        selector: row => new Date(row.createdAt).toLocaleDateString('bn-BD'),
        sortable: true
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
        ignoreRowClick: true,
        allowoverflow: true,
    }
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
                subHeaderAlign="left"
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
                            backgroundColor: '#f4f4f9',
                            fontSize: '14px',
                            color: '#333',
                        },
                    },
                }}
            />
        </div>
    );
}
