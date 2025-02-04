import { getChapterByIdentifier } from '@/app/apiActions/client/clientApi';
import Heading from '@/components/clients/globals/Heading';
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import Link from 'next/link';
import React from 'react'

export default async function SubCategories({ params }) {
    const { subId } = await params;
    const paramsName = subId ? decodeURIComponent(subId) :""

    const { status, data } = await getChapterByIdentifier(subId);
 
    if (!status || !data) {
        return <Error />
    }

    return (
        <div className=' py-10 px-3 md:px-5'>
      <Heading text={`চ্যাপ্টার সমূহ - (${paramsName})`} />
            <div className=' flex flex-wrap gap-3'>
                {
                    data && data.length <= 0 ? <NoData />
                        :
                        data.map(chapter => (
                            <ChapterCard
                                key={chapter._id}
                                chapter={chapter}
                            />
                        ))

                }
            </div>
        </div>

    )
}


const ChapterCard = ({ chapter }) => {
    const { _id, chapter_name, identifier } = chapter
    return (
        <Link href={`/chapters/${identifier}`} className=' w-[48%] md:w-[22%] border-r-4 border-r-blue-900 py-2 px-3 rounded-md shadow-md my-3 hover:shadow-2xl hover:translate-y-2 transition-all'>
            <h4 className='text-center font-bold text-xl'>{chapter_name}</h4>
        </Link>
    )
}