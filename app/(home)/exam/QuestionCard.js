'use client';

import Link from 'next/link';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { formatTime12Hour } from '@/utils/FormatedTime';
import { InfoIcon } from 'lucide-react';
import useExamTimer from '@/utils/ExamTimeCountDown';

export default function QuestionCard({ exam, index }) {

    const { status, timeLeft } = useExamTimer({
        startDate: exam.startDate,
        startTime: exam.startTime,
        duration: exam.duration
    });


    const formattedTime = formatTime12Hour(exam?.startTime);

    // 🎨 status অনুযায়ী style config
    const statusStyles = {
        upcoming: {
            card: "bg-blue-50 border-blue-300",
            title: "text-blue-700",
            countdown: "text-blue-600",
            button: "bg-blue-300 hover:bg-blue-300 cursor-not-allowed",
        },
        ongoing: {
            card: "bg-green-50 border-green-300",
            title: "text-green-700",
            countdown: "text-green-600",
            button: "bg-green-500 hover:bg-green-600",
        },
        finished: {
            card: "bg-gray-100 border-gray-300",
            title: "text-gray-700",
            countdown: "text-gray-600",
            button: "bg-gray-400 hover:bg-gray-400 cursor-not-allowed",
        },
    };

    const styles = statusStyles[status];

    return (
        <div className={`shadow-lg rounded-lg p-5 border ${styles.card} transition`}>
            <div className='my-3 flex items-center justify-between flex-wrap'>
                <h3 className={`text-lg font-semibold ${styles.title}`}>
                    প্রশ্ন নংঃ {index + 1}
                </h3>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <InfoIcon size={15} className={styles.title} />
                    </TooltipTrigger>
                    <TooltipContent style={{ backgroundColor: 'white', border: '1px solid gray', color: 'black' }}>
                        <p>পরীক্ষা দেওয়ার জন্য অবশ্যই লগিন থাকতে হবে</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className='flex flex-col gap-2 text-gray-700 text-sm'>
                <p>📝 বিষয়: <span className="font-medium">{exam.subjectName}</span></p>
                <p>📝 শুরুর তারিখ: <span className="font-medium">{new Date(exam?.startDate).toLocaleDateString("BN") || "N/A"}</span></p>
                <p>📝 শুরুর সময়: <span className="font-medium">{formattedTime || "N/A"}</span></p>
                <p>📊 মোট প্রশ্ন: <span className="font-medium">{exam?.questionsCount || 0}</span></p>
                <p>👥 অংশগ্রহণকারী: <span className="font-medium">{exam?.participantCount || 0}</span></p>
                <p>🔍 প্রশ্ন ধরন: <span className="font-medium">MCQ</span></p>
                <p>⌚ সময়: <span className="font-medium">{exam.duration || Math.floor(exam.questionsCount / 2)} মিনিট </span></p>
            </div>

            {/* Countdown */}
            {status === "upcoming" && (
                <div className={`text-sm mt-2 ${styles.countdown}`}>
                    ⏳ শুরু হতে বাকি: {timeLeft}
                </div>
            )}
            {status === "ongoing" && (
                <div className={`text-sm mt-2 ${styles.countdown}`}>
                    ⏳ শেষ হতে বাকি: {timeLeft}
                </div>
            )}

            {/* Button */}
            {status === "ongoing" ? (
                <Link
                    href={`/exam/${exam?.subjectName}/${exam?.course._id}`}
                    className={`inline-block w-full text-center mt-4 px-5 py-2 text-white rounded-full text-sm transition ${styles.button}`}
                >
                    পরীক্ষা দিন
                </Link>
            ) : status === "upcoming" ? (
                <Button className={`inline-block w-full mt-4 px-3 py-2 text-white rounded-full text-sm ${styles.button}`}>
                    পরীক্ষা এখনও শুরু হয়নি
                </Button>
            ) : exam.allowRetake ?
                (
                    <Link
                        href={`/exam/${exam?.subjectName}/${exam?.course._id}`}
                        className={`inline-block w-full bg-yellow-600 hover:bg-yellow-500 text-center mt-4 px-5 py-2 text-white rounded-full text-sm transition`}
                    >
                        পুনরায় পরীক্ষা দিন
                    </Link>
                )
                : (
                    <Button className={`inline-block w-full mt-4 px-3 py-2 text-white rounded-full text-sm ${styles.button}`}>
                        পরীক্ষা শেষ হয়ে গেছে
                    </Button>
                )}
        </div>
    );
}
