"use client"
import { ArrowBigRight, MenuIcon, ShieldQuestionIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { FiHome, FiBook, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import { IoClose } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';

export default function SubSidebar() {

    const path = usePathname();
    const [isMenuClick, setMenuClick] = useState(false);


    const subAdminItems = [
        {
            item: "Dashboard",
            icon: <FiHome />,
            path: "/subAdmin"
        },
        {
            item: "Manage Course",
            icon: <FiBook />,
            path: "/subAdmin/manageCourse"
        },
        {
            item: "Manage Students",
            icon: <FiUsers />,
            path: "/subAdmin/manageStudents"
        },
        {
            item: "Add Questions",
            icon: <FiUsers />,
            path: "/subAdmin/questions/add"
        },
        {
            item: "View Questions",
            icon: <FiUsers />,
            path: "/subAdmin/questions/view"
        },
        {
            item: "Make Questions",
            icon: <ShieldQuestionIcon />,
            path: "/subAdmin/questions/sheet"
        },
       
        {
            item: "Settings",
            icon: <FiSettings />,
            path: "/subAdmin/settings"
        },
    ]

    return (

        <>
            <button onClick={() => setMenuClick(!isMenuClick)} className=' fixed top-[90px] md:top-[110px] left-[20px] bg-blue-500 rounded-full p-1'>
                <MenuIcon size={20} className=' text-white' />
            </button>
            <aside className={` ${isMenuClick ? "hidden" : "flex"} w-64 bg-white shadow-md flex flex-col transition-all shrink-0`}>
                <div className=" bg-white px-6 py-4 border-b-2 flex items-center justify-between sticky top-[65px] md:top-[95px]">
                    <h2 className="text-sm font-bold text-blue-800">
                        সাব অ্যাডমিন প্যানেল
                    </h2>
                    <button onClick={() => setMenuClick(!isMenuClick)} className=' z-10 bg-red-500 rounded-full p-1'>
                        <MdClose size={20} className=' text-white' />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {
                        subAdminItems.map((item, index) => (
                            <Link key={index} href={item.path} className={`${path === item.path ? "bg-blue-100" : ""}  flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-blue-50 transition`}>
                                {item.icon} <span>{item.item}</span>
                            </Link>
                        ))
                    }

                </nav>

                <div className="px-4 py-6 border-t">
                    <button className="flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-red-50 text-red-600 transition">
                        <FiLogOut className="text-lg" /> Logout
                    </button>
                </div>
            </aside>
        </>

    )
}
