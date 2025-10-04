import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function useExamTimerRegular({ startDate, startTime, duration }) {
    const [status, setStatus] = useState("upcoming"); // upcoming | ongoing | finished
    const [timeLeft, setTimeLeft] = useState("");


    // helper
    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (!startDate || !startTime || !duration) {
            setStatus("ongoing");
            return;
        }

        const datePart = dayjs(startDate).format("YYYY-MM-DD");
        const examStart = dayjs(`${datePart} ${startTime}`, "YYYY-MM-DD HH:mm");
        const examEnd = examStart.add(duration, "minute");


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

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, [startDate, startTime, duration]);

    return { status, timeLeft };
}
