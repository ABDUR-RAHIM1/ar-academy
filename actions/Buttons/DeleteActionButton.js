import { DeleteBtn } from '@/utils/DeleteBtn'
import React, { useContext, useState } from 'react'
import { deleteAction } from '../admins/deleteAction';
import { contextD } from '@/contextApi/DashboardState';

export default function DeleteActionButton({ btnText, deleteRoute }) {

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
            {isLoading ?
                (<button className=' rounded-md text-sm py-2 px-3 font-bold text-white bg-red-700 transition-all hover:bg-red-800'>
                     ডিলিট করা হচ্ছে...
                </button>)
                :
                (<button className=' rounded-md py-2 px-3 text-sm font-bold text-white bg-red-700 transition-all hover:bg-red-800'>
                    {btnText || "ডিলিট"}
                </button>)
            }
        </div>
    )
}

{/* <div onClick={handleDelete}>
            {isLoading ? "deleting..." : <DeleteBtn />}
        </div> */}