import React from 'react'
import AddSubjectForm from './AddSubject'
import ViewSubjectList from './ViewSubjectList'
import { getAllSubjectList } from '@/app/apiActions/subjectList'
import NoData from '@/utils/NoData'

export default async function SubjectList() {

    const { status, data } = await getAllSubjectList()

    if (status !== 200 || !data) {
        return <NoData text={"subject not found"} />
    }

    return (
        <div className=" px-3 min-h-screen bg-gray-50 overflow-hidden">
            <AddSubjectForm />
            <ViewSubjectList
                data={data}
            />
        </div>
    )
}
