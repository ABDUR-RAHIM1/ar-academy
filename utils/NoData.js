import React from 'react'

export default function NoData({ text }) {
    return (
        <div className=' p-4 '>
            <p className='text-red-500 font-semibold text-xl'>
                {text || "এখানে কোন  তথ্য পাওয়া যায় নি !"}
            </p>
        </div>
    )
}
