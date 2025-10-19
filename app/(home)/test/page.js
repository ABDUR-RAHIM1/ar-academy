"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TestPage() {
    const router = useRouter()
    const handle = () => {
   router.push("/test/test-2")
    }

    return (
        <div>
            <p onClick={handle} href={"/test/test-2"}>
                Click
            </p>
        </div>
    )
}
