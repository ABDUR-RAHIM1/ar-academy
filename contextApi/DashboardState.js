"use client"
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react"


export const contextD = createContext()

export default function DashboardState({ children }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null)

    // Function to show toast
    const showToast = (status, data) => {
        const message = data.message || data
        if (status === 200 || status === 201) {
            toast({
                title: "Success!",
                description: message,
                duration: 4000,
                className: "bg-green-100 border-l-4 border-green-500 text-green-700",
            });
            router.refresh()
        } else {
            toast({
                title: "Failed!",
                description: message,
                duration: 4000,
                className: "bg-red-100 border-l-4 border-red-500 text-red-700",
            });
        }
    };


    const value = {
        isOpen, setIsOpen,
        editData, setEditData,
        showToast,
    }


    return (
        <contextD.Provider value={value} >{children}</contextD.Provider>
    )
}
