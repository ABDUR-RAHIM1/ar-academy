import { pageBanner } from '@/Images/Images'
import Image from 'next/image'
import React from 'react'

export default function PageBanner({ text }) {
    return (
        // <div className='bg2 w-full h-[250px] overflow-hidden flex items-center justify-center'>
        //     <h1 className=' text-white'>
        //         {text || ""}
        //     </h1>
        // </div>
        <div className=' w-full h-[100vh] overflow-hidden'>
            <h1 className=' text-center my-4'>
                {text || ""}
            </h1>
        </div>
    )
}
