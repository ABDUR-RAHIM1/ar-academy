"use client"
import { contextD } from '@/contextApi/DashboardState';
import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTimer } from 'react-timer-hook';

function ExamTimer(props) {
  const { token, durationInMinutes, handleSubmitQuestion, totalQuestions, selectedCount } = props;

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
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      if (token) {

        setExamFinisdTime(formatted);
        handleSubmitQuestion();
        toast.dismiss();
      }
    },
    autoStart: Boolean(token),
  });
 


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
    <div className="w-full grid md:grid-cols-2 gap-2 bg1 text-white px-5 py-2 md:py-4 text-center border-b rounded-md">

      {/* ⏰ Timer Countdown */}
      <div>
        <p className="text-lg mb-2 font-semibold tracking-widest uppercase">পরীক্ষার সময় 🕒</p>
        <div className="flex justify-center items-center space-x-2 text-xl md:text-3xl font-mono">
          <span>{String(hours).padStart(2, "0")}</span>
          <span>:</span>
          <span>{String(minutes).padStart(2, "0")}</span>
          <span>:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
      </div>

      {/* 📊 Question Stats */}
      <div>
        <p className="text-lg mb-2 font-semibold tracking-widest uppercase">প্রশ্নের অগ্রগতি 📊</p>
        <p className="text-xl md:text-3xl font-mono">
          {selectedCount} / {totalQuestions}

        </p>
        <p className="text-sm mt-1">উত্তর দেওয়া / মোট প্রশ্ন</p>
      </div>
    </div>
  );
}


export default ExamTimer;
