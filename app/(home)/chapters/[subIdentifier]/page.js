"use client"
import { getChapterWithContent } from '@/app/apiActions/client/clientApi';
import Loading from '@/utils/Loading';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { CommentSection } from '../Comments';
import Link from 'next/link';
import { contextD } from '@/contextApi/DashboardState';
import CommentList from '../comments/CommentList';

export default function ChaptersDetails() {
    const { subIdentifier } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const chapter = searchParams.get("chapter");
    const coverPhoto = searchParams.get("coverPhoto");

    const [chapterDetails, setChapterDetails] = useState(null);

    useEffect(() => {

      

        if (!chapter) return; // যদি chapter না থাকে, API কল করবে না
        const getDetails = async () => {
            setLoading(true);
          
            try {
                const { status, data } = await getChapterWithContent(chapter);
                if (status === 200 && data) {
                    setChapterDetails(data);
                }
            } catch (error) {
                console.log("Failed to fetch chapter details");
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

            {/* যদি coverPhoto থাকে এবং chapter না থাকে, শুধু cover দেখাবে */}
            {coverPhoto && !chapter && (
                <div className=" px-5 w-full h-screen flex justify-center items-center">
                    <Image
                        src={coverPhoto}
                        width={1000}
                        height={1000}
                        alt="Book Cover"
                        className="w-auto h-[70vh] md:h-auto"
                    />
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
                            <div dangerouslySetInnerHTML={{ __html: chapterDetails.contents }} />
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
                    {/* <CommentList chapterId={chapterDetails._id} /> */}
                </div>

            )}

        </div>
    );
}
