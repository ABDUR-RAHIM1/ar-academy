"use client"
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function CoursePreview({ courseId }) {
    return (
        <Button asChild className="w-full rounded-xl bg-blue-700 hover:bg-blue-500">
            <Link href={`/courses/${courseId}`}>
                কোর্সটি  দেখুন
            </Link>
        </Button>
    )
}
