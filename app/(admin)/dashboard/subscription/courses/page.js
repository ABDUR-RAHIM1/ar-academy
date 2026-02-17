import { getAllPurchased } from '@/app/apiActions/purchase'
import NoData from '@/utils/NoData';
import React from 'react'
import PurchasedTable from '../PurchasedTable';

export default async function PurchaseCourse() {
  const { status, data } = await getAllPurchased();


  if (status !== 200 || !data) {
    return <NoData text={"Not Found!"} />
  }

  return <PurchasedTable
    type={"course"}
    purchasedData={data} />
}
