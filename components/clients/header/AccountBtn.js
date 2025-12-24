"use client"
import { contextD } from '@/contextApi/DashboardState';
import { decodedToken, subAdminTokenDecoded } from '@/helpers/token-decoded/tokenDecoded';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation'
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
import { roles, studentAuth, studentLogin, subAdminAuth, subAdminLogin } from '@/constans'
import { FiChevronDown, FiUser } from 'react-icons/fi'
import { LogIn, Plus } from 'lucide-react'
import { MdDashboard } from 'react-icons/md';

export default function AccountBtn() {

    const { tokenName, setTokenName } = useContext(contextD)
    const path = usePathname();

    const [username, setUsername] = useState(null);
    const [doubleLogin, setDoubleLogin] = useState(false)

    useEffect(() => {
        const getTokenData = async () => {

            const studentTokenDecod = await decodedToken()

            if (path.startsWith("/profile")) {
                if (studentTokenDecod?.username) {
                    setTokenName({ token: true, author: "student" });
                    setUsername(studentTokenDecod.username);
                }

            } else if (path.startsWith("/subAdmin")) {
                setTokenName({ token: true, author: "subAdmin" });
                setUsername("সাব-অ্যাডমিন");

            } else {

                const subAdminDec = await subAdminTokenDecoded();

                const isStudentLogin = studentTokenDecod && studentTokenDecod?.role === roles.user
                const isSubAdminLogin = subAdminDec && subAdminDec?.role === roles.subAdmin

                if (isStudentLogin && isSubAdminLogin) {
                    setDoubleLogin(true);
                    setTokenName({ token: true, author: "student" });
                    setUsername(studentTokenDecod.username + " (সমন্বিত)");

                } else if (isStudentLogin) {
                    setDoubleLogin(false);
                    setTokenName({ token: true, author: "student" });
                    setUsername(studentTokenDecod.username);

                } else if (isSubAdminLogin) {
                    setDoubleLogin(false);
                    setTokenName({ token: true, author: "subAdmin" });
                    setUsername("সাব-অ্যাডমিন");
                }
            }
        };

        getTokenData()
    }, [path, setTokenName])



    return (
        <>
            {tokenName.token ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition text-sm font-medium">
                            <FiUser className="text-xl" />
                            <span>{username}</span>
                            <FiChevronDown className="text-lg" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">

                        {/* Dual Login Handling */}
                        {doubleLogin && (
                            <>
                                <DropdownMenuLabel className='text-indigo-600'>
                                    একাউন্ট পরিবর্তন করুন
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link href="/subAdmin" className='w-full flex justify-between'>
                                        সাব-অ্যাডমিন ড্যাশবোর্ড
                                        {path.startsWith("/subAdmin") && <span>✔️</span>}
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className='w-full flex justify-between'>
                                        শিক্ষার্থী প্রোফাইল
                                        {path.startsWith("/profile") && <span>✔️</span>}
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                            </>
                        )}

                        {/* Student Dashboard */}
                        {tokenName.author === "student" && !doubleLogin && (
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className='w-full flex object-center gap-2'>

                                    <MdDashboard size={10} />  শিক্ষার্থী ড্যাশবোর্ড

                                    {path.startsWith("/profile") && <span>✔️</span>}
                                </Link>
                            </DropdownMenuItem>
                        )}

                        {/* Sub Admin Dashboard */}
                        {tokenName.author === "subAdmin" && !doubleLogin && (
                            <DropdownMenuItem asChild>
                                <Link href="/subAdmin" className='w-full flex object-center gap-2'>
                                    <MdDashboard size={10} />   সাব-অ্যাডমিন ড্যাশবোর্ড
                                    {path.startsWith("/subAdmin") && <span>✔️</span>}
                                </Link>
                            </DropdownMenuItem>
                        )}

                        {/* Extra Profile Add */}
                        <DropdownMenuItem asChild>
                            <Link href={tokenName.author === "student" ? studentLogin : subAdminLogin}>
                                <Plus size={10} /> আরো প্রোফাইল যুক্ত করুন
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                // Not Logged In
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
                            <LogIn className="w-4 h-4" />
                            একাউন্ট
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-44">
                        <p className='text-sm my-2'> একাউন্ট এর ধরন</p>
                        <hr />

                        <DropdownMenuItem asChild>
                            <Link href={studentAuth}>শিক্ষার্থী</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href={subAdminAuth}>সাব এডমিন</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )
}
