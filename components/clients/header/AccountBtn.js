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
import { userLogin } from '@/constans'
import { usePathname, useRouter } from 'next/navigation'
import { contextD } from '@/contextApi/DashboardState'
import { decodedToken } from '@/helpers/token-decoded/tokenDecoded'
import getToken from '@/actions/getToken/getToken'
import Cookies from 'js-cookie'
import { FiChevronDown, FiUser } from 'react-icons/fi'
import { LogIn } from 'lucide-react'

export default function AccountBtn({ menuClick, setMenuClick }) {
    const router = useRouter()
    const { loginSignal } = useContext(contextD)
    const path = usePathname();
    const [token, setToken] = useState(null)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const getTokenData = async () => {
            const tokenGet = await getToken()
            const decod = await decodedToken()
            if (decod?.username) {
                setToken(tokenGet)
                const firstLetter = decod.username.charAt(0).toUpperCase();
                setUsername(firstLetter)
            }
        };

        getTokenData()
    }, [loginSignal])

    const handleLougout = () => {
        Cookies.remove("onushilon_academy_session")
        setToken(null)
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
            item: "settings",
            itemBN: "সেটিংস",
            path: "settings",
        },
    ]


    return (
        <>
            {token ? (
                <DropdownMenu>
                    {/* Avatar কে DropdownTrigger বানানো হয়েছে */}
                    <DropdownMenuTrigger asChild>

                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-100hover:bg-gray-200 transition text-sm font-medium">
                            <FiUser className="text-xl" />
                            <span>{username}</span>
                            <FiChevronDown className="text-lg" />
                        </button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Profile Menu</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {
                            profileItems.map((item, index) => (
                                <DropdownMenuItem asChild key={index}>
                                    <Link
                                        onClick={() => setMenuClick(!menuClick)}
                                        href={`/profile/${item.path}`} className=' w-full flex items-center justify-between cursor-pointer'>
                                        {item.itemBN}
                                        {path === `/profile/${item.path}` && <span>
                                            ✔️
                                        </span>}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }
                        <DropdownMenuItem
                            className={" cursor-pointer"}
                            onClick={handleLougout}
                        >
                            লগ আউট
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href={userLogin} onClick={() => setMenuClick(!menuClick)}>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium border hover:bg-indigo-50 transition-colors duration-200"
                    >
                        <LogIn className="w-4 h-4" />
                        একাউন্ট
                    </Button>
                </Link>
            )}
        </>
    )
}