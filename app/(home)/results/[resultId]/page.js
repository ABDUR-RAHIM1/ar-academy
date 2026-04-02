
import { getResultById } from '@/app/apiActions/results';
import { resultMetaData } from '@/seo/resultMetadata';
import NoData from '@/utils/NoData';
import React from 'react';
import ResultDeatils from '@/components/resultDetails/ResultDetails';

export const metadata = resultMetaData

export default async function StudentResultDeatils({ params }) {
    const { resultId } = await params;
    const { status, data } = await getResultById(resultId);

    if (!status || !data) {
        return <NoData text={" কোনও রেজাল্ট পাওয়া যায়নি"} />;
    }

    return <ResultDeatils result={data} />
}
