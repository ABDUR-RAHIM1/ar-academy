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


export default function AccountBtn({ menuClick, setMenuClick }) {

    const router = useRouter();
    const { showToast, tokenName, setTokenName, } = useContext(contextD)
    const path = usePathname();

    const [username, setUsername] = useState(null);

    const [doubleLogin, setDoubleLogin] = useState(false)

    useEffect(() => {
        const getTokenData = async () => {

            const studentTokenDecod = await decodedToken()

            if (path.startsWith("/profile")) {

                if (studentTokenDecod?.username) {
                    setTokenName({ token: true, author: "student" });
                    // setUsername(firstLetter);
                    setUsername(studentTokenDecod.username);
                }

            } else if (path.startsWith("/subAdmin")) {
                setTokenName({ token: true, author: "subAdmin" });
                setUsername("সাব-অ্যাডমিন");
            } else {

                //  /profile , /subAdmin bade onno kono route a hole studentToken , subAdmin Token 2 tai check korbe ebong state a set korbe 


                const subAdminTokenDecod = await subAdminTokenDecoded();

                const isStudentLogin = studentTokenDecod && studentTokenDecod?.role === roles.user
                const isSubAdminLogin = subAdminTokenDecod && subAdminTokenDecod?.role === roles.subAdmin

                if (isStudentLogin && isSubAdminLogin) {
                    // ক. দুটিই লগইন করা থাকলে
                    setDoubleLogin(true);

                    // UI রেন্ডারিং এর জন্য একটি রোল-কে অগ্রাধিকার দিন (যেমন Student)
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
    }, [path, setDoubleLogin, setTokenName])


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
            {/* ✅ যদি ইউজার লগইন করা থাকে (যে কোনো রোল) */}
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
                        {/* 1. ✅ ডুয়াল লগইন অপশন (যদি উভয়ই লগইন থাকে) */}
                        {doubleLogin && (
                            <>
                                <DropdownMenuLabel className='text-indigo-600'>একাউন্ট পরিবর্তন করুন</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {/* SubAdmin ড্যাশবোর্ড নেভিগেশন বাটন */}
                                <DropdownMenuItem asChild>
                                    <Link
                                        // এই বাটনে ক্লিক করলে SubAdmin ড্যাশবোর্ডে যাবে
                                        onClick={() => {
                                            setMenuClick(!menuClick);
                                            // টোকেন নেম চেঞ্জ করার প্রয়োজন নেই, কারণ এটি রুটে গেলে
                                            // useEffect লজিক এটিকে subAdmin এ আপডেট করে দেবে
                                            // অথবা আপনি চাইলে এখানে ম্যানুয়ালি আপডেট করে দিতে পারেন
                                            // setTokenName({ token: true, author: "subAdmin" });
                                        }}
                                        href="/subAdmin"
                                        className='w-full flex items-center justify-between cursor-pointer'
                                    >
                                        সাব-অ্যাডমিন ড্যাশবোর্ড
                                        {path.startsWith("/subAdmin") && <span>✔️</span>}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {/* Student প্রোফাইল নেভিগেশন বাটন */}
                                <DropdownMenuItem asChild>
                                    <Link
                                        onClick={() => setMenuClick(!menuClick)}
                                        href="/profile"
                                        className='w-full flex items-center justify-between cursor-pointer'
                                    >
                                        শিক্ষার্থী প্রোফাইল
                                        {path.startsWith("/profile") && <span>✔️</span>}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}

                        {/* 2. ✅ শুধুমাত্র Student/Profile মেনু আইটেম (doubleLogin না থাকলে) */}
                        {tokenName.author === "student" && !doubleLogin && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link
                                        onClick={() => setMenuClick(!menuClick)}
                                        href="/profile"
                                        className='w-full flex items-center justify-between cursor-pointer'
                                    >
                                        শিক্ষার্থী ড্যাশবোর্ড
                                        {path.startsWith("/profile") && <span>✔️</span>}
                                    </Link>
                                </DropdownMenuItem>

                            </>
                        )}

                        {/* 3. ✅ শুধুমাত্র SubAdmin ড্যাশবোর্ড বাটন (doubleLogin না থাকলে) */}
                        {tokenName.author === "subAdmin" && !doubleLogin && (
                            <DropdownMenuItem asChild>
                                <Link
                                    onClick={() => setMenuClick(!menuClick)}
                                    href="/subAdmin"
                                    className='w-full flex items-center justify-between cursor-pointer'
                                >
                                    সাব-অ্যাডমিন ড্যাশবোর্ড
                                    {path.startsWith("/subAdmin") && <span>✔️</span>}
                                </Link>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuItem asChild>
                            <Link
                                onClick={() => setMenuClick(!menuClick)}
                                href={tokenName.author === "student" ? studentLogin : subAdminLogin}
                                className='w-full flex items-center gap-2 cursor-pointer text-sm'
                            >
                               <Plus size={10}/> আরো প্রোফাইল যুক্ত করুন
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                // ✅ Not Logged In UI (যখন কেউ লগইন নেই)
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

                        {/* ✅ Student Login Link */}
                        <DropdownMenuItem asChild>
                            {/* studentAuth ও subAdminAuth কনস্ট্যান্টগুলি আপনার কম্পোনেন্টের বাইরে থেকে আসছে ধরে নেওয়া হলো */}
                            <Link href={studentAuth} onClick={() => setMenuClick(!menuClick)}>
                                শিক্ষার্থী
                            </Link>
                        </DropdownMenuItem>

                        {/* ✅ SubAdmin Login Link */}
                        <DropdownMenuItem asChild>
                            <Link href={subAdminAuth} onClick={() => setMenuClick(!menuClick)}>
                                সাব এডমিন
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )

    // ... (Component setup and useEffect)

    // return (
    //     <>
    //         {/*
    //       ✅ যদি doubleLogin সত্য হয়: ড্রপডাউন মেনু দেখাবে (ডুয়াল অপশন সহ)
    //     */}
    //         {tokenName.token && doubleLogin ? (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     {/* ড্রপডাউন ট্রিগার বাটন */}
    //                     <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition text-sm font-medium">
    //                         <FiUser className="text-xl" />
    //                         <span>{username}</span>
    //                         <FiChevronDown className="text-lg" />
    //                     </button>
    //                 </DropdownMenuTrigger>

    //                 <DropdownMenuContent className="w-56">
    //                     {/* ... (ডুয়াল লগইন এর জন্য নেভিগেশন লিংক - SubAdmin ও Student) ... */}

    //                     <DropdownMenuLabel className='text-indigo-600'>একাউন্ট সুইচ করুন</DropdownMenuLabel>
    //                     <DropdownMenuSeparator />

    //                     {/* SubAdmin ড্যাশবোর্ড নেভিগেশন বাটন */}
    //                     <DropdownMenuItem asChild>
    //                         <Link onClick={() => setMenuClick(!menuClick)} href="/subAdmin">সাব-অ্যাডমিন ড্যাশবোর্ড</Link>
    //                     </DropdownMenuItem>

    //                     {/* Student প্রোফাইল নেভিগেশন বাটন */}
    //                     <DropdownMenuItem asChild>
    //                         <Link onClick={() => setMenuClick(!menuClick)} href="/profile">শিক্ষার্থী প্রোফাইল</Link>
    //                     </DropdownMenuItem>

    //                     <DropdownMenuSeparator />

    //                     {/* লগ আউট অপশন */}
    //                     <DropdownMenuItem className="cursor-pointer" onClick={handleLougout}>
    //                         লগ আউট
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>

    //             // ✅ যদি শুধুমাত্র একটি রোল লগইন থাকে (doubleLogin মিথ্যা)
    //         ) : tokenName.token ? (
    //             // Direct Link Button
    //             <Link
    //                 // Student হলে /profile এ, SubAdmin হলে /subAdmin এ নিয়ে যাবে
    //                 // onClick={() => router.push(tokenName.author === "student" ? "/profile" : "/subAdmin")}
    //                 href={tokenName.author === "student" ? "/profile" : "/subAdmin"}
    //                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition text-sm font-medium"
    //             >
    //                 <FiUser className="text-xl" />
    //                 <span>{username}</span>
    //                 {/* Single Login এ কোনো ডাউন অ্যারো আইকন এর দরকার নেই */}
    //             </Link>

    //         ) : (
    //             // ✅ Not Logged In UI (আপনার বিদ্যমান ড্রপডাউন)
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     {/* ... (Button UI for Account) ... */}
    //                     <Button
    //                         variant="outline"
    //                         className="flex items-center gap-2 px-4 py-2 text-sm font-medium border hover:bg-indigo-50 transition-colors duration-200"
    //                     >
    //                         <LogIn className="w-4 h-4" />
    //                         একাউন্ট
    //                     </Button>
    //                 </DropdownMenuTrigger>

    //                 <DropdownMenuContent align="end" className="w-44">
    //                     {/* ... (Login Links for Student and SubAdmin) ... */}
    //                     <p className='text-sm my-2'> একাউন্ট এর ধরন</p>
    //                     <hr />
    //                     <DropdownMenuItem asChild>
    //                         <Link href={studentAuth} onClick={() => setMenuClick(!menuClick)}>শিক্ষার্থী</Link>
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem asChild>
    //                         <Link href={subAdminAuth} onClick={() => setMenuClick(!menuClick)}>সাব এডমিন</Link>
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )}
    //     </>
    // )

}
