import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (

        <div className='bg-white w-full h-screen flex items-center justify-center p-5'>
            <div className='text-center'>
                <Loader2 className='w-36 h-36 animate-spin text-blue-600' />
                {/* 
          - w-36 h-36: size 9rem x 9rem (36 * 0.25rem)
          - animate-spin: tailwind এর built-in spin animation
          - text-blue-600: আইকনের কালার
        */}
            </div>
        </div>

    )
}
