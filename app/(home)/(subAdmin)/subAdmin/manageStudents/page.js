import React from 'react'
import AddStudent from './AddStudent' 
import StudentTable from './StudentTable';
import { getSubAdminStudentAccount } from '@/app/apiActions/account';
import NoData from '@/utils/NoData';

export default async function ManageStudent() {
    const { status, data } = await getSubAdminStudentAccount();

    if (status !== 200 || !data) {
        return <NoData text={"স্টুডেন্ট পাওয়া যায়নি "} />
    }

    return (
        <div className=' bg-white rounded-md p-5'>
            <AddStudent />

            <div className=' my-10'>
                <StudentTable studentData={data} />
            </div>
        </div>
    )
}

