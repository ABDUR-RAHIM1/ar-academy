"use client"
import React, { useState } from 'react'
import Link from "next/link"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import Logo from '@/utils/Logo'
import SearchButton from '../globals/search/SearchButton'
import { MdMenu, } from 'react-icons/md'


export default function Header() {
    const [menuClick, setMenuClick] = useState(false);



    const menuItems = [
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
                            <span
                                key={index}
                                className=' text-sm font-medium'
                            >{item.item}
                            </span>
                        ))
                    }
                </nav>


                <div className=' flex items-center gap-1 md:gap-2'>
                    <SearchButton />

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button asChild>
                                    <Link href="/account">একাউন্ট </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>প্রিমিয়াম সব ফিচারস পেতে  লগইন করুন</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            {/*  desktop header End  */}

            {/* ------------------------------------------------------------------------------ */}

            {/* Mobile Header Start  */}
            <div className=' flex md:hidden sticky top-0 px-4 py-5 bg1 items-center justify-between flex-wrap z-40'>
                <Logo />

                <SearchButton />

                <div className=' flex items-center gap-1 md:gap-2'>

                    <MdMenu
                        onClick={() => setMenuClick(!menuClick)}
                        className=' text-3xl text-white'
                    />



                    <div className={`mobileMenus ${menuClick ? " scale-y-100" : "scale-y-0"} origin-top transition-all w-full bg-gray-50 absolute top-[70px] left-0 text-white p-5 z-50 shadow-md`}>
                        <div className=' flex flex-col gap-4'>
                            {
                                menuItems.map((item, index) => (
                                    <span
                                        key={index}
                                        className=' text-sm font-medium color1'
                                    >{item.item}
                                    </span>
                                ))
                            }
                        </div>
                        <br />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button asChild>
                                        <Link href="/account">একাউন্ট </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>প্রিমিয়াম সব ফিচারস পেতে  লগইন করুন</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {/* <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button asChild>
                                    <Link href="/account">একাউন্ট </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>প্রিমিয়াম সব ফিচারস পেতে  লগইন করুন</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}
                </div>
            </div>
            {/* Mobile Header End  */}


        </>


    )
}
