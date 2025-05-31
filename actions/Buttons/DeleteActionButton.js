"use client"
import React, { useContext, useState } from 'react'
import { deleteAction } from '../admins/deleteAction';
import { contextD } from '@/contextApi/DashboardState';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function DeleteActionButton({ btnText, deleteRoute }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const { showToast } = useContext(contextD)

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const { status, data } = await deleteAction(deleteRoute);

            showToast(status, data)
            router.refresh()

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
                <Button variant="destructive">
                    <LoaderIcon className="animate-spin text-center" /> ...
                </Button>
                :
                <Button variant="destructive">
                    {
                        btnText || "ডিলিট"
                    }
                </Button>

            }
        </div>
    )
}
