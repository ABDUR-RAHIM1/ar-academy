"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";

// ✅ Menu items as array
const menuItems = [
    { label: "ক্যাটাগরি", href: "#categorie" },
    { label: "টপ পারফর্মার", href: "#top-performar" },
    { label: "রিভিউ", href: "#reviews" },
    { label: "ফিচারস", href: "#features" },
    { label: "গ্যালারী", href: "#gallary" },
    { label: "প্লান সমূহ", href: "#plans" },
    { label: "প্রশ্ন উত্তর", href: "#faq" },
];

export default function Dropdown({ menuClick, setMenuClick }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-base font-medium rounded-full transition-all duration-300 text-gray-700 hover:bg-blue-50 hover:text-blue-800">
                বিভাগসমূহ
                <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="z-50 w-[95vw] max-w-[500px] mx-2 md:w-[170px]"
            >
                {menuItems.map((item, index) => (
                    <DropdownMenuItem key={index}>
                        <a onClick={() => setMenuClick(!menuClick)} href={`/${item.href}`} className="w-full">
                            {item.label}
                        </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
