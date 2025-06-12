import { getAllChapters } from '@/app/apiActions/admin/adminApi'
import React from 'react'
import ChaptersTable from './ChaptersTable';
import Error from '@/utils/Error';
import Heading from '@/components/clients/globals/Heading';

export default async function ViewChapters() {
    const { status, data } = await getAllChapters();

    if (!status || !data) {
        return <Error />
    }

    return (
        <div>
            <Heading text={"Chapters"} />
            <ChaptersTable chaptersData={data} />
        </div>
    )
}
