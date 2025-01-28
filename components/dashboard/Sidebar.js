"use client"
import { contextD } from '@/contextApi/DashboardState'
import React, { useContext, useState } from 'react'
import sidebarItems from './SidebarItems';
import Link from 'next/link';
import Logo from '@/utils/Logo';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const { isOpen } = useContext(contextD);
    const [openItem, setOpenItem] = useState(null);
    const path = usePathname();
    const mainPath = path.split("/")[2]; // pathname theke main Items name ti get kora hocce


    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };
    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={`hidden md:block w-[250px] h-screen bg-gray-800 text-white z-50 relative overflow-y-auto`}>
                <div className="p-4 my-10">
                    <div className=' mb-5'>
                        <Logo />
                    </div>
                    <div className="space-y-4">
                        {sidebarItems.map((item, index) => (
                            <div key={index}>
                                {/* Parent Item */}
                                <div
                                    className={
                                        ` ${mainPath === (item.item).toLowerCase() ? "bg-gray-900" : ""} flex items-center text-lg cursor-pointer p-2 hover:bg-gray-700 rounded-md`
                                    }
                                    onClick={() => item.children && toggleItem(index)}
                                >
                                    <div className="mr-4">{item.icon}</div>
                                    <div>{item.item}</div>
                                </div>
                                {/* Child Items */}
                                {item.children && openItem === index && (
                                    <div className="ml-6 mt-2 space-y-2">
                                        {item.children.map((child, idx) => (
                                            <Link href={`/dashboard/${child.path}`} key={idx} className={`
                                                ${path === "/dashboard/" + child.path ? "bg-gray-700" : ""}
                                                flex items-center text-sm cursor-pointer p-2 hover:bg-gray-700 rounded-md
                                            `}>

                                                <div className="mr-4">{child.icon}</div>
                                                <div>{child.item}</div>

                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <aside className={`${isOpen ? "scale-x-0" : "scale-x-100"} block md:hidden transition-all origin-left w-[250px] h-screen top-0 left-0 bg-gray-800 text-white fixed z-50 overflow-y-auto`}>
                <div className="p-4">
                    <div className=" mb-6">
                        <Logo />
                    </div>
                    <div className="space-y-4">
                        {sidebarItems.map((item, index) => (
                            <div key={index}>
                                {/* Parent Item */}
                                <div
                                    className={
                                        ` ${mainPath === (item.item).toLowerCase() ? "bg-gray-900" : ""} flex items-center text-lg cursor-pointer p-2 hover:bg-gray-700 rounded-md`
                                    }
                                    onClick={() => item.children && toggleItem(index)} // Toggle child visibility
                                >
                                    <div className="mr-4">{item.icon}</div>
                                    <div>{item.item}</div>
                                </div>
                                {/* Child Items */}
                                {item.children && openItem === index && (
                                    <div className="ml-6 mt-2 space-y-2">
                                        {item.children.map((child, idx) => (
                                            <Link href={`/dashboard/${child.path}`} key={idx} className="flex items-center text-sm cursor-pointer p-2 hover:bg-gray-700 rounded-md">
                                                <div className="mr-4">{child.icon}</div>
                                                <div>{child.item}</div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    )
}
