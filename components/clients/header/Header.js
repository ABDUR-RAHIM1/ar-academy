import React from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import Logo from '@/utils/Logo'

export default function Header() {
    return (
        <div className=' sticky top-0 px-4 py-5 headerBg flex items-center justify-between flex-wrap'>
            <Logo />
            <div>
                <Button asChild>
                    <Link href="/">Login</Link>
                </Button>
            </div>
        </div>


    )
}
