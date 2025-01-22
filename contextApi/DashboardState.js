"use client"
import { toast } from "@/hooks/use-toast";
import { createContext, useState } from "react"


export const contextD = createContext()

export default function DashboardState({ children }) {

    const [isOpen, setIsOpen] = useState(false);

    // Function to show toast
    const showToast = (status, message) => {
        if (status === 200 || status === 201) {
            toast({
                title: "Success!",
                description: message,
                duration: 4000,
            });
        } else {
            toast({
                title: "Failed!",
                description: message,
                duration: 4000,
            });
        }
    };


    const value = {
        isOpen, setIsOpen,
        showToast,
    }


    return (
        <contextD.Provider value={value} >{children}</contextD.Provider>
    )
}
