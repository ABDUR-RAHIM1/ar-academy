"use client"
import { getChapterWithContent } from '@/app/apiActions/client/clientApi';
import Loading from '@/utils/Loading';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdMenu } from 'react-icons/md';

export default function ChaptersDetails() {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const chapter = searchParams.get("chapter");
    const bookCover = searchParams.get("subCover");

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
        <div className=' py-10'>

            {/* যদি bookCover থাকে এবং chapter না থাকে, শুধু cover দেখাবে */}
            {bookCover && !chapter && (
                <div className="flex justify-center items-center">
                    <Image
                        src={bookCover}
                        width={1000}
                        height={1000}
                        alt="Book Cover"
                        className="w-auto h-auto"
                    />
                </div>
            )}

            {/* যদি chapter থাকে, তাহলে শুধু chapter এর ডাটা দেখাবে */}
            {chapter && chapterDetails && (
                <div className='flex justify-between flex-wrap'>
                    <div className="w-full bg-white px-4 md:px-5 py-10">
                        {/* Chapter Title */}
                        <h2 className="my-4 text-center color1 font-serif text-3xl md:text-4xl font-bold italic">
                            {chapterDetails.chapter_name}
                        </h2>

                        {/* Chapter Content */}
                        <div className="leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: chapterDetails.contents }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
