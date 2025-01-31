import React from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import Logo from '@/utils/Logo'
import SearchButton from '../globals/search/SearchButton'

export default function Header() {
    return (
        <div className=' sticky top-0 px-4 py-5 headerBg flex items-center justify-between flex-wrap'>
            <Logo />
            <div className=' flex items-center gap-3'>
                <SearchButton />
                <Button asChild>
                    <Link href="/">Login</Link>
                </Button>
            </div>
        </div>


    )
}
