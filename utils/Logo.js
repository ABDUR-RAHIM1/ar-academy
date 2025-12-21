import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { logo } from '@/Images/Images'
import { COMMON_ALT_TEXT } from '@/constans'

export default function Logo() {
    return (
        <Link href="/" className="inline-block">
            <Image
                src={logo}
                width={150}
                height={80}
                alt={COMMON_ALT_TEXT}
                className=" w-[100px] h-[80px]"
                priority
            />
        </Link>


    )
}
