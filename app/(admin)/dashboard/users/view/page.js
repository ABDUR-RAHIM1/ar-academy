import { getAllAccounts } from '@/app/apiActions/admin/adminApi'
import NoData from '@/utils/NoData';
import React from 'react'
import UserTable from './UserTable';

export default async function Users() {
    const { status, data } = await getAllAccounts();
    
    if (!status || !data) {
        return <NoData />
    }

    return (
        <div>
            <UserTable usersData={data} />
        </div>
    )
}
