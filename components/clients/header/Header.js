"use client"
import React, { useState } from 'react'
import Link from "next/link"
import Logo from '@/utils/Logo'
import SearchButton from '../globals/search/SearchButton'
import { MdClose, MdMenu, } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import AccountBtn from './AccountBtn'
import Dropdown from './Dropdown'



/**
 * job post items ti enable (uncomment korte hobe)
 * @returns 
 * 
 */
export default function Header() {

    const path = usePathname()

    const [menuClick, setMenuClick] = useState(false);


    const menuItems = [

        {
            item: "সমস্ত ক্যাটাগরি",
            path: "/categories",
        },
        // {
        //     item: "জব পোষ্ট",
        //     path: "/job-post",
        // },
        {
            item: "পরীক্ষা দিন",
            path: "/exam",
        },
        {
            item: "প্রশ্ন খুঁজুন",
            path: "/find-question",
        },
        {
            item: "আমাদের সম্পর্কে",
            path: "/about-us",
        },
    ]


    return (
        <>
            {/*  desktop header start  */}
            <div className='hidden md:flex sticky top-0 px-4 py-5 bg-indigo-50 shadow-sm md:shadow-md items-center justify-between flex-wrap z-40'>

                <Logo />

                <nav className="flex items-center gap-4 px-4 py-2 bg-white rounded-full shadow-md border border-gray-200">

                    <Dropdown menuClick={menuClick} setMenuClick={setMenuClick} />

                    {menuItems.map((item, index) => (
                        <Link
                            href={item.path}
                            key={index}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                            ${path === item.path
                                    ? "bg-blue-100 text-blue-800"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-800"}`}
                        >
                            {item.item}
                        </Link>
                    ))}
                </nav>



                <div className=' flex items-center gap-1 md:gap-2'>
                    {/* <SearchButton /> */}

                    <AccountBtn menuClick={menuClick} setMenuClick={setMenuClick} />


                </div>
            </div>
            {/*  desktop header End  */}

            {/* ------------------------------------------------------------------------------ */}

            {/* Mobile Header Start  */}
            <div className='flex md:hidden sticky top-0 px-4 py-5 bg-indigo-50 shadow-md items-center justify-between flex-wrap z-40'>
                <Logo />

                <div className='flex items-center gap-4'>
                    {
                        menuClick ?
                            <MdClose
                                onClick={() => setMenuClick(false)}
                                className='text-3xl text-indigo-700 cursor-pointer'
                            />
                            :
                            <MdMenu
                                onClick={() => setMenuClick(true)}
                                className='text-3xl text-indigo-700 cursor-pointer'
                            />
                    }
                </div>

                <div className={`mobileMenus origin-top transition-transform duration-300 ease-in-out
        ${menuClick ? "scale-y-100" : "scale-y-0"} 
        absolute top-full left-0 w-full bg-white shadow-md rounded-b-md overflow-hidden z-50`}>
                    <nav className='flex flex-col px-6 py-4 gap-3'>

                        <Dropdown menuClick={menuClick} setMenuClick={setMenuClick} />
                        {menuItems.map((item, index) => (
                            <Link
                                href={item.path}
                                key={index}
                                onClick={() => setMenuClick(false)}
                                className={`text-gray-700 text-base font-medium rounded-md px-3 py-2 transition-colors
                    ${path === item.path ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 hover:text-blue-700"}`}
                            >
                                {item.item}
                            </Link>
                        ))}

                    </nav>
                    <div className="px-6 pt-2 pb-4 border-t border-gray-200">
                        <AccountBtn menuClick={menuClick} setMenuClick={setMenuClick} />
                    </div>
                </div>
            </div>
            {/* Mobile Header End  */}



        </>


    )
}
