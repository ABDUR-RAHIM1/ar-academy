import { getAllPlans } from '@/app/apiActions/public/getAllPlan'
import React from 'react'
import PlansTable from './PlansTable';
import NoData from '@/utils/NoData';

export default async function ViewSubscription() {
    const { status, data } = await getAllPlans();
    
    if (status !== 200) {
        return <NoData text={"Plans not found!"} />
    }

    return <PlansTable plansData={data} />
}
