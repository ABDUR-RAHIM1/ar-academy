import { getChapterByIdentifier } from '@/app/apiActions/chapters';
import Link from 'next/link';
import React from 'react'

export default async function ChapterSIdebar({ subIdentifier }) {
    const paramsName = subIdentifier ? decodeURIComponent(subIdentifier) : "";
    const { status, data: chapterItems } = await getChapterByIdentifier(paramsName);
 

    return (
        <div className=' w-[250px] bg-indigo-50 text-gray-800 text-wrap px-3'>

            <>
                <h2 className=' my-5 text-center'>{paramsName}</h2>

                {
                    chapterItems && chapterItems.map((sub, index) => (
                        <Link
                            href={`/chapters/${subIdentifier}/${sub.identifier}`}
                           
                            key={sub._id} className={`"bg1 rounded-sm w-full inline-block my-1 p-2 text-[14px] transition-all duration-300 hover:color1 hover:underline`}>
                            <div className='flex items-center gap-3' title={`Position: ${sub.position || (- index + 1)}`}>
                                <span>{index + 1}.</span>
                                <span className=''>{sub.chapter_name} 
                                </span>

                            </div>
                        </Link>
                    ))
                }
                <div style={{ height: "10px" }}></div>
            </>
        </div>
    )
}
