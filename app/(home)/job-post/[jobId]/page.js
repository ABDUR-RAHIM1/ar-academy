import { dummyJobs } from '@/LocalDatabase/dummyJob'
import Link from 'next/link'
import React from 'react'

export default async function JobDetails({ params }) {
    const { jobId } = await params

    // Dummy fetch
    const job = dummyJobs.find((job) => job.id === parseInt(jobId)) || dummyJobs[0]

    const recentJobs = dummyJobs.filter((job) => job.id !== parseInt(jobId))

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left - Main job details */}
            <div className="md:col-span-2 space-y-4">
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <p className="text-sm text-gray-500">প্রকাশের তারিখ: {job.postedAt}</p>
                <p className="text-sm text-gray-600">বিভাগ: {job.category}</p>
                <p className="text-sm text-gray-600">অবস্থান: {job.location}</p>


                <div className="bg-white p-4 border rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">চাকরির বিবরণ</h2>
                    <p className="text-gray-700">{job.description}</p>
                </div>

                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                    ⚠️ এই চাকরির জন্য আর্থিক লেনদেনের ক্ষেত্রে সতর্ক থাকুন। যাচাই-বাছাই করে পদক্ষেপ নিন। কর্তৃপক্ষ কোনো ক্ষতির দায়ভার নেবে না।
                </div>


                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Apply Now
                </button>
            </div>

            {/* Right - Sidebar */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">সাম্প্রতিক জব পোস্ট</h2>
                <ul className="space-y-2">
                    {recentJobs.map((recent) => (
                        <li key={recent.id}>
                            <Link
                                href={`/job-post/${recent.id}`}
                                className="block p-3 bg-gray-100 hover:bg-gray-200 rounded transition"
                            >
                                <p className="font-medium">{recent.title}</p>
                                <p className="text-sm text-gray-500">{recent.postedAt}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
