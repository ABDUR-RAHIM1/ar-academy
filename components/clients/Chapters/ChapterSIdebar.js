import { getChapterByIdentifier } from '@/app/apiActions/chapters';
import React from 'react'
import SidebarClient from './SidebarClient';

export default async function ChapterSIdebar({ subIdentifier }) {
    const paramsName = subIdentifier ? decodeURIComponent(subIdentifier) : "";
    const { status, data: chapterItems } = await getChapterByIdentifier(paramsName);
 

    return (
        <SidebarClient chapterItems={chapterItems} paramsName={paramsName} subIdentifier={subIdentifier} />
    )
}
