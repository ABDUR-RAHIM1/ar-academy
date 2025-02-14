import { pageBanner } from '@/Images/Images'
import Image from 'next/image'
import React from 'react'

export default function PageBanner({ text }) {
    return (
        <div className='relative flex items-center justify-center'>
            <Image
                src={pageBanner}
                width={1000}
                height={200}
                alt='ar academy bd'
                className=' w-full h-auto '
            />
            <h1 className=' absolute top-auto left-auto text-white'>
                {text || ""}
            </h1>
        </div>
    )
}
