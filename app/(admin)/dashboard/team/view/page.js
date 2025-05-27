import { getAllAdmin } from '@/app/apiActions/admin/adminApi'
import NoData from '@/utils/NoData';
import React from 'react'
import AdminTable from './AdminTable';


//  manage Team member in the admin pannel
export default async function ManageTeam() {
  const { status, data } = await getAllAdmin();

  if (status !== 200 || !data) {
    return <NoData text={"কোন এডমিন পাওয়া যায়নি!"} />
  }

  return <AdminTable adminList={data} />
}
