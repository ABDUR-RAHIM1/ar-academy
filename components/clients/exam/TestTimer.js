import useExamTimer from '@/utils/ExamTimeCountDown';
import React from 'react'

export default function TestTimer({ exam }) {
    const { status, timeLeft } = useExamTimer(exam);
    console.log({ status, timeLeft, exam })
    return (
        <div>TestTimer</div>
    )
}
