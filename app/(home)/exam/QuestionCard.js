'use client'; // শুধু client side এ date check করার জন্য

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ExamButton from './ExamButton';
import { formatTime12Hour } from '@/utils/FormatedTime';
import { Button } from '@/components/ui/button';

export default function QuestionCard({ exam, index }) {
    const [isAvailable, setIsAvailable] = useState(false);

    // আজকের date check করা
    useEffect(() => {
        if (exam.startDate && exam.startTime) {
            const today = new Date();
            const examDateTime = new Date(`${exam.startDate}T${exam.startTime}`);

            if (today >= examDateTime) {
                setIsAvailable(true);
            }
        } else {
            setIsAvailable(true); // যদি date/time না থাকে, open থাকবে
        }
    }, [exam.startDate, exam.startTime]);

    const isAll = exam.isAll;
    const fomatedTime = formatTime12Hour(exam?.startTime)

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
            <div className='my-3 flex items-center justify-between flex-wrap'>
                <h3 className="text-lg font-semibold text-gray-900">প্রশ্ন নংঃ {index + 1}</h3>

                {!isAll ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className={` ${exam.type === "free" ? "bg-green-800 hover:bg-green-700" : "bg-red-700 hover:bg-red-600"} px-3 py-1 text-sm rounded-md text-white font-normal transition-all`}>
                                {exam.type === "free" ? "ফ্রি" : "প্রিমিয়াম"}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent style={{ backgroundColor: 'white', border: '1px solid gray', color: 'black' }}>
                            <p>পরিক্ষা দেওয়ার জন্য অবশ্যই লগিন থাকতে হবে
                                {exam.type === "paid" &&
                                    <span className=' text-red-800 ml-2'>
                                        এবং প্রিমিয়াম সদস্য হতে হবে!
                                    </span>
                                }
                            </p>
                        </TooltipContent>
                    </Tooltip>
                )
                    :
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className={` bg-yellow-700 hover:bg-yellow-500 px-3 py-1 text-sm rounded-md text-white font-normal`}>
                                ফ্রি ট্রায়াল (প্রিমিয়াম)
                            </button>
                        </TooltipTrigger>
                        <TooltipContent style={{ backgroundColor: 'white', border: '1px solid gray', color: 'black' }}>
                            <p>পরিক্ষা দেওয়ার জন্য অবশ্যই লগিন থাকতে হবে</p>
                        </TooltipContent>
                    </Tooltip>
                }
            </div>

            <div className='flex flex-col gap-2 text-gray-600 text-sm'>
                {isAll ? (
                    <p>📝 প্রশ্ন সেট: <span className="font-medium">{exam?.isAllTitle}</span></p>
                ) : (
                    <>
                        <p>📝 বিষয়: <span className="font-medium">{exam.sub_categorie?.sub_name}</span></p>
                        <p>📝 অধ্যায়: <span className="font-medium">{exam.chapter?.chapter_name}</span></p>
                        <p>📝: শুরুর তারিখ <span className="font-medium">{new Date(exam?.startDate).toLocaleDateString("BN") || "N/A"}</span></p>
                        <p>📝: শুরুর সময় <span className="font-medium">{fomatedTime || "N/A"}</span></p>
                    </>
                )}

                <p>📊 মোট প্রশ্ন: <span className="font-medium">{exam?.questionsCount || 0}</span></p>
                <p>👥 অংশগ্রহণকারী: <span className="font-medium">{exam?.participantCount}</span></p>
                <p>🔍 প্রশ্ন ধরন: <span className="font-medium">MCQ</span></p>
                <p>⌚ সময়: <span className="font-medium">{exam.duration || Math.floor(exam.questionsCount / 2)} মিনিট </span></p>
            </div>

            {isAvailable ? (
                <Link
                    href={isAll
                        ? `/exam/all-subject/${exam._id}`
                        : `/exam/${exam?.sub_categorie?.identifier}/${exam._id}`
                    }
                    className="inline-block mt-4 px-5 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
                >
                    পরীক্ষা দিন
                </Link>
            ) : (
                <Button className="inline-block w-full mt-4 px-3 py-2 bg-red-300 text-white rounded-full hover:bg-red-300 text-sm cursor-not-allowed">
                    পরীক্ষা এখনও খোলা হয়নি
                </Button>
            )}

            {/* <ExamButton /> */}
        </div>
    )
}
