import { DeleteBtn } from '@/utils/DeleteBtn'
import React, { useContext, useState } from 'react'
import { deleteAction } from '../admins/deleteAction';
import { contextD } from '@/contextApi/DashboardState';

export default function DeleteActionButton({ deleteRoute }) {

    const [isLoading, setIsLoading] = useState(false)
    const { showToast } = useContext(contextD)

    const handleDelete = async () => {
        setIsLoading(true) 
        try {
            const { status, data } = await deleteAction(deleteRoute);
            showToast(status, data)

        } catch (error) {
            console.log(error)
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
