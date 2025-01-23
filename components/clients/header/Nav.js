import { getsActions } from '@/actions/admins/getsAction'
import { subjectGetPost } from '@/constans'
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import Link from 'next/link';
import React from 'react'

export default async function Nav() {
    const { status, data } = await getsActions(subjectGetPost);

    if (status !== 200 || !data) {
        return <Error />
    }

    return (
        <nav className='w-full flex items-center justify-start gap-2 flex-wrap primaryBg px-5 md:px-10 border-y shadow-md '>
            {
                data && data.length <= 0 ? <NoData />
                    :

                    data.map(item => (
                        <Link key={item._id} href={item.username} className=' secondaryBg my-1 text-gray-800 inline-block  px-2 py-1 primaryHover capitalize'>
                            {item.subjectName}
                        </Link>
                    ))
            }
        </nav>
    )
}
