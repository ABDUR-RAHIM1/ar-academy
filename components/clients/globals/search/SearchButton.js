"use client"
import { Input } from '@/components/ui/input'
import { contextD } from '@/contextApi/DashboardState'
import React, { useContext } from 'react'

export default function SearchButton({ bg }) {
    const { showSearchBar, setShowSearchBar } = useContext(contextD)
    const handleShowSearchBar = () => {
        setShowSearchBar(!showSearchBar)
    }

    return (
        <div onClick={handleShowSearchBar} className={`w-[200px] ${bg || "bg-white"}`}>
            <Input placeholder={"Quick Search"} />
        </div>
    )
}
