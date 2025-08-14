import React from 'react' 
import NoData from '@/utils/NoData'
import AddChapterList from './AddChapterList'
import ViewChapterList from './ViewChapterList'
import { getAllChapterList } from '@/app/apiActions/chapterList'

export default async function SubjectList() {

    const { status, data } = await getAllChapterList()

    if (status !== 200 || !data) {
        return <NoData text={"subject not found"} />
    }

    return (
        <div className=" px-3 min-h-screen bg-gray-50 overflow-hidden">
            <AddChapterList />
            <ViewChapterList
                data={data}
            />
        </div>
    )
}
