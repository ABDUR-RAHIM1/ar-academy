"use client"
import { getChapterWithContent } from '@/app/apiActions/client/clientApi';
import Loading from '@/utils/Loading';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { contextD } from '@/contextApi/DashboardState';


export default function ChaptersDetailsClient() {

    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const chapter = searchParams.get("chapter");

    const [chapterNessage, setChapterMessage] = useState("")

    const [chapterDetails, setChapterDetails] = useState(null);
    const params = useParams();
    const subIdentifier = decodeURIComponent(params.subIdentifier);




    return (
        <div>
            {/* যদি subIdentifier থাকে এবং chapter না থাকে, শুধু default cover hisebe দেখাবে */}
            {/* {subIdentifier && (
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="bg-white border-l-8 border-blue-500 shadow-xl rounded-lg px-12 py-16 max-w-lg text-center">
                        <h1 className="text-5xl font-bold text-blue-700 mb-4 leading-tight tracking-wide">
                            {subIdentifier}
                        </h1>
                        <p className="text-lg text-gray-500 italic">
                            বিষয়ে আপনার জ্ঞান বাড়াতে সহায়ক একটি রিসোর্স।
                        </p>
                    </div>
                </div>
            )} */}



            {/* যদি chapter থাকে কিন্তু কোনো details না আসে, তাহলে message দেখাও */}
            {chapter && !chapterDetails && chapterNessage && (
                <div className="text-center py-10">
                    <p className="text-red-500 text-lg font-medium">{chapterNessage}</p>
                </div>
            )}
        </div>
    )
}
