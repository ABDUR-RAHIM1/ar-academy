"use client"

import React, { use, useContext, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { SettingsIcon } from "lucide-react"
import { deleteAction } from "@/actions/admins/deleteAction"
import { accountDelete } from "@/constans"
import { contextD } from "@/contextApi/DashboardState"
import LoadingSpinner from "@/components/spinner-01"
import AccessModal from "@/components/dashboard/userManagment/AccessModal"

export function ActionDropdown({ accountId }) {
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // delete user (admin)
    const handleDelete = async () => {
        try {

            const deleteResponse = window.confirm("ইউসার কে ডিলিট করতে চান ?");

            if (deleteResponse) {
                setLoading(true);

                const { status, data } = await deleteAction(accountDelete + accountId);
                showToast(status, data)

            }

        } catch (error) {
            console.log(error)
            showToast(500, "faild to delete!")
        } finally {
            setLoading(false)
        }
    }



    return (
        <>

            <AccessModal showModal={showModal} setShowModal={setShowModal} userId={accountId} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {
                            loading ?
                                <> Manage <LoadingSpinner /> </>
                                : <><SettingsIcon className=" h-4 w-4" /> Manage</>
                        }

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={handleDelete} className={" text-red-800"}>
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowModal(true)}>
                            Access
                        </DropdownMenuItem>

                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
