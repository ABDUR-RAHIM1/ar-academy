import React from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import Logo from '@/utils/Logo'
import SearchButton from '../globals/search/SearchButton'

export default function Header() {
    return (
        <div className=' sticky top-0 px-4 py-5 headerBg flex items-center justify-between flex-wrap z-40'>
            <Logo />
            <div className=' flex items-center gap-1 md:gap-2'>
                <SearchButton />
                <Button asChild>
                    <Link href="/">Login</Link>
                </Button>
            </div>
        </div>


    )
}
