"use client"

import React, { useContext, useState } from "react"
import { 
    Settings, 
    Trash2, 
    UserPlus, 
    MoreHorizontal,
    Loader2
} from "lucide-react"

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
import { deleteAction } from "@/actions/admins/deleteAction"
import { accountDelete } from "@/constans"
import { contextD } from "@/contextApi/DashboardState"
import AccessModal from "@/components/dashboard/userManagment/AccessModal"

export function ActionDropdown({ accountId }) {
    const { showToast } = useContext(contextD);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async (e) => {
        // Dropdown menu ক্লোজ হওয়ার সময় ফোকাস ইস্যু এড়াতে preventDefault ব্যবহার করা ভালো
        const deleteResponse = window.confirm("আপনি কি নিশ্চিতভাবে এই ইউজারকে ডিলিট করতে চান?");
        
        if (deleteResponse) {
            setLoading(true);
            try {
                const { status, data } = await deleteAction(accountDelete + accountId);
                showToast(status, data);
            } catch (error) {
                console.error(error);
                showToast(500, "Failed to delete user!");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            {/* মডালটি ড্রপডাউনের বাইরেই থাকবে */}
            <AccessModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                studentId={accountId} 
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full focus:ring-0 focus-visible:ring-0"
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 text-slate-600" />
                    </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl shadow-lg border-slate-200">
                    <DropdownMenuLabel className="text-[10px] font-bold uppercase text-slate-400 tracking-widest px-2 py-1.5">
                        User Actions
                    </DropdownMenuLabel>
                    
                    <DropdownMenuGroup>
                     
                        <DropdownMenuItem 
                            onSelect={(e) => {
                                e.preventDefault(); 
                                setShowModal(true);
                            }}
                            className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-700 transition-colors"
                        >
                            <UserPlus className="h-4 w-4" />
                            <span className="font-medium">Course Access</span>
                        </DropdownMenuItem>

                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-1 bg-slate-100" />

                    <DropdownMenuItem 
                        disabled={loading}
                        onSelect={(e) => {
                            e.preventDefault(); 
                            handleDelete();
                        }}
                        className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded-lg text-red-600 focus:bg-red-50 focus:text-red-700 transition-colors"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                        <span className="font-bold">{loading ? "Deleting..." : "Delete User"}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}