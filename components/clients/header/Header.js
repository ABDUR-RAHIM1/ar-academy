import React from 'react'
import Link from "next/link"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import Logo from '@/utils/Logo'
import SearchButton from '../globals/search/SearchButton'

export default function Header() {
    return (
        <div className=' sticky top-0 px-4 py-5 bg1 flex items-center justify-between flex-wrap z-40'>
            <Logo />

            <nav className=' flex items-center justify-center gap-3 text-white'>
                <span className=' text-sm font-medium'>সমাধান</span>
                <span className=' text-sm font-medium'>পরীক্ষা দিন</span>
                <span className=' text-sm font-medium'>আমাদের সম্পর্কে</span> 
            </nav>


            <div className=' flex items-center gap-1 md:gap-2'>
                <SearchButton />

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild>
                                <Link href="/account">একাউন্ট </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>প্রিমিয়াম সব ফিচারস পেতে  লগইন করুন</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>


    )
}
