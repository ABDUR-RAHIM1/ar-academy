// import { getAllResults } from '@/app/apiActions/admin/adminApi'
import NoData from '@/utils/NoData';
import React from 'react'
import { getAllResults } from '@/app/apiActions/admin/results';
import Resultstable from '@/components/results/Resultstable';

//  Admin Dashboard
export default async function Result() {
    const { status, data } = await getAllResults();

    if (!status || !data) {
        return <NoData text={"Results not found"} />
    }

    return <Resultstable resultsData={data} role={"admin"} />
}
