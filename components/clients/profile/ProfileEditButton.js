"use client" 
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiEdit } from 'react-icons/fi'

export default function ProfileEditButton({ profileInfo }) {

    const router = useRouter()

    // profile er data gulo localhost save korbe 
    // settings page a naviagte korbe
    const handleProfileEditActivity = () => {

        const { plan, password, role, status, ...others } = profileInfo

        const jsonString = JSON.stringify(others); // Step 1: object → string
        const base64Encoded = btoa(unescape(encodeURIComponent(jsonString)));

        localStorage.setItem("ONUSHILON_USER_CACHE", base64Encoded);
        router.push("/profile/settings")
    }


    return (
        // <Link href={"/profile/settings"} className=' inline-block '>
        <button onClick={handleProfileEditActivity} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <FiEdit /> Edit Profile
        </button>
        // </Link>
    )
}
