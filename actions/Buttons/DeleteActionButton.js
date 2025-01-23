import { DeleteBtn } from '@/utils/DeleteBtn'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { deleteAction } from '../admins/deleteAction';
import { contextD } from '@/contextApi/DashboardState';

export default function DeleteActionButton({ deleteRoute }) {

    const [isLoading, setIsLoading] = useState(false)
    const { showToast } = useContext(contextD)
    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const { status, data } = await deleteAction(deleteRoute);
            if (status === 200) {
                router.refresh();
            };
            showToast(status, data)

        } catch (error) {
            showToast(500, "Failed To Delete!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div onClick={handleDelete}>
            {isLoading ? "deleting..." : <DeleteBtn />}
        </div>
    )
}
