"use client"
import { dummyJobs } from '@/LocalDatabase/dummyJob'
import React, { useEffect, useState } from 'react'


const categories = ['All', 'IT', 'Marketing', 'Education']
const dateFilters = ['All', 'Today', 'Last 7 Days']

export default function JobPost() {
    const [jobs, setJobs] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedDate, setSelectedDate] = useState('All')

    useEffect(() => {
        // Load from backend API in real app
        setJobs(dummyJobs)
    }, [])

    const filterJobs = () => {
        let filtered = [...dummyJobs]

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(job => job.category === selectedCategory)
        }

        // Filter by date
        if (selectedDate === 'Today') {
            const today = new Date().toISOString().split('T')[0]
            filtered = filtered.filter(job => job.postedAt === today)
        } else if (selectedDate === 'Last 7 Days') {
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            filtered = filtered.filter(job => new Date(job.postedAt) >= sevenDaysAgo)
        }

        return filtered
    }

    const filteredJobs = filterJobs()

    return (
        <div className="max-w-6xl mx-auto p-4 my-10">
            <h1 className="text-2xl font-bold mb-6">সকল জব পোস্ট</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Category Filter */}
                <div>
                    <label htmlFor="categorie">Filter By Categorie</label>
                    <br />
                    <select
                        id='categorie'
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border px-4 py-2 rounded"
                    >
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Date Filter */}
                <div>
                    <label htmlFor="date">Filter By Date</label>
                    <br />
                    <select
                        id='date'
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border px-4 py-2 rounded"
                    >
                        {dateFilters.map((date, i) => (
                            <option key={i} value={date}>{date}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Job Post List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div key={job.id} className="border p-4 rounded shadow hover:shadow-md transition">
                            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                            <p className="text-sm text-gray-600 mb-1">বিভাগ: {job.category}</p>
                            <p className="text-sm text-gray-500 mb-3">প্রকাশের তারিখ: {job.postedAt}</p>
                            <p className="text-sm mb-4">{job.description}</p>

                            <a
                                href={`/job-post/${job.id}`}
                                className=" text-sm inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                বিস্তারিত
                            </a>
                        </div>
                    ))
                ) : (
                    <p>কোনো জব পোস্ট পাওয়া যায়নি।</p>
                )}
            </div>

        </div>
    )
}
