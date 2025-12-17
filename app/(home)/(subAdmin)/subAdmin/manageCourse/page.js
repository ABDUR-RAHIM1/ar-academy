
import { getMyCreatedCourseBySubAdmin } from '@/app/apiActions/purchase';
import PurchaseCourseDetails from '@/components/courseDetails/PurchaseCourseDetails';
import NoData from '@/utils/NoData';
import React from 'react'

export default async function ManageCourses() {
    const { status, data } = await getMyCreatedCourseBySubAdmin();


    if (status !== 200 || !data) {
        return <NoData text={"আপনার অধীনে কোন কোর্স নেই"} />
    }

    return <PurchaseCourseDetails
        courseData={data}
        path='subAdmin'
    />
}
0