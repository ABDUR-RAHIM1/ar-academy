"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Resultstable({ resultsData, role }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (resultsData) {
            setResults(resultsData);
        }
    }, [resultsData]);

    const columns = [
        {
            name: "বিষয় ও ধরণ",
            selector: row => (
                <div className='flex flex-col py-2'>
                    <span className='font-bold text-slate-700 text-sm'>{row?.question?.subjectName || "N/A"}</span>
                    <span className='text-xs text-slate-500 uppercase tracking-wider'>{row?.question?.questionType || "N/A"}</span>
                </div>
            ),
            sortable: true, 
        },
        role !== "student" && {
            name: "শিক্ষার্থী",
            selector: row => (
                <div className='flex flex-col py-2'>
                    <span className='font-bold text-slate-700 text-sm'>{row?.user?.username || "N/A"}</span>

                </div>
            ),
        },
        {
            name: "স্কোর কার্ড",
            cell: row => (
                <div className="flex gap-1 flex-wrap">
                    <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                        সঠিক: {row.correctAns}
                    </span>
                    <span className="bg-rose-50 text-rose-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-rose-100">
                        ভুল: {row.wrongAns}
                    </span>
                </div>
            ),
            width: "180px"
        },
        {
            name: "প্রাপ্ত নম্বর",
            cell: row => (
                <div className="flex flex-col">
                    <span className="text-indigo-600 font-extrabold text-base">
                        {row.totalmark || "0"}
                    </span>
                    <span className="text-[10px] text-slate-400">আউট অফ {row.totalQuestions}</span>
                </div>
            ),
            sortable: true,
        },
        {
            name: "ফলাফল",
            cell: row => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.isPass
                    ? "bg-green-500 text-white shadow-sm shadow-green-200"
                    : "bg-red-400 text-white shadow-sm shadow-red-200"
                    }`}>
                    {row.isPass ? "উত্তীর্ণ" : "ব্যর্থ"}
                </span>
            ),
            sortable: true,
        },
        {
            name: "প্রতিযোগিতা",
            cell: row => (
                <span className={`text-xs font-medium ${row.isRetake ? "text-amber-600" : "text-blue-600"}`}>
                    {row.isRetake ? "⚠️ রি-টেক" : "✅ মূল পরীক্ষা"}
                </span>
            ),
            sortable: true,
        },
        {
            name: "তারিখ",
            selector: row => new Date(row.createdAt).toLocaleDateString('bn-BD'),
            sortable: true,
            width: "120px"
        },
        {
            name: "অ্যাকশন",
            cell: row => (
                <Link
                    className="flex items-center gap-2 py-1.5 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                    href={`/results/${row._id}`}
                >
                    রিপোর্ট
                </Link>
            ),

            width: "120px"
        }
    ];

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#f8fafc',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#e2e8f0',
            },
        },
        headCells: {
            style: {
                color: '#475569',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
            },
        },
        rows: {
            style: {
                minHeight: '72px', // override the row height
                '&:not(:last-child)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: '#f1f5f9',
                },
            },
            highlightOnHoverStyle: {
                backgroundColor: '#f1f5f9',
                borderBottomColor: '#e2e8f0',
                borderRadius: '8px',
                transitionDuration: '0.15s',
            },
        },
        pagination: {
            style: {
                border: 'none',
                fontSize: '13px',
                color: '#64748b',
            },
        },
    };

    const conditionalRowStyles = [
        {
            when: row => row.isRetake === true,
            style: {
                backgroundColor: '#fffbeb', // Very light amber for retakes
            },
        },
    ];

    return (
        <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-xl font-bold text-slate-800">পরীক্ষার ফলাফল তালিকা</h2>
                <div className="text-sm text-slate-500 font-medium">
                    মোট পরীক্ষা: {results.length} টি
                </div>
            </div>
            <DataTable
                columns={columns}
                data={results}
                pagination
                highlightOnHover
                pointerOnHover
                responsive
                customStyles={customStyles}
                conditionalRowStyles={conditionalRowStyles}
                noDataComponent={
                    <div className="p-10 text-slate-400">কোন ফলাফল পাওয়া যায়নি</div>
                }
            />
        </div>
    );
}