"use client"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdLogOut } from 'react-icons/io'

export default function AdminLogOutButton() {
    const router = useRouter()
    const handleLogOut = () => {
        // Cookies.remove("")
        alert("log out admin")
        router.push("/")
    }

    return (
        <button onClick={handleLogOut} className={"w-full flex items-center text-lg cursor-pointer p-2 bg-red-700 hover:bg-red-600 rounded-md capitalize"}>
            <IoMdLogOut className=' mr-4' />
            logout</button>
    )
}
