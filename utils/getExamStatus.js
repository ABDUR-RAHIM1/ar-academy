import dayjs from "dayjs";

export const getExamStatus = (exam) => {
    if (!exam.startDate || !exam.startTime || !exam.duration) return "Unknown";

    const start = dayjs(`${dayjs(exam.startDate).format("YYYY-MM-DD")} ${exam.startTime}`, "YYYY-MM-DD HH:mm");
    const end = start.add(exam.duration, "minute");
    const now = dayjs();

    if (now.isBefore(start)) return "শুরু হয়নি";      // Upcoming
    if (now.isAfter(end)) return "শেষ হয়ে গেছে";     //  Finished
    return "চলছে";                                  // Ongoing
};