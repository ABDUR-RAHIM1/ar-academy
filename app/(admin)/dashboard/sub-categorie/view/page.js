import { getsActions } from '@/actions/admins/getsAction'
import Error from '@/utils/Error';
import React from 'react'
import SubjectTable from './SubjectTable';
import { getSubCategorie } from '@/app/apiActions/client/clientApi';

export default async function ViewSubject() {
    const { status, data } = await getSubCategorie()

    if (status !== 200 || !data) {
        return <Error />
    }

    return (
        <div>
            <SubjectTable sub_categories={data} />
        </div>
    )
}
