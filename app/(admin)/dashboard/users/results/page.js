import { getAllResults } from '@/app/apiActions/admin/adminApi'
import NoData from '@/utils/NoData';
import React from 'react'
import Resultstable from './Resultstable';

//  Admin Dashboard
export default async function Result() {
    const { status, data } = await getAllResults();

    if (!status || !data) {
        return <NoData text={"Results not found"} />
    }

    return <Resultstable resultsData={data} />
}
