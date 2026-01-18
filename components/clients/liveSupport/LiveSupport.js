
import Image from 'next/image';
import React from 'react'

export default function LiveSupport() {
    return (
        <a href='https://wa.me/01343232179' target='_blank' className='fixed bottom-5 right-5 z-50 bg-green-500 rounded-full p-2 group'>
            <Image
                src={"https://img.icons8.com/?size=100&id=uZWiLUyryScN&format=png&color=000000"}
                alt='onushilon academy live support'
                width={100}
                height={100}
                className='w-[50px] h-[50px] group-hover:rotate-90 group-hover:transition-all'
            />
        </a>
    )
}
