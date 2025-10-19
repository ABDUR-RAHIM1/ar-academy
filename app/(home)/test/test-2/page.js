"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Test2() {

    const path = usePathname()

    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div>Test2</div>
    )
}
