import React from 'react'
import LoadingGif from "@/public/Images/loading.gif"
import Image from 'next/image'

export default function Loading() {
    return (
        <div className=' w-full h-screen flex items-center justify-center p-5'>
            <div className=' text-center'>
                <Image
                    src={LoadingGif}
                    width={100}
                    height={100}
                    alt='ar-academy'
                    className=' w-44 h-44'
                />
            
            </div>
        </div>
    )
}
