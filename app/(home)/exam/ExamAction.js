"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function ExamAction() {
    const searchParmas = useSearchParams();
    console.log(searchParmas.get("chapterId"))
    return (
        null
    )
}
