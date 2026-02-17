'use client';

import Link from 'next/link';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { formatTime12Hour } from '@/utils/FormatedTime';
import { InfoIcon } from 'lucide-react';
import useExamTimerRegular from '@/components/clients/exam/ExamTimerRegular';

export default function QuestionCard({ exam, index }) {


  const { status, timeLeft } = useExamTimerRegular({
    startDate: exam.startDate,
    startTime: exam.startTime,
    duration: exam.duration
  });
console.log(status, timeLeft)

  const formattedTime = formatTime12Hour(exam?.startTime);

  // 🎨 status অনুযায়ী style config
  const statusStyles = {
    upcoming: {
      card: "bg-blue-50 border-blue-300 bg-blue-100",
      title: "text-blue-700",
      countdown: "text-blue-600",
      button: "bg-blue-300 hover:bg-blue-300 cursor-not-allowed",
    },
    ongoing: {
      card: "bg-green-50 border-green-300 bg-green-100",
      title: "text-green-700",
      countdown: "text-green-600",
      button: "bg-green-500 hover:bg-green-600",
    },
    finished: {
      card: "bg-gray-100 border-gray-300 bg-red-50",
      title: "text-gray-700",
      countdown: "text-gray-600",
      button: "bg-gray-400 hover:bg-gray-400 cursor-not-allowed",
    },
  };

  const styles = statusStyles[status];

  // const randomUserCount = Math.round(Math.random() * 5000)


    return (
    <div className={`group relative overflow-hidden bg-white shadow-md hover:shadow-xl rounded-2xl p-6 border border-gray-100 transition-all duration-300 ${styles.card}`}>

      {/* Header Section */}
      <div className='flex items-start justify-between mb-4'>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            {exam.questionType === "mcq" ? "MCQ Exam" : "Written Exam"}
          </span>
          <h3 className={`text-xl font-bold mt-2 text-gray-800 ${styles.title}`}>
            প্রশ্ন নংঃ {index + 1}
          </h3>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help p-2 hover:bg-gray-100 rounded-full transition">
              <InfoIcon size={18} className="text-gray-400" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-slate-800 text-white border-none shadow-xl">
            <p className="text-xs">পরীক্ষা দেওয়ার জন্য অবশ্যই লগিন থাকতে হবে</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Info Grid - Two Columns for better spacing */}
      <div className='grid grid-cols-2 gap-y-3 gap-x-4 text-gray-600 text-sm mb-6'>
        <div className="flex items-center gap-2 col-span-2 border-b border-gray-50 pb-2">
          <span className="text-lg">📚</span>
          <p className="truncate" title={exam?.course?.name || "N/A"}>
            {/* <span className="text-gray-400">কোর্স:</span>  */}
            <span className="font-semibold text-gray-700">{exam?.course?.name || "N/A"}</span></p>
        </div>

        <div className=" col-span-2 flex items-center gap-2">
          <span className="text-blue-500">📖</span>
          <p>
            {/* <span className="text-gray-400">বিষয়:</span>  */}
            <span className="font-medium">{exam.subjectName}</span></p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-orange-500">⏱️</span>
          <p>
            {/* <span className="text-gray-400">সময়:</span> */}
             <span className="font-medium text-orange-600">{exam.duration || Math.floor(exam.questionsCount / 2)} মিনিট</span></p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-green-500">❓</span>
          <p><span className="text-gray-400">প্রশ্ন:</span> <span className="font-medium">{exam?.questionsCount || 0}টি</span></p>
        </div>

        <div className="flex items-center gap-2 col-span-2 bg-gray-50 p-2 rounded-lg">
          <span className="text-gray-500">📅</span>
          <p className="text-xs italic">
            {new Date(exam?.startDate).toLocaleDateString("BN")} • {formattedTime || "N/A"}
          </p>
        </div>
      </div>

      {/* Status & Countdown Section */}
      <div className="mb-4">
        {status === "upcoming" && (
          <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 py-2 rounded-lg border border-amber-100 animate-pulse">
            <span className="text-sm font-medium">⏳ শুরু হতে বাকি: {timeLeft}</span>
          </div>
        )}
        {status === "ongoing" && (
          <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 py-2 rounded-lg border border-green-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold font-mono text-green-600">সময় বাকি: {timeLeft}</span>
          </div>
        )}
        {status === "finished" && (
          <div className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg border border-red-100">
            <span className="text-sm font-bold italic">⚠️ পরীক্ষা শেষ হয়েছে</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-auto">
        {status === "ongoing" ? (
          <Link
            href={`/profile/exam/take/${exam?.subjectName}/${exam?._id}`}
            className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md transform active:scale-95 transition-all"
          >
            পরীক্ষা দিন
          </Link>
        ) : status === "upcoming" ? (
          <Button disabled className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl cursor-not-allowed">
            অপেক্ষা করুন...
          </Button>
        ) : exam.allowRetake ? (
          <Link
            href={`/profile/exam/take/${exam?.subjectName}/${exam?._id}`}
            className="flex items-center justify-center w-full py-3 bg-white border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 rounded-xl font-bold transition-all"
          >
            🔄 পুনরায় পরীক্ষা দিন
          </Link>
        ) : (
          <Button disabled className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl">
            সুযোগ শেষ
          </Button>
        )}
      </div>
    </div>
  );


  // return (
  //   <div className={`shadow-lg rounded-lg p-5 border ${styles.card} transition`}>
  //     {/* Header */}
  //     <div className='my-3 flex items-center justify-between flex-wrap'>
  //       <h3 className={`text-lg font-semibold ${styles.title}`}>
  //         প্রশ্ন নংঃ {index + 1}
  //       </h3>
  //       <Tooltip>
  //         <TooltipTrigger asChild>
  //           <InfoIcon size={15} className={styles.title} />
  //         </TooltipTrigger>
  //         <TooltipContent style={{ backgroundColor: 'white', border: '1px solid gray', color: 'black' }}>
  //           <p>পরীক্ষা দেওয়ার জন্য অবশ্যই লগিন থাকতে হবে</p>
  //         </TooltipContent>
  //       </Tooltip>
  //     </div>

  //     {/* Exam Info */}
  //     <div className='flex flex-col gap-2 text-gray-700 text-sm'>
  //       {[
  //         { label: "কোর্স", value: exam?.course?.name || "N/A" },
  //         { label: "বিষয়", value: exam.subjectName },
  //         { label: "প্রশ্নের ধরন", value: exam.questionType === "mcq" ? "MCQ" : "WRITTEN" },
  //         { label: "শুরুর তারিখ", value: new Date(exam?.startDate).toLocaleDateString("BN") || "N/A" },
  //         { label: "শুরুর সময়", value: formattedTime || "N/A" },
  //         { label: "মোট প্রশ্ন", value: exam?.questionsCount || 0 },
  //         // { label: "অংশগ্রহণকারী", value: randomUserCount || 0 },
  //         { label: "সময়সীমা", value: `${exam.duration || Math.floor(exam.questionsCount / 2)} মিনিট` }
  //       ].map((item, idx) => (
  //         <p key={idx}>📝 {item.label}: <span className="font-medium">{item.value}</span></p>
  //       ))}
  //     </div>

  //     {/* Countdown */}
  //     <div className='text-sm mt-2'>
  //       {status === "upcoming" && <span className={styles.countdown}>⏳ শুরু হতে বাকি: {timeLeft}</span>}
  //       {status === "ongoing" && <span className={styles.countdown}>⏳ শেষ হতে বাকি: {timeLeft}</span>}
  //       {status === "finished" && <span className='text-red-600 font-bold'>⏳ শেষ হয়েছে!</span>}
  //     </div>

  //     {/* Action Button */}
  //     <div className='mt-4'>
  //       {status === "ongoing" ? (
  //         <Link
  //           href={`/profile/exam/take/${exam?.subjectName}/${exam?._id}`}
  //           className={`inline-block w-full text-center px-5 py-2 text-white rounded-full text-sm transition ${styles.button}`}
  //         >
  //           পরীক্ষা দিন
  //         </Link>
  //       ) : status === "upcoming" ? (
  //         <Button className={`inline-block w-full px-3 py-2 text-white rounded-full text-sm ${styles.button}`}>
  //           পরীক্ষা এখনও শুরু হয়নি
  //         </Button>
  //       ) : exam.allowRetake ? (
  //         <Link
  //           href={`/profile/exam/take/${exam?.subjectName}/${exam?._id}`}
  //           className={`inline-block w-full bg-yellow-600 hover:bg-yellow-500 text-center px-5 py-2 text-white rounded-full text-sm transition`}
  //         >
  //           পুনরায় পরীক্ষা দিন
  //         </Link>
  //       ) : (
  //         <Button className={`inline-block w-full px-3 py-2 text-white rounded-full text-sm ${styles.button}`}>
  //           পরীক্ষা শেষ হয়ে গেছে
  //         </Button>
  //       )}
  //     </div>
  //   </div>
  // );

}
