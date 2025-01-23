"use client"
import { contextD } from '@/contextApi/DashboardState'
import { EditBtn } from '@/utils/EditBtn'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

export default function EditActionButton({ data, path }) {
    const router = useRouter();
    const { setEditSubject } = useContext(contextD);

    const handleEditData = () => {
        setEditSubject(data)
        router.push(path)
    }


    return (
        <div onClick={handleEditData}>
            <EditBtn />
        </div>
    )
}
