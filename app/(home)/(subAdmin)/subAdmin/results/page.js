import NoData from '@/utils/NoData';
import React from 'react'
import Resultstable from './ResultTable';
import { getAllResultsBySubAdmin } from '@/app/apiActions/admin/results';

export default async function ResultsSubAdmin() {
    const { status, data } = await getAllResultsBySubAdmin();

    if (!status || !data) {
        return <NoData text={"Results not found"} />
    }

    return <Resultstable resultsData={data} />
}
