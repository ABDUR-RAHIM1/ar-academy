
import { getMyResultData } from '@/app/apiActions/client/clientApi'
import NoData from '@/utils/NoData';
import React from 'react'

//  for User profile
export default async function Result() {
    const { status, data } = await getMyResultData();

    if (!status || !data || status !== 200) {
        return <NoData text={"আপনি কোন পরিক্ষায় অংশগ্রহন করেননি!"} />
    }
 

    return (
        <div>Result</div>
    )
}
