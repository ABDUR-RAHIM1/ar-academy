"use client"
import { contextD } from '@/contextApi/DashboardState'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { IoMdLogOut } from 'react-icons/io'

export default function AdminLogOutButton() {
    const { showToast } = useContext(contextD);
    const router = useRouter();

    const handleLogOut = () => {

        Cookies.remove("onushilon_access")

        const isStillThere = Cookies.get("onushilon_access")

        if (!isStillThere) {
            showToast(200, "✅ successfully logout");
            router.push("/")
        } else {
            showToast(500, "❌ logout failed")
        }
    }

    return (
        <button onClick={handleLogOut} className={"w-full flex items-center text-lg cursor-pointer p-2 bg-red-700 hover:bg-red-600 rounded-md capitalize"}>
            <IoMdLogOut className=' mr-4' />
            logout</button>
    )
}
