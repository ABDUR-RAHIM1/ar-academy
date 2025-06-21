import { gl1, gl2, gl3, gl4 } from '@/Images/Images'
import Image from 'next/image'
import React from 'react'

export default function Gallary() {
    const gallaryImage = [gl1, gl2, gl3, gl4]

    return (
        <div id='gallary' className=' px-3 my-10 flex items-center justify-between flex-wrap'>
            {
                gallaryImage.map((image, index) => (
                    <div  key={index} className='w-[49%] h-auto md:h-[470px] rounded-md my-4 '>
                        <Image
                            src={image}
                            width={1000}
                            height={1000}
                            alt='ar academy bd'
                            className=' w-full h-full  hover:scale-95 transition-all'
                        />
                    </div>
                ))
            }
        </div>
    )
}
