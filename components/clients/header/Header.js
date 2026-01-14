"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Logo from '@/utils/Logo'
import { MdClose, MdMenu } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import AccountBtn from './AccountBtn'
import Dropdown from './Dropdown'

export default function Header() {

    const path = usePathname()
    const [menuClick, setMenuClick] = useState(false);
    const [scrollBg, setScrollBg] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollBg(scrollPercent > 1);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { item: "সমস্ত ক্যাটাগরি", path: "/categories" },
        { item: "কোর্স সমূহ", path: "/courses" },
        { item: "প্রশ্ন খুঁজুন", path: "/find-question" },
        { item: "আমাদের সম্পর্কে", path: "/about-us" },
    ];

    return (
        <>
            {/* Desktop Header */}
            <div
                className={`hidden md:flex sticky top-0 px-4 py-5 items-center justify-between z-40 
                    transition-all duration-300 
                    ${scrollBg ? "bg-indigo-50 shadow-md" : "bg-transparent"}`}
            >
                <Logo />

                <nav className="flex items-center gap-4 px-4 py-2 bg-white rounded-full shadow-md border border-gray-200">
                    <Dropdown />

                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                                ${path === item.path
                                    ? "bg-blue-100 text-blue-800"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                                }`}
                        >
                            {item.item}
                        </Link>
                    ))}
                </nav>

                <div className='flex items-center gap-1'>
                    <AccountBtn />
                </div>
            </div>

            {/* Mobile Header */}
            <div
                className={`flex md:hidden sticky top-0 px-4 py-5 items-center justify-between z-40 
                    transition-all duration-300
                    ${scrollBg ? "bg-indigo-50 shadow-md" : "bg-transparent"}`}
            >
                <Logo />

                <div className='flex items-center gap-4'>
                    {/* Profile always visible — does not toggle menu */}
                    <AccountBtn />

                    {/* Menu toggle button */}
                    {menuClick ? (
                        <MdClose
                            onClick={() => setMenuClick(false)}
                            className='text-3xl text-indigo-700 cursor-pointer'
                        />
                    ) : (
                        <MdMenu
                            onClick={() => setMenuClick(true)}
                            className='text-3xl text-indigo-700 cursor-pointer'
                        />
                    )}
                </div>

                {/* Mobile dropdown menu */}
                <div
                    className={`mobileMenus origin-top transition-transform duration-300 ease-in-out
                        ${menuClick ? "scale-y-100" : "scale-y-0"} 
                        absolute top-full left-0 w-full bg-white shadow-md rounded-b-md z-50`}
                >
                    <nav className='flex flex-col px-6 py-4 gap-3'>
                        <Dropdown />
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                onClick={() => setMenuClick(false)}
                                className={`text-gray-700 text-base font-medium rounded-md px-3 py-2 transition-colors
                                    ${path === item.path
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-blue-50 hover:text-blue-700"
                                    }`}
                            >
                                {item.item}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
