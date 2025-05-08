"use client"
import React, { useState } from 'react'
import Link from "next/link"  
import Logo from '@/utils/Logo'
import SearchButton from '../globals/search/SearchButton'
import { MdClose, MdMenu, } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import AccountBtn from './AccountBtn'


export default function Header() {

    const path = usePathname()

    const [menuClick, setMenuClick] = useState(false);


    const menuItems = [

        {
            item: "সমস্ত ক্যাটাগরি",
            path: "/categories",
        },
        {
            item: "সমস্যা ও সমাধান",
            path: "/problem-solved",
        },
        {
            item: "পরীক্ষা দিন",
            path: "/exam",
        },
        {
            item: "আমাদের সম্পর্কে",
            path: "/about-us",
        },
    ]


    return (
        <>
            {/*  desktop header start  */}
            <div className=' hidden md:flex sticky top-0 px-4 py-5 bg1  items-center justify-between flex-wrap z-40'>
                <Logo />

                <nav className=' flex items-center justify-center gap-3 text-white'>
                    {
                        menuItems.map((item, index) => (
                            <Link href={item.path}
                                key={index}
                                className={` ${path === item.path ? "text-blue-300" : ""} text-sm font-medium hover:text-blue-300 transition-all`}
                            >{item.item}
                            </Link>
                        ))
                    }
                </nav>


                <div className=' flex items-center gap-1 md:gap-2'>
                    {/* <SearchButton /> */}

                    <AccountBtn />
                 
                </div>
            </div>
            {/*  desktop header End  */}

            {/* ------------------------------------------------------------------------------ */}

            {/* Mobile Header Start  */}
            <div className=' flex md:hidden sticky top-0 px-4 py-5 bg1 items-center justify-between flex-wrap z-40'>
                <Logo />

                {/* <SearchButton /> */}

                <div className=' flex items-center gap-1 md:gap-2'>

                    {
                        menuClick ?
                            <MdClose
                                onClick={() => setMenuClick(!menuClick)}
                                className=' text-3xl text-white cursor-pointer'
                            />
                            :
                            <MdMenu
                                onClick={() => setMenuClick(!menuClick)}
                                className=' text-3xl text-white cursor-pointer'
                            />
                    }



                    <div className={`mobileMenus ${menuClick ? " scale-y-100" : "scale-y-0"} origin-top transition-all w-full bg-gray-50 absolute top-[70px] left-0 text-white p-5 z-50 shadow-md`}>
                        <div className=' flex flex-col gap-4'>
                            {
                                menuItems.map((item, index) => (
                                    <Link
                                        href={item.path}
                                        key={index}
                                        onClick={() => setMenuClick(false)}
                                        className={` ${path === item.path ? "text-blue-300" : ""} text-sm font-medium hover:text-blue-300 transition-all color1`}
                                    >{item.item}
                                    </Link>
                                ))
                            }
                        </div>
                        <br />
                        <AccountBtn />
                    </div>

                </div>
            </div>
            {/* Mobile Header End  */}


        </>


    )
}
