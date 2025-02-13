"use client"
import { contextD } from '@/contextApi/DashboardState';
import Logo from '@/utils/Logo';
import React, { useContext } from 'react'
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
export default function DashboardHeader() {

    const { isOpen, setIsOpen } = useContext(contextD)

    return (
        <div className={` w-full flex md:hidden py-5 px-4 bg-gray-800  items-center justify-between sticky top-0 z-50`}>

            <Logo />

            <div onClick={() => setIsOpen(!isOpen)}>

                {
                    isOpen ?
                        < FaBars className={" cursor-pointer text-white text-3xl"} />
                        :
                        < IoClose className={" cursor-pointer text-red-600 text-3xl"} />
                }

            </div>
        </div>
    )
}
