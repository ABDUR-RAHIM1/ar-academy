import Link from 'next/link'
import React from 'react'

export default function SearchOutput({ searchText, searchData }) {
    return (
        <div className=' bg-white mt-2 border-t w-full max-h-[500px] p-3  overflow-y-auto rounded-md'>
            <h3 className='text-[16px] font-medium my-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-blue-800'>
                সার্চ রেজাল্ট - {searchText}
            </h3>


            <div>
                {
                    searchData && searchData.length <= 0 ?
                        <h5 className=' text-red-500 text-xl font-semibold'>খুঁজে পাওয়া যায়নি!</h5>
                        :
                        searchData.map(item => (
                            <Link key={item._id}
                                href={item.path}
                                className='w-full inline-block my-3 border-b hover:text-blue-800 transition-all'>
                                {item.name}
                            </Link>
                        ))
                }
            </div>

        </div>
    )
}
