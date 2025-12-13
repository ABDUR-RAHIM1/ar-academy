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
                width={250}
                height={85}
                alt={COMMON_ALT_TEXT}
                className=" h-[80px] md:h-[100px] w-auto md:w-[200px] object-contain"
                priority
            />
        </Link>


    )
}
