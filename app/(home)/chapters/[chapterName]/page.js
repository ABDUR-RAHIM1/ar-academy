import { getChapterWithContent } from '@/app/apiActions/client/clientApi';
import Error from '@/utils/Error';
import React from 'react'

export default async function Chapter({ params }) {
    const { chapterName } = await params;

    const { status, data } = await getChapterWithContent(chapterName);

    if (!status || !data) {
        return <Error />
    };
 
    
    return (
        <div className=' w-full md:w-[75%] m-auto bg-gray-100  px-4 md:px-5 my-5 py-10'>
            <h2 className=' my-4 text-center text-blue-900 font-bold italic'> {data.chapter_name}</h2>

            <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
        </div>
    )
}
