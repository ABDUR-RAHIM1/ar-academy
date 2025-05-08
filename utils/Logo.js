import React from 'react'
import Link from 'next/link'

export default function Logo() {
    return (
        <>
            <Link href={"/"} className='hidden md:block text-white text-xl md:text-2xl font-bold hover:shadow-2xl transition-all'>
            𝚘𝚗𝚞𝚜𝚑𝚒𝚕𝚘𝚗 𝚊𝚌𝚊𝚍𝚎𝚖𝚢
            </Link>
            <Link href={"/"} className='block md:hidden text-white text-xl md:text-3xl font-bold hover:shadow-2xl transition-all'>
            𝚘𝚗𝚞𝚜𝚑𝚒𝚕𝚘𝚗
            </Link>
        </>
    )
}
