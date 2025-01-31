"use client"
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
export const contextD = createContext()

export default function DashboardState({ children }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(true);
    const [editData, setEditData] = useState({});
    const [showSearchBar, setShowSearchBar] = useState(false)

    // Function to show toast
    const showToast = (status, data) => {
        const message = data.message || data

        if (status === 200 || status === 201) {
            toast.success(message);
            router.refresh();
        } else {
            toast.error(message);
        }
    };


    const value = {
        isOpen, setIsOpen,
        editData, setEditData,
        showToast,
        showSearchBar, setShowSearchBar,
    }


    return (
        <contextD.Provider value={value} >{children}</contextD.Provider>
    )
}
