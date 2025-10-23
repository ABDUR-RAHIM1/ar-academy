"use client"
import { contextD } from '@/contextApi/DashboardState';
import Cookies from 'js-cookie';
import { MenuIcon, ShieldQuestionIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { FiHome, FiBook, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import { MdClose } from 'react-icons/md';

export default function SubSidebar() {
    const path = usePathname();
    const [isMenuClick, setMenuClick] = useState(false);
    const { setLoginSignal, setTokenName, showToast } = useContext(contextD);
    const router = useRouter();

    const subAdminItems = [
        { item: "Dashboard", icon: <FiHome />, path: "/subAdmin" },
        { item: "Manage Course", icon: <FiBook />, path: "/subAdmin/manageCourse" },
        { item: "Manage Students", icon: <FiUsers />, path: "/subAdmin/manageStudents" },
        { item: "Add Questions", icon: <FiUsers />, path: "/subAdmin/questions/add" },
        { item: "View Questions", icon: <FiUsers />, path: "/subAdmin/questions/view" },
        { item: "Make Questions", icon: <ShieldQuestionIcon />, path: "/subAdmin/questions/sheet" },
        { item: "Results", icon: <ShieldQuestionIcon />, path: "/subAdmin/results" },
        { item: "Settings", icon: <FiSettings />, path: "/subAdmin/settings" },
    ];

    const handleLougout = () => {
        Cookies.remove("onushilon_academy_sub_session");
        setTokenName(() => ({ token: false, author: null }));
        setLoginSignal(false)
        showToast(200, " লগ আউট করা হয়েছে");
        router.push("/");
    };

    return (
        <>
            {/* ☰ Menu Button (mobile only) */}
            {
                !isMenuClick &&
                <button
                    onClick={() => setMenuClick(!isMenuClick)}
                    className="fixed top-[90px] md:top-[110px] left-[20px] bg-blue-500 rounded-full p-1 z-[60] md:hidden"
                >
                    <MenuIcon size={20} className="text-white" />
                </button>
            }

            {/* Sidebar */}
            <aside
                className={`
          ${isMenuClick ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          fixed md:static top-0 left-0 h-full md:h-auto
          w-64 bg-white shadow-md flex flex-col transition-transform duration-300 ease-in-out
          z-[20]
        `}
            >
                {/* Header */}
                <div className="bg-white px-6 mt-24 md:mt-0 py-4 border-b-2 flex items-center justify-between sticky top-0 md:top-[95px]">
                    <h2 className="text-sm font-bold text-blue-800">সাব অ্যাডমিন প্যানেল</h2>
                    <button
                        onClick={() => setMenuClick(false)}
                        className="bg-red-500 rounded-full p-1 md:hidden"
                    >
                        <MdClose size={20} className="text-white" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-4 py-16 md:py-6 space-y-2 overflow-y-auto">
                    {subAdminItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`${path === item.path ? "bg-blue-100" : ""} flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-blue-50 transition`}
                            onClick={() => setMenuClick(false)} // close sidebar when link clicked (mobile)
                        >
                            {item.icon} <span>{item.item}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-4 py-6 border-t">
                    <button
                        onClick={handleLougout}
                        className="flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-red-50 text-red-600 transition"
                    >
                        <FiLogOut className="text-lg" /> Logout
                    </button>
                </div>
            </aside>

            {/* Background overlay (mobile only) */}
            {isMenuClick && (
                <div
                    onClick={() => setMenuClick(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10] md:hidden"
                />
            )}
        </>
    );
}
