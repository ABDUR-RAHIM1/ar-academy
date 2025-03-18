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
            name: "ব্যবহারকারী",
            selector: row => row.user.username,
            sortable: true
        },
        {
            name: "সঠিক উত্তর",
            selector: row => row.correctAns,
            sortable: true
        },
        {
            name: "ভুল উত্তর",
            selector: row => row.wrongAns,
            sortable: true
        },
        {
            name: "স্কিপ",
            selector: row => row.skip,
            sortable: true
        },
        {
            name: "মোট প্রশ্ন",
            selector: row => row.totalQuestions,
            sortable: true
        },
        {
            name: "তারিখ",
            selector: row => new Date(row.createdAt).toLocaleDateString('bn-BD'),
            sortable: true
        },
        {
            name: "বিস্তারিত",
            selector: row => <Link className=' inline-block py-2 px-3 rounded-sm bg1 text-white transition-all hover:bg2 my-3' href={`/results/${row._id}`} >
                দেখুন
            </Link>,
            sortable: true
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
