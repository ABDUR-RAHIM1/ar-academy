import { useState, useEffect } from "react";

export default function useExamTimerRetake({ duration, onSubmit }) {
    const [status, setStatus] = useState("upcoming"); // upcoming | ongoing | finished
    const [timeLeft, setTimeLeft] = useState("");

    // useEffect(() => {
    //     if (
    //         (status === "finished" || timeLeft === "00:00:00" || timeLeft === "0:0:0")
    //     ) {
    //         console.log("insuubmit Call from Regular")
    //         onSubmit();
    //     }
    // }, [status, timeLeft]);

    // helper function: format ms into hh:mm:ss
    const formatDuration = (ms) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (!duration || duration <= 0) {
            setStatus("finished");
            setTimeLeft("00:00:00");
            return;
        }

        // exam start now
        setStatus("ongoing");
        const examEnd = Date.now() + duration * 60 * 1000;

        const updateCountdown = () => {
            const now = Date.now();
            const remaining = examEnd - now;

            if (remaining <= 0) {
                setStatus("finished");
                setTimeLeft("00:00:00");
                clearInterval(timer);
            } else {
                setTimeLeft(formatDuration(remaining));
            }
        };

        updateCountdown(); // call immediately
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, [duration]);

    return { status, timeLeft };
}
