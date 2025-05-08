import React from 'react'
import ChapterSidebar from '../../../../components/clients/Chapters/ChapterSIdebar'
import { getChapterByIdentifier } from '@/app/apiActions/client/clientApi';
import Error from '@/utils/Error';

export default async function ChapterDetailsLayout({ children, params }) {
    const { subIdentifier } = await params;

    const { status, data } = await getChapterByIdentifier(subIdentifier);

    if (!status || !data) {
        return <Error />
    }
    return (
        <div className=' flex gap-3'>

            <ChapterSidebar
                subIdentifier={subIdentifier}
            />

            <main className=' flex-1 h-screen overflow-y-auto scrollbarHide'>
                {children}
               
            </main>
        </div>
    )
}
