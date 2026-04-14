"use client"
import DeleteActionButton from '@/actions/Buttons/DeleteActionButton';
import EditActionButton from '@/actions/Buttons/EditActionButton';
import { questionDelete, questionDeleteSubAdmin } from '@/constans';
import React, { useEffect, useState, useMemo } from 'react'
import DataTable from 'react-data-table-component';
import dayjs from 'dayjs';
import { getExamStatus } from '@/utils/getExamStatus';
import { getAllCourse } from '@/app/apiActions/Course';
import { formatTime12Hour } from '@/utils/FormatedTime';
import { getMyCreatedCourseBySubAdmin } from '@/app/apiActions/purchase';
import DeleteActionButtonSubAdmin from '@/actions/Buttons/DeleteActionButtonSubAdmin';

export default function QuestionsTable({ questionsData, role = "subAdmin" }) {
    const [questions, setQuestions] = useState([]);
    const [courses, setCourses] = useState([]);
    // LocalStorage থেকে ডিফল্ট ফিল্টার ভ্যালু নেওয়া
    const [selectedCourse, setSelectedCourse] = useState("");

    useEffect(() => {
        if (questionsData) {
            setQuestions(questionsData);
        };

    }, [questionsData]);
 

    // কোর্স ডাটা ফেচ করা এবং LocalStorage থেকে ফিল্টার স্টেট লোড করা
    useEffect(() => {
        const fetchAllCourse = async () => {
            const fetchFunc = role === "admin" ? getAllCourse : getMyCreatedCourseBySubAdmin
            const { status, data } = await fetchFunc();

            if (status === 200) {
                setCourses(data);
            }
        };
        fetchAllCourse();

        // রিলোড করার পর লোকাল স্টোরেজ থেকে আগের ফিল্টার আইডি খুঁজে বের করা
        const savedFilter = localStorage.getItem('questions_course_filter');
        if (savedFilter) {
            setSelectedCourse(savedFilter);
        }
    }, []);

    // যখনই ফিল্টার চেঞ্জ হবে, তা লোকাল স্টোরেজে সেভ হবে
    const handleFilterChange = (courseId) => {
        setSelectedCourse(courseId);
        localStorage.setItem('questions_course_filter', courseId);
    };

    // ফিল্টার করা ডাটা (Memoized for performance)
    const filteredQuestions = useMemo(() => {
        if (!selectedCourse || selectedCourse === "all") {
            return questions;
        }
        return questions.filter(q => q.course?._id === selectedCourse);
    }, [questions, selectedCourse]);

    const ExpandedComponent = ({ data }) => (
        <div className="p-3 bg-gray-50 rounded-md grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <p>⏰ Duration: <strong>{data.duration} মিনিট</strong></p>
            <p>📌 Pass Mark: <strong>{data.passMark}</strong></p>
            <p>❌ Negative Mark: <strong>{data.nagetiveMark || 0}</strong></p>
            <p>🔖 Question Type: <strong>{data.questionType?.toUpperCase()}</strong></p>
            <p>📅 Start Date: <strong>{dayjs(data.startDate).format("DD/MM/YYYY")}</strong></p>
            <p>🕒 Start Time: <strong>{formatTime12Hour(data.startTime)}</strong></p>
            <p>✅ Allow Retake: <strong>{data.allowRetake ? "Yes" : "No"}</strong></p>
            <p>🔓 Published: <strong>{data.isPublished ? "Yes" : "No"}</strong></p>
            <p>👥 Participants: <strong>{data.participant?.length || 0}</strong></p>
        </div>
    );

    const columns = [
        {
            name: "নং",
            selector: (row, index) => index + 1,
            width: "60px"
        },
        {
            name: "কোর্স",
            selector: row => row?.course?.name || "N/A",
            sortable: true,
            wrap: true
        },
        {
            name: "বিষয়",
            selector: row => (
                <div className='space-y-1 py-2'>
                    <div className='font-semibold'>{row.subjectName}</div>
                    <div className="text-[11px] text-gray-500 italic">({row.questionType})</div>
                </div>
            ),
            wrap: true
        },
        {
            name: "মোট প্রশ্ন",
            selector: row => row.questionsCount || 0,
            sortable: true
        },
        {
            name: "শুরুর সময়",
            selector: row => (
                <div className='text-[13px]'>
                    <p>{dayjs(row.startDate).format("DD/MM/YYYY")}</p>
                    <p className='text-blue-600'>{formatTime12Hour(row.startTime)}</p>
                </div>
            )
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
            name: "অ্যাকশন",
            cell: row => (
                <div className="flex gap-2">
                    {
                        role === "admin" ?
                            <>
                                <EditActionButton data={row} path={"/dashboard/course/questions/edit"} />
                                <DeleteActionButton deleteRoute={questionDelete + row._id} />
                            </>
                            :

                            <>
                                <EditActionButton data={row} path={"/subAdmin/questions/edit"} />
                                <DeleteActionButtonSubAdmin deleteRoute={questionDeleteSubAdmin + row._id} />
                            </>
                    }
                </div>
            ),
            width: "120px"
        },
     
    ];

    return (
        <div className='my-10 bg-white shadow-sm border rounded-lg overflow-hidden'>
            {/* Filter Header */}
            <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-gray-700">প্রশ্ন তালিকা</h2>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-600">কোর্স ফিল্টার:</label>
                    <select
                        className="border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedCourse}
                        onChange={(e) => handleFilterChange(e.target.value)}
                    >
                        <option value="all">সকল কোর্স</option>
                        {courses.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredQuestions}
                pagination
                paginationPerPage={10}
                highlightOnHover
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                noDataComponent={<div className="p-10 text-gray-400">কোনো ডাটা পাওয়া যায়নি</div>}
            />
        </div>
    )
}