'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import dayjs from "dayjs";
import { formatTime12Hour } from '@/utils/FormatedTime';
import { InfoIcon } from 'lucide-react';

export default function QuestionCard({ exam, index }) {
    const [status, setStatus] = useState("upcoming"); // upcoming / ongoing / finished
    const [timeLeft, setTimeLeft] = useState("");     // countdown string

    // Countdown formatter
    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    // Status + countdown logic
    useEffect(() => {
        if (!exam.startDate || !exam.startTime || !exam.duration) {
            setStatus("ongoing");
            return;
        }

        // ISO date থেকে date part
        const datePart = dayjs(exam.startDate).format("YYYY-MM-DD");
        const examStart = dayjs(`${datePart} ${exam.startTime}`, "YYYY-MM-DD HH:mm");
        const examEnd = examStart.add(exam.duration, "minute");

        const updateCountdown = () => {
            const now = dayjs();

            if (now.isBefore(examStart)) {
                setStatus("upcoming");
                setTimeLeft(formatDuration(examStart.diff(now)));
            } else if (now.isAfter(examEnd)) {
                setStatus("finished");
                setTimeLeft("00:00:00");
            } else {
                setStatus("ongoing");
                setTimeLeft(formatDuration(examEnd.diff(now)));
            }
        };

        updateCountdown(); // প্রথমে একবার update
        const timer = setInterval(updateCountdown, 1000); // প্রতি সেকেন্ডে update
        return () => clearInterval(timer); // cleanup
    }, [exam.startDate, exam.startTime, exam.duration]);

    const formattedTime = formatTime12Hour(exam?.startTime);

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
            <div className='my-3 flex items-center justify-between flex-wrap'>
                <h3 className="text-lg font-semibold text-gray-900">প্রশ্ন নংঃ {index + 1}</h3>

                <Tooltip>
                    <TooltipTrigger asChild>
                       <InfoIcon size={15}/>
                    </TooltipTrigger>
                    <TooltipContent style={{ backgroundColor: 'white', border: '1px solid gray', color: 'black' }}>
                        <p>পরীক্ষা দেওয়ার জন্য অবশ্যই লগিন থাকতে হবে</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className='flex flex-col gap-2 text-gray-600 text-sm'>
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
                <div className="text-sm text-gray-600 mt-2">
                    ⏳ শুরু হতে বাকি: {timeLeft}
                </div>
            )}
            {status === "ongoing" && (
                <div className="text-sm text-gray-600 mt-2">
                    ⏳ শেষ হতে বাকি: {timeLeft}
                </div>
            )}

            {/* Button */}
            {status === "ongoing" ? (
                <Link
                    href={`/exam/${exam?.subjectName}/${exam._id}`}
                    className="inline-block w-full text-center mt-4 px-5 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
                >
                    পরীক্ষা দিন
                </Link>
            ) : status === "upcoming" ? (
                <Button className="inline-block w-full mt-4 px-3 py-2 bg-red-300 text-white rounded-full hover:bg-red-300 text-sm cursor-not-allowed">
                    পরীক্ষা এখনও  শুরু হয়নি
                </Button>
            ) : (
                <Button className="inline-block w-full mt-4 px-3 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-400 text-sm cursor-not-allowed">
                    পরীক্ষা শেষ হয়ে গেছে
                </Button>
            )}
        </div>
    );
}
