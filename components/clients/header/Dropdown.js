"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const menuItems = [
    { label: "ক্যাটাগরি", href: "#categorie" },
    { label: "টপ পারফর্মার", href: "#top-performar" },
    { label: "রিভিউ", href: "#reviews" },
    { label: "ফিচারস", href: "#features" },
    { label: "গ্যালারী", href: "#gallary" },
    { label: "প্লান সমূহ", href: "#plans" },
    { label: "প্রশ্ন উত্তর", href: "#faq" },
];

export default function Dropdown({ setMenuClick }) {
    return (
        <DropdownMenu modal={false}>
            {/* Trigger Button: থিমের সাথে মিল রেখে স্টাইল */}
            <DropdownMenuTrigger className="flex items-center gap-1.5 px-4 py-2 text-sm md:text-base font-semibold rounded-full outline-none transition-all duration-300 text-slate-600 hover:bg-white hover:text-indigo-600 group">
                বিভাগসমূহ
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180 text-slate-400 group-hover:text-indigo-500" />
            </DropdownMenuTrigger>

            {/* Content: মোবাইলে overflow আটকানোর জন্য উইডথ ফিক্সড করা হয়েছে */}
            <DropdownMenuContent
                align="start"
                sideOffset={10}
                className="z-[70] w-[240px] md:w-[200px] p-2 bg-white rounded-2xl shadow-xl border border-slate-100"
            >
                {menuItems.map((item, index) => (
                    <DropdownMenuItem 
                        key={index} 
                        className="rounded-xl focus:bg-indigo-50 focus:text-indigo-700 cursor-pointer p-0"
                    >
                        <Link 
                            href={`/${item.href}`} 
                            className="w-full px-4 py-2.5 font-medium text-slate-600 flex items-center"
                            onClick={() => {
                                if (setMenuClick) setMenuClick(false); // মোবাইল মেনু বন্ধ করার জন্য
                            }}
                        >
                            {item.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}