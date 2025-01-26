import React from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <div className=' sticky top-0 px-4 py-5 headerBg flex items-center justify-between flex-wrap'>
            <Link href={"/"} className=' text-xl md:text-2xl italic text-gray-300'>AR-ACADEMY</Link>
            <div>
                <Button asChild>
                    <Link href="/">Login</Link>
                </Button>
            </div>
        </div>


    )
}
