"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ExamButton({ href }) {
    const router = useRouter();

    const handleNavigateExamPage = () => {

        router.push(href)
    }

    return (
        <Button
            onClick={handleNavigateExamPage}
            className='mt-4 rounded-full bg-blue-500 text-white text-sm'
        >
            পরিক্ষা দিন
        </Button>
    )
}
