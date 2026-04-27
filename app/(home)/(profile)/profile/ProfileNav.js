"use client"
import { Button } from '@/components/ui/button';
import { contextD } from '@/contextApi/DashboardState';
import Cookies from 'js-cookie';
import { BookMarkedIcon, Info, LogOut } from 'lucide-react';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { FiBookOpen, FiGrid } from 'react-icons/fi';

export default function ProfileNav() {

    const path = usePathname();
    const { showToast, setTokenName } = useContext(contextD);
    const router = useRouter();
    const menuItems = [
        { name: "ওভারভিউ", icon: FiGrid, link: "/profile" },
        { name: "রেজাল্ট", icon: FiBookOpen, link: "/profile/results" },
        { name: "প্রশ্ন তৈরি", icon: BookMarkedIcon, link: "/profile/make-question" },
    ];

    const handleLogout = () => {
        const ok = confirm("লগ অউট করতে চান? ")
        if (ok) {
            Cookies.remove("onushilon_academy_session")
            setTokenName(() => ({ token: false, author: null }));
            showToast(200, "লগ আউট করা হয়েছে")
            router.push("/")
        }
    }

    return (
        <div className="flex items-center pt-2 overflow-x-auto ">

            {/* 🔹 scrollable menu */}
            <div className="flex gap-2 flex-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.link}
                        className={`flex items-center gap-1 py-2 px-3 text-nowrap text-sm font-semibold border-b-2 transition-colors 
                ${item.link === path
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-600 border-transparent hover:bg-gray-50'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>

            {/* 🔴 fixed right logout */}
            <div className=" pl-2">
                
                <Info
                    onClick={handleLogout}
                    className={"font-[25px] bg-red-500 text-white rounded-full"}
                />
                {/* </Button> */}
            </div>

        </div>
    )
}
