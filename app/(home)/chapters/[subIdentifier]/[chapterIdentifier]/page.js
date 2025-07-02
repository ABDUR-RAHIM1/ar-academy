import { getChapterWithContent } from '@/app/apiActions/chapters';
import React from 'react'
import { CommentSection } from '../../Comments';
import Link from 'next/link';
import WrittenSolutions from '../../WrittenSolutions';
import EditorSolutions from '../../EditorSolutions';
import SolutionTable from '../../SolutionTable';
import NoData from '@/utils/NoData';
import { BASE_URL } from '@/constans';

export async function generateMetadata({ params }) {
    const subIdentifier = decodeURIComponent(params.subIdentifier);
    const chapterIdentifier = decodeURIComponent(params.chapterIdentifier);

    const { status, data: chapterDetails } = await getChapterWithContent(chapterIdentifier);

    if (status !== 200 || !chapterDetails) {
        return {
            title: "অধ্যায় খুঁজে পাওয়া যায়নি - অনুশীলন একাডেমি",
            description: "আপনি যে অধ্যায়টি খুঁজছেন তা পাওয়া যায়নি। অনুগ্রহ করে সঠিক লিঙ্ক ব্যবহার করুন।",
        }
    }

    return {
        title: `${chapterDetails.chapter_name} - অধ্যায় সমাধান`,
        description: `${chapterDetails.chapter_name} অধ্যায়ের বিস্তারিত সমাধান এবং প্রশ্নোত্তর এখানে পাবেন।`,
        alternates: {
            canonical: `${BASE_URL}/chapters/${subIdentifier}/${chapterIdentifier}`,
        },
        openGraph: {
            title: `${chapterDetails.chapter_name} - অধ্যায় সমাধান | অনুশীলন একাডেমি`,
            description: `${chapterDetails.chapter_name} অধ্যায়ের প্রশ্ন সমাধান এবং প্রয়োজনীয় তথ্য এখানে রয়েছে।`,
            url: `${BASE_URL}/chapters/${subIdentifier}/${chapterIdentifier}`,
            siteName: "অনুশীলন একাডেমি",
            images: [
                {
                    url: `${BASE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: 'অধ্যায় সমাধান অনুশীলন একাডেমি',
                },
            ],
            locale: "bn_BD",
            type: "article",
        },
        twitter: {
            card: 'summary_large_image',
            title: `${chapterDetails.chapter_name} - অধ্যায় সমাধান`,
            description: `${chapterDetails.chapter_name} অধ্যায়ের প্রশ্ন সমাধান অনুশীলন একাডেমি থেকে জেনে নিন।`,
            images: [`${BASE_URL}/og-image.png`],
        },
    }
}



export default async function ChapterDetails({ params }) {
    const chapter = await params;
    const chapterIdentifier = decodeURIComponent(chapter.chapterIdentifier);

    const { status, data: chapterDetails } = await getChapterWithContent(chapterIdentifier);


    if (status !== 200) {
        return <NoData text={chapterDetails?.message} />
    }

    return (
        <div>
            {/* যদি chapter থাকে, তাহলে শুধু chapter এর ডাটা দেখাবে */}
            {chapterIdentifier && chapterDetails && (
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
                                        <EditorSolutions markdownContent={chapterDetails.contents} />

                            }

                        </div>
                    </div>

                    <div className='my-5 text-center px-2'>
                        <Link
                            href={`/exam/chapter/${chapterDetails._id}`}
                            className='inline-block py-3 px-5 bg1 text-white font-semibold text-lg rounded-md shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg'>

                            {`পরীক্ষা দিন 🚀`}
                            {/* {`📖 ${subIdentifier}  বিষয়ের উপর পরীক্ষা দিন 🚀`} */}
                        </Link>
                    </div>

                    <CommentSection chapterId={chapterDetails._id} />
                </div>

            )}
        </div>
    )
}
