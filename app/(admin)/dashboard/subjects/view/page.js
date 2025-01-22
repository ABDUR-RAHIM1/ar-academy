import { getsActions } from '@/actions/admins/getsAction'
import Error from '@/utils/Error';
import React from 'react'
import SubjectTable from './SubjectTable';

export default async function ViewSubject() {
    const { status, data } = await getsActions("/api/subject");

    if (status !== 200 || !data) {
        return <Error />
    }

    return (
        <div>
            <SubjectTable subjectData={data} />
        </div>
    )
}
