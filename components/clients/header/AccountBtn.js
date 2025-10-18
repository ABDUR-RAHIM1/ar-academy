import React, { useContext, useEffect, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { studentAuth, subAdminAuth } from '@/constans'
import { usePathname, useRouter } from 'next/navigation'
import { contextD } from '@/contextApi/DashboardState'
import { decodedToken } from '@/helpers/token-decoded/tokenDecoded'
import getToken from '@/actions/getToken/getToken'
import Cookies from 'js-cookie'
import { FiChevronDown, FiUser } from 'react-icons/fi'
import { LogIn } from 'lucide-react'

export default function AccountBtn({ menuClick, setMenuClick }) {
    const router = useRouter();
    const { loginSignal, tokenName, setTokenName, } = useContext(contextD)
    const path = usePathname();

    const [username, setUsername] = useState(null)

    useEffect(() => {

        const getTokenData = async () => {

            if (path.startsWith("/profile")) {
                const decod = await decodedToken()
                if (decod?.username) {
                    setTokenName(() => ({ token: true, author: "student" }))
                    const firstLetter = decod.username.charAt(0).toUpperCase();
                    setUsername(firstLetter)
                }
            }

            if (path.startsWith("/subAdmin")) {
                setTokenName(() => ({ token: true, author: "subAdmin" }))
                setUsername("সাব-অ্যাডমিন") // test purpose

            }
        };

        getTokenData()
    }, [loginSignal])


    const handleLougout = () => {
        Cookies.remove("onushilon_academy_session")
        setTokenName(() => ({ token: false, author: null }));
        showToast(200, " লগ আউট করা হয়েছে")
        router.push("/")
    }



    const profileItems = [
        {
            item: "profile",
            itemBN: "প্রোফাইল",
            path: "",
        },
        {
            item: "results",
            itemBN: "রেজাল্ট",
            path: "results",
        },
        {
            item: "make-question",
            itemBN: "প্রশ্ন পত্র তৈরি করুন",
            path: "make-question",
        },
        {
            item: "settings",
            itemBN: "সেটিংস",
            path: "settings",
        },
    ]


    return (
        <>
            {tokenName.token && tokenName.author === "student" ? (
                // ✅ Student Logged In
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition text-sm font-medium">
                            <FiUser className="text-xl" />
                            <span>{username}</span>
                            <FiChevronDown className="text-lg" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Profile Menu</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {profileItems.map((item, index) => (
                            <DropdownMenuItem asChild key={index}>
                                <Link
                                    onClick={() => setMenuClick(!menuClick)}
                                    href={`/profile/${item.path}`}
                                    className='w-full flex items-center justify-between cursor-pointer'
                                >
                                    {item.itemBN}
                                    {path === `/profile/${item.path}` && <span>✔️</span>}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleLougout}
                        >
                            লগ আউট
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : tokenName.token && tokenName.author === "subAdmin" ? (
                // ✅ SubAdmin Logged In
                <button
                    onClick={() => router.push("/subAdmin")}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
                >
                    <FiUser className="text-xl" />
                    <span>{username}</span>
                </button>
            ) : (
                // ✅ Not Logged In
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border hover:bg-indigo-50 transition-colors duration-200"
                        >
                            <LogIn className="w-4 h-4" />
                            একাউন্ট
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-44">
                        <p className='text-sm my-2'> একাউন্ট এর ধরন</p>
                        <hr />
                        <DropdownMenuItem asChild>
                            <Link href={studentAuth} onClick={() => setMenuClick(!menuClick)}>
                                শিক্ষার্থী
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={subAdminAuth} onClick={() => setMenuClick(!menuClick)}>
                                সাব এডমিন
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );

}