'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SidebarIcon, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SidebarClient({ chapterItems, paramsName, subIdentifier }) {
    const [isOpen, setIsOpen] = useState(false); // মোবাইলে ডিফল্ট ক্লোজ থাকাই ভালো
    const pathname = usePathname();

    // URL থেকে অ্যাক্টিভ চ্যাপ্টার বের করা
    const parts = pathname.split("/").filter(Boolean);
    const lastSegment = decodeURIComponent(parts[parts.length - 1]);

    const handleItemClick = () => {
        if (window.innerWidth < 1024) { // ট্যাবলেট এবং মোবাইল হলে ক্লোজ হবে
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* 1. Mobile Top Toggle Bar - এটি মোবাইলে ইউজারের জন্য সহজ হয় */}
            <div className="lg:hidden fixed top-[82px] z-30 bg-white border-b p-2 flex items-center justify-between shadow-sm border">
                <span className="font-bold text-[11px] text-indigo-700 truncate">{paramsName}</span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className=" ml-2 p-2 text-[12px] bg-indigo-50 rounded-lg text-indigo-600  "
                >
                    {isOpen ? <X size={20} /> : <ArrowRight size={20} />}
                </button>
            </div>

            {/* 2. Sidebar Overlay (Mobile only) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 3. The Sidebar Container */}
            <aside
                className={`
                    fixed lg:sticky top-0 lg:top-[90px] left-0 z-50 lg:z-10
                    h-screen lg:h-[calc(100vh-110px)] w-[280px] bg-white lg:bg-transparent
                    transform transition-transform duration-300 ease-in-out
                    border-r lg:border-r-0 border-gray-200 overflow-y-auto
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="p-6 ">
                    <h2 className="hidden lg:block text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 border-b">
                        চ্যাপ্টার লিস্ট
                    </h2>

                    <div className="space-y-1">
                        {chapterItems?.map((sub, index) => {
                            const isActive = sub.identifier === lastSegment;
                            return (
                                <Link
                                    href={`/chapters/${subIdentifier}/${sub.identifier}`}
                                    key={sub._id}
                                    onClick={handleItemClick}
                                    className={`
                                        group flex items-start gap-3 p-3 rounded-xl transition-all duration-200
                                        ${isActive
                                            ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"}
                                    `}
                                >
                                    <span className={`text-xs mt-1 font-mono ${isActive ? "text-indigo-500" : "text-gray-400"}`}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`text-[14.5px] font-medium leading-tight ${isActive ? "font-bold" : ""}`}>
                                        {sub.chapter_name}
                                    </span>
                                    {isActive && <ChevronRight size={16} className="ml-auto mt-0.5" />}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Spacer */}
                <div className="h-20" />
            </aside>
        </>
    );
}