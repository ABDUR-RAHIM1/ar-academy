import { getAllCourse } from '@/app/apiActions/Course'
import React from 'react'
import CourseTable from './CourseTable';
import NoData from '@/utils/NoData';

export default async function CourseView() {

    const { status, data } = await getAllCourse();

    if (status !== 200 || !data) {
        return <NoData />
    }

    return <CourseTable data={data} />
}
