import React, { useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
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
import { getToken } from '@/app/apiActions/client/clientApi'
import { usePathname } from 'next/navigation'
export default function AccountBtn() {
    const path = usePathname();
    const [token, setToken] = useState("")

    useEffect(() => {
        const getTokenData = async () => {
            const { status, data } = await getToken();

            if (status === 200 && data.token) {
                setToken(data.token)
            }
        };
        getTokenData()
    }, [])


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
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" alt="AR Academy BD" />
                            <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {
                            profileItems.map((item, index) => (
                                <DropdownMenuItem asChild key={index}>
                                    <Link href={`/profile/${item.path}`} className=' w-full flex items-center justify-between'>
                                        {item.itemBN}
                                        {path === `/profile/${item.path}` && <span>
                                            ✔️
                                        </span>}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }

                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild>
                                <Link href={userLogin}>একাউন্ট</Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>প্রিমিয়াম সব ফিচারস পেতে লগইন করুন</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </>
    )
}