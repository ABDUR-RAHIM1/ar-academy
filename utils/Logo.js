import React from 'react'
import Link from 'next/link'

export default function Logo() {
    return (
        <>
            <Link href={"/"} className='hidden md:block text-white text-xl md:text-2xl font-bold hover:shadow-2xl transition-all'>
                𝒜𝑅-𝒜𝒞𝒜𝒟𝐸𝑀𝒴
            </Link>
            <Link href={"/"} className='block md:hidden text-white text-xl md:text-3xl font-bold hover:shadow-2xl transition-all'>
                𝒜𝑅-𝒜
            </Link>
        </>
    )
}
