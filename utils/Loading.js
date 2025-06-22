import React from 'react'
import LoadingGif from "@/public/Images/loading.gif"
import Image from 'next/image'
import { COMMON_ALT_TEXT } from '@/constans'

export default function Loading() {
    return (
        <div className=' bg-white w-full h-screen flex items-center justify-center p-5'>
            <div className=' text-center'>
                <Image
                    src={LoadingGif}
                    width={100}
                    height={100}
                    alt={COMMON_ALT_TEXT}
                    className=' w-36 h-36'
                />
            
            </div>
        </div>
    )
}
