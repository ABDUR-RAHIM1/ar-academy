
import NoData from '@/utils/NoData';
import React from 'react'
import Resultstable from './Resultstable';
import { getMyResultData } from '@/app/apiActions/results';

//  for User profile
export default async function Result() {
    const { status, data } = await getMyResultData();

    // Check if status is not 200, or if data is empty or invalid
    if (status !== 200 || !data || !Array.isArray(data) || data.length === 0) {
        return <NoData text={"আপনি কোন পরিক্ষায় অংশগ্রহন করেননি!"} />;
    }

    return (
        <div>
            <Resultstable resultsData={data} />
        </div>
    );
}
