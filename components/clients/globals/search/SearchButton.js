"use client"
import { Input } from '@/components/ui/input'
import { contextD } from '@/contextApi/DashboardState'
import React, { useContext } from 'react'
import { MdSearch } from 'react-icons/md'

export default function SearchButton({ bg }) {
    const { showSearchBar, setShowSearchBar } = useContext(contextD)
    const handleShowSearchBar = () => {
        setShowSearchBar(!showSearchBar)
    }

    return (
        <div onClick={handleShowSearchBar} className=' cursor-pointer'>
            <Input placeholder={"Quick Search"} className={`${bg || "bg-white"} w-[200px]  hidden md:block `} />
            <MdSearch className=' block md:hidden text-3xl text-white' />
        </div>
    )
}
