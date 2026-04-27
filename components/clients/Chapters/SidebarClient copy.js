'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SidebarIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { IoClose } from 'react-icons/io5';

export default function SidebarClient({ chapterItems, paramsName, subIdentifier }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);
    const lastSegment = decodeURIComponent(parts[parts.length - 1]);

    const handleItemClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Sidebar Toggle Button - শুধুমাত্র mobile এ show করবে */}
            <div
                onClick={toggleSidebar}
                className={`z-30 fixed top-[80px] md:top-[110px]  cursor-pointer transition-all ${isOpen ? "left-[240px]" : "left-2 "}`}
            >
                <div className='bg-indigo-50 p-2 rounded shadow' title={isOpen ? 'সাইডবার ক্লোজ করো' : 'সাইডবার ওপেন করো'}>

                    {
                        isOpen ? <IoClose className='font-bold text-2xl text-red-500 md:hidden'  /> : <SidebarIcon className='font-bold text-2xl color1' />
                    }
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`${isOpen ? "scale-x-100" : "scale-x-0"} origin-left transition-all 
                h-screen p-5 bg-gray-100 
                absolute md:static w-[250px]
                top-[70px] md:top-[80px] 
                md:right-0 md:left-auto 
                overflow-y-auto border-r-2 border-gray-400`}
            >
                <h2 className='my-5 text-center'>{paramsName}</h2>

                {chapterItems && chapterItems.map((sub, index) => {
                    const isActive = sub.identifier === lastSegment;

                    return (
                        <Link
                            href={`/chapters/${subIdentifier}/${sub.identifier}`}
                            key={sub._id}
                            onClick={handleItemClick}
                            className={`rounded-sm w-full inline-block my-1 p-2 text-[14px] transition-all duration-300 hover:color1 hover:underline 
                                ${isActive ? "text-blue-500 font-bold border-b border-blue-500" : " text-gray-800"}`}
                        >
                            <div className="flex items-center gap-2">
                                <span>{index + 1}.</span>
                                <span>{sub.chapter_name}</span>
                            </div>
                        </Link>
                    );
                })}

                <div style={{ height: "50px" }}></div>
            </div>
        </>
    );
}
