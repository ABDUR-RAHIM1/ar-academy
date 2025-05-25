import React from 'react'
import Link from 'next/link'

export default function Logo() {
    return (
        <>
            <Link href={"/"} className='hidden md:block text-white text-xl md:text-2xl font-bold hover:shadow-2xl transition-all'>
                অনুশীলন একাডেমী
            </Link>
            <Link href={"/"} className='block md:hidden text-white text-xl md:text-3xl font-bold hover:shadow-2xl transition-all'>
              অ. একাডেমী 
            </Link>
        </>
    )
}
