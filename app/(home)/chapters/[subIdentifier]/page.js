"use client"
import { getChapterWithContent } from '@/app/apiActions/client/clientApi';
import Loading from '@/utils/Loading'; 
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { CommentSection } from '../Comments';
import Link from 'next/link';
import { contextD } from '@/contextApi/DashboardState'; 
import SolutionTable from '../SolutionTable';
import WrittenSolutions from '../WrittenSolutions';

export default function ChaptersDetails() {
    const { subIdentifier } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const chapter = searchParams.get("chapter");
    
    const [chapterNessage, setChapterMessage] = useState("")
    const [chapterDetails, setChapterDetails] = useState(null);

    useEffect(() => {
        if (!chapter) return;

        const getDetails = async () => {
            setLoading(true);

            // 🔴 পুরনো data reset করে দাও
            setChapterDetails(null);
            setChapterMessage("");

            try {
                const { status, data } = await getChapterWithContent(chapter);
                if (status === 200 && data) {
                    setChapterDetails(data);
                } else {
                    setChapterMessage(data?.message || "অধ্যায় লোড করতে সমস্যা হয়েছে");
                }
            } catch (error) {
                setChapterMessage("অধ্যায় লোড করতে ব্যর্থ হয়েছি");
            } finally {
                setLoading(false);
            }
        };

        getDetails();
    }, [chapter]);


    if (loading) {
        return <Loading />;
    }


    return (
        <div className='py-10'>

            {/* যদি subIdentifier থাকে এবং chapter না থাকে, শুধু default cover hisebe দেখাবে */}
            {subIdentifier && !chapter && (
                <div className="w-full h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <div className="bg-white border-l-8 border-blue-500 shadow-xl rounded-lg px-12 py-16 max-w-lg text-center">
                        <h1 className="text-5xl font-bold text-blue-700 mb-4 leading-tight tracking-wide">
                            {subIdentifier}
                        </h1>
                        <p className="text-lg text-gray-500 italic">
                            বিষয়ে আপনার জ্ঞান বাড়াতে সহায়ক একটি রিসোর্স।
                        </p>
                    </div>
                </div>
            )}



            {/* যদি chapter থাকে কিন্তু কোনো details না আসে, তাহলে message দেখাও */}
            {chapter && !chapterDetails && chapterNessage && (
                <div className="text-center py-10">
                    <p className="text-red-500 text-lg font-medium">{chapterNessage}</p>
                </div>
            )}



            {/* যদি chapter থাকে, তাহলে শুধু chapter এর ডাটা দেখাবে */}
            {chapter && chapterDetails && (
                <div className=''>
                    <div className="w-full bg-white px-4 md:px-5 py-10">
                        {/* Chapter Title */}
                        <h2 className="my-4 text-center color1 font-serif text-3xl md:text-4xl font-bold italic">
                            {chapterDetails.chapter_name}
                        </h2>

                        {/* Chapter Content */}
                        <div className="leading-relaxed ">

                            {
                                chapterDetails.fileType === "file" ?
                                    <div>
                                        <SolutionTable solutionTable={chapterDetails.solutionTable} />
                                    </div>

                                    : chapterDetails.fileType === "written" ?
                                        <WrittenSolutions writtenData={chapterDetails.writtenSolution} />
                                        :
                                        < div dangerouslySetInnerHTML={{ __html: chapterDetails.contents }} />
                            }

                        </div>
                    </div>

                    <div className='my-5 text-center px-2'>
                        <Link
                            href={`/exam/chapter/${chapterDetails._id}`}
                            className='inline-block py-3 px-5 bg1 text-white font-semibold text-lg rounded-md shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg'>

                            {`📖 ${subIdentifier}  বিষয়ের উপর পরীক্ষা দিন 🚀`}
                        </Link>
                    </div>

                    <CommentSection chapterId={chapterDetails._id} />
                </div>

            )}

        </div>
    );
}
