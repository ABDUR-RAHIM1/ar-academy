"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AdminProfileEditButton({ profileInfo }) {

    const router = useRouter()

    // Dashboard er data gulo localhost save korbe 
    // settings page a naviagte korbe
    const handleProfileEditActivity = () => {

        const { plan, password, role, status, ...others } = profileInfo

        const jsonString = JSON.stringify(others); // Step 1: object → string
        const base64Encoded = btoa(unescape(encodeURIComponent(jsonString)));

        localStorage.setItem("ONUSHILON_ACCESS_CACHE", base64Encoded);
        router.push("/dashboard/settings/edit-profile")
    }


    return (
        <Button
            variant="outline"
            size="sm" onClick={handleProfileEditActivity}>
            ✏️ Edit Account
        </Button>
    )
}

