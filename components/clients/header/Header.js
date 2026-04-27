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

    // স্ক্রল হ্যান্ডলার
    useEffect(() => {
        const handleScroll = () => {
            setScrollBg(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // মেনু ওপেন থাকলে স্ক্রল লক করা (Overflow ফিক্স করতে সাহায্য করে)
    useEffect(() => {
        if (menuClick) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuClick]);

    const menuItems = [
        { item: "কোর্স", path: "/courses" },
        { item: "ক্যাটাগরি", path: "/categories" },
        { item: "প্রশ্ন খুঁজুন", path: "/find-question" },
        { item: "সম্পর্কে", path: "/about-us" },
    ];

    return (
        <header 
            className={`sticky top-0 w-full z-30 transition-all duration-300 border-b 
            ${scrollBg ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 ">
                
                {/* 1. Logo */}
                <div className="flex-shrink-0">
                    <Logo />
                </div>

                {/* 2. Desktop Navigation (Hidden on Mobile) */}
                <nav className="hidden lg:flex items-center gap-1 bg-gray-100/80 p-1 rounded-full border border-gray-200">
                    <div className="px-2 border-r border-gray-300">
                        <Dropdown />
                    </div>
                    <div className="flex items-center gap-1">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all
                                    ${path === item.path ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-white"}`}
                            >
                                {item.item}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* 3. Right Section (Mobile & Desktop) */}
                <div className="flex items-center gap-2">
                 
                    <div className="scale-90 sm:scale-100">
                        <AccountBtn />
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        onClick={() => setMenuClick(!menuClick)}
                        className="lg:hidden p-2 rounded-lg bg-indigo-50 text-indigo-700 active:scale-95 transition-transform"
                        aria-label="Toggle Menu"
                    >
                        {menuClick ? <MdClose size={24} /> : <MdMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* 4. Mobile Side Menu Overlay */}
            <div 
                className={`lg:hidden fixed inset-0 w-full h-screen z-30 transition-opacity duration-300 ${
                    menuClick ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                {/* Backdrop (Dark Layer) */}
                <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                    onClick={() => setMenuClick(false)}
                ></div>

                {/* Menu Drawer */}
                <div 
                    className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out
                    ${menuClick ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <Logo />
                            <button onClick={() => setMenuClick(false)} className="p-2 bg-gray-100 rounded-full">
                                <MdClose size={20} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2 overflow-y-auto">
                            <div className="mb-4">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">ব্রাউজ করুন</p>
                                <Dropdown />
                            </div>

                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.path}
                                    onClick={() => setMenuClick(false)}
                                    className={`px-4 py-3 rounded-xl text-base font-bold transition-all
                                        ${path === item.path ? "bg-indigo-50 text-indigo-700" : "text-gray-600 active:bg-gray-50"}`}
                                >
                                    {item.item}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto border-t pt-6 text-center">
                            <p className="text-xs text-gray-400 font-medium italic">সফলতার পথে আপনার সাথী</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}