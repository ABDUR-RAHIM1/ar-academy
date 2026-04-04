import NoData from '@/utils/NoData';
import React from 'react'
import { getAllResultsBySubAdmin } from '@/app/apiActions/admin/results';
import Resultstable from '@/components/results/Resultstable';

export default async function ResultsSubAdmin() {
    const { status, data } = await getAllResultsBySubAdmin();

    if (!status || !data) {
        return <NoData text={"Results not found"} />
    }

    return <Resultstable resultsData={data} role={"subAdmin"} />
}
