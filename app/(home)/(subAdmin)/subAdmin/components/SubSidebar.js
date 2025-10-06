import Link from 'next/link';
import React from 'react'
import { FiHome, FiBook, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";

export default function SubSidebar() {

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
            item: "Settings",
            icon: <FiSettings />,
            path: "/subAdmin/settings"
        },
    ]

    return (
        <aside className="w-64 bg-white shadow-md flex flex-col">
            <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold text-blue-800">SubAdmin Panel</h2>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {
                    subAdminItems.map((item, index) => (
                        <Link key={index} href={item.path} className=' flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-blue-50 transition'>
                            {item.icon} <span>{item.item}</span>
                        </Link>
                    ))
                }


                {/* <button className="flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-blue-50 transition">
                    <FiHome className="text-lg" /> Dashboard
                </button>
                <button className="flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-blue-50 transition">
                    <FiBook className="text-lg" /> Manage Courses
                </button>
                <button className="flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-blue-50 transition">
                    <FiUsers className="text-lg" /> Manage Students
                </button>
                <button className="flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-blue-50 transition">
                    <FiSettings className="text-lg" /> Settings
                </button> */}
            </nav>

            <div className="px-4 py-6 border-t">
                <button className="flex items-center gap-2 px-4 py-2 w-full rounded hover:bg-red-50 text-red-600 transition">
                    <FiLogOut className="text-lg" /> Logout
                </button>
            </div>
        </aside>
    )
}
