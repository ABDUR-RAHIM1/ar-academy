"use client"
import { contextD } from '@/contextApi/DashboardState';
import Cookies from 'js-cookie';
import { 
    LayoutDashboard, 
    BookPlus, 
    BookOpenCheck, 
    Users, 
    FilePlus2, 
    FileSearch, 
    ClipboardCheck, 
    Trophy, 
    Settings, 
    LogOut, 
    Menu, 
    X 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react';

export default function SubSidebar() {
    const path = usePathname();
    const [isMenuClick, setMenuClick] = useState(false);
    const { setLoginSignal, setTokenName, showToast } = useContext(contextD);
    const router = useRouter();

    // মেনু আইটেমগুলো আরও অর্গানাইজড করা হয়েছে
    const subAdminItems = [
        { item: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/subAdmin" },
        { item: "Add Course", icon: <BookPlus size={18} />, path: "/subAdmin/addCourse" },
        { item: "Manage Course", icon: <BookOpenCheck size={18} />, path: "/subAdmin/manageCourse" },
        { item: "Manage Students", icon: <Users size={18} />, path: "/subAdmin/manageStudents" },
        { item: "Add Questions", icon: <FilePlus2 size={18} />, path: "/subAdmin/questions/add" },
        { item: "View Questions", icon: <FileSearch size={18} />, path: "/subAdmin/questions/view" },
        { item: "Make Sheets", icon: <ClipboardCheck size={18} />, path: "/subAdmin/questions/sheet" },
        { item: "Results", icon: <Trophy size={18} />, path: "/subAdmin/results" },
        { item: "Settings", icon: <Settings size={18} />, path: "/subAdmin/settings" },
    ];

    const handleLogout = () => {
        Cookies.remove("onushilon_academy_sub_session");
        setTokenName(() => ({ token: false, author: null }));
        setLoginSignal(false);
        showToast(200, "লগ আউট সফল হয়েছে");
        router.push("/");
    };

    return (
        <>
            {/* Mobile Toggle Button - আরও ক্লিন করা হয়েছে */}
            {!isMenuClick && (
                <button
                    onClick={() => setMenuClick(true)}
                    className="fixed top-24 left-5 bg-indigo-600 hover:bg-indigo-700 shadow-lg text-white p-2.5 rounded-xl z-50 md:hidden transition-all active:scale-90"
                >
                    <Menu size={20} />
                </button>
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed md:sticky top-0 left-0 h-screen md:h-[calc(100vh-100px)] 
                    w-72 bg-white border-r border-slate-100 flex flex-col 
                    transition-transform duration-300 ease-in-out z-[60]
                    ${isMenuClick ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* Header Section */}
                <div className="p-6 flex items-center justify-between border-b border-slate-50">
                    <div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Control Panel</h2>
                        <p className="text-lg font-black text-indigo-700">Sub Admin</p>
                    </div>
                    <button
                        onClick={() => setMenuClick(false)}
                        className="p-1.5 bg-slate-100 text-slate-500 rounded-lg md:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {subAdminItems.map((item, index) => {
                        const isActive = path === item.path;
                        return (
                            <Link
                                key={index}
                                href={item.path}
                                onClick={() => setMenuClick(false)}
                                className={`
                                    group flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[14.5px] transition-all duration-200
                                    ${isActive 
                                        ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600" 
                                        : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600 border-l-4 border-transparent"}
                                `}
                            >
                                <span className={`${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"}`}>
                                    {item.icon}
                                </span>
                                {item.item}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Footer */}
                <div className="p-4 border-t border-slate-50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                    <p className="mt-2 text-[10px] text-center text-slate-400 font-medium">Onushilon Academy v2.0</p>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMenuClick && (
                <div
                    onClick={() => setMenuClick(false)}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] md:hidden transition-opacity"
                />
            )}
        </>
    );
}