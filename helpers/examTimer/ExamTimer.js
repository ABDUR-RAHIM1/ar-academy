"use client"
import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

function ExamTimer({ durationInMinutes = 20 }) {
  // Calculate expiry time: now + duration
  const time = new Date();
  time.setMinutes(time.getMinutes() + durationInMinutes);

  const {
    seconds,
    minutes,
    hours,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      alert("⏰ সময় শেষ!");
      // এখান থেকে auto submit বা redirect করা যাবে
    }
  });

  useEffect(() => {
    restart(time);
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-black text-green-400 shadow-lg rounded-xl px-8 py-6 text-center border-4 border-green-500">
        <p className="text-lg mb-2 font-semibold tracking-widest uppercase">পরীক্ষার সময়</p>
        <div className="flex justify-center items-center space-x-2 text-5xl font-mono">
          <span>{String(hours).padStart(2, "0")}</span>
          <span>:</span>
          <span>{String(minutes).padStart(2, "0")}</span>
          <span>:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

export default ExamTimer;
