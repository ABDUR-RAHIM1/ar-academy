import React from 'react'
import Link from 'next/link'
import { Book, BookOpen, Pen } from 'lucide-react'
import { HiAcademicCap } from 'react-icons/hi'
import Image from 'next/image'
import { logo } from '@/Images/Images'
import { COMMON_ALT_TEXT } from '@/constans'

export default function Logo() {
    return (
        // <>
        //     <Link href={"/"} className='hidden md:block text-white text-xl md:text-2xl font-bold hover:shadow-2xl transition-all'>
        //         অনুশীলন একাডেমী
        //     </Link>
        //     <Link href={"/"} className='block md:hidden text-white text-xl md:text-3xl font-bold hover:shadow-2xl transition-all'>
        //       অ. একাডেমী 
        //     </Link>
        // </>
        <Link href="/" className="inline-block">
            <Image
                src={logo}
                width={100}
                height={100}
                alt={COMMON_ALT_TEXT}
                className="h-[80px] w-auto object-contain"
                priority
            />
        </Link>


    )
}
