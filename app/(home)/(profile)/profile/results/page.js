
import NoData from '@/utils/NoData';
import React from 'react'
import { getMyResultData } from '@/app/apiActions/results';
import Resultstable from '@/components/results/Resultstable';

//  for User profile
export default async function Result() {
    const { status, data } = await getMyResultData();

    // Check if status is not 200, or if data is empty or invalid
    if (status !== 200 || !data || !Array.isArray(data) || data.length === 0) {
        return <NoData text={"কোন রেজাল্ট নেই। "} />;
    }

    return <Resultstable
        resultsData={data}
        role={"student"}
    />
}
