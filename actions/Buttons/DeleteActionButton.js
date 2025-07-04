"use client"
import React, { useContext, useState } from 'react'
import { deleteAction } from '../admins/deleteAction';
import { contextD } from '@/contextApi/DashboardState';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

// use for admin
export default function DeleteActionButton({ btnText, deleteRoute, width }) {
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
                <Button variant="destructive" style={{ width: width || "auto" }}>
                    <LoaderIcon className="animate-spin text-center" /> ...
                </Button>
                :
                <Button variant="destructive" style={{ width: width || "auto" }}>
                    {
                        btnText || "ডিলিট"
                    }
                </Button>

            }
        </div>
    )
}
