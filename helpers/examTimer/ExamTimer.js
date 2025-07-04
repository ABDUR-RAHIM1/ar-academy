"use client"
import { contextD } from '@/contextApi/DashboardState';
import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTimer } from 'react-timer-hook';

function ExamTimer(props) {
  const { token, isSubmit, durationInMinutes, handleSubmitQuestion, totalQuestions, selectedCount } = props;

  const { setUsedTime } = useContext(contextD)

  // Calculate expiry time: now + duration
  const timeParse = parseInt(durationInMinutes || (totalQuestions / 2))

  const time = new Date();
  time.setMinutes(time.getMinutes() + timeParse);

  const {
    seconds,
    minutes,
    hours,
    restart,
    pause
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      if (token) {

        handleSubmitQuestion();
        toast.dismiss();
      }
    },
    autoStart: Boolean(token),
  });

  // ✅ isSubmit হলে timer pause করে দাও
  useEffect(() => {
    if (isSubmit) {
      pause();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (token) {
      restart(time);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const s = Number(seconds) || 0;

    const totalDurationMs = timeParse * 60 * 1000;
    const remainingMs = (h * 60 * 60 + m * 60 + s) * 1000;
    const usedMs = totalDurationMs - remainingMs;

    const usedMin = Math.floor(usedMs / 1000 / 60);
    const usedSec = Math.floor((usedMs / 1000) % 60);

    // Optional: দুই সংখ্যার ফরম্যাট চাইলে
    const formatted = `${String(usedMin).padStart(2, '0')} মিনিট ${String(usedSec).padStart(2, '0')} সেকেন্ড`;

    setUsedTime(formatted);

  }, [seconds]);


  return (
    <div className="w-full grid grid-cols-2 gap-x-* gap-2 bg1 text-white px-2 md:px-5 py-2 md:py-4  border-b rounded-md">

      {/* ⏰ Timer Countdown */}
      <div>
        <p className=" text-[15px] md:text-lg mb-2 font-semibold tracking-widest uppercase">পরীক্ষার সময় 🕒</p>
        <div className="flex  items-center space-x-2 text-[16px] md:text-3xl font-mono">
          <span>{String(hours).padStart(2, "0")}</span>
          <span>:</span>
          <span>{String(minutes).padStart(2, "0")}</span>
          <span>:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
        <p className="md:text-[12px]  text-sm mt-1">নির্ধারিত সময়ঃ {timeParse} মিনিট </p>
      </div>

      {/* 📊 Question Stats */}
      <div className=' text-right'>
        <p className=" text-[15px] md:text-lg mb-2 font-semibold tracking-widest uppercase">📊 প্রশ্নের অগ্রগতি </p>
        <p className="text-[16px] md:text-3xl font-mono">
          {selectedCount} / {totalQuestions}

        </p>
        <p className="md:text-[12px]  text-sm mt-1">উত্তর দেওয়া / মোট প্রশ্ন</p>
      </div>
    </div>
  );
}


export default ExamTimer;
