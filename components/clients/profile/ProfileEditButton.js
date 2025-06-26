"use client"
import { contextD } from '@/contextApi/DashboardState'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { FiEdit } from 'react-icons/fi'

export default function ProfileEditButton({ profileInfo }) {

    const router = useRouter()
    const { handleProfileEditActivity } = useContext(contextD);

    // profile er data gulo localhost save korbe 
    // settings page a naviagte korbe

    const handleEditProfileInfo = () => {
        handleProfileEditActivity(profileInfo);
        router.push("/profile/settings")
    }


    return (
        // <Link href={"/profile/settings"} className=' inline-block '>
        <button onClick={handleEditProfileInfo} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <FiEdit /> Edit Profile
        </button>
        // </Link>
    )
}
