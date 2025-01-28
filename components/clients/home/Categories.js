import { getCategories } from '@/app/apiActions/client/clientApi'
import { bookIcon } from '@/Images/Images';
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Heading from '../globals/Heading';
import { cardStyle } from '@/utils/CardStyle';

export default async function Categories() {
    const { status, data } = await getCategories();

    if (!status || !data) {
        return <Error />
    }
 

    return (
        <div className='my-10 md:my-20 px-4 md:px-5'>
            <Heading text={"ক্যাটাগরি"} />
            <div className='flex justify-center flex-wrap gap-3 md:gap-5'>
                {
                    status === 200 && data && data.length <= 0 ?
                        <NoData />
                        :
                        data.map(categorie => (
                            <CategoriesCard key={categorie._id}
                                categoriesData={categorie}
                            />

                        ))
                }
            </div>
        </div>
    )
}


const CategoriesCard = ({ categoriesData }) => {
    const { categorie, identifier , description } = categoriesData;
 
    return (
        <Link
            href={`/categories/${identifier}`}
            className={`w-[48%] md:w-[22%] hover:shadow-xl transition-all flex flex-col items-center justify-between py-3 my-4 rounded-md shadow-xl hover:bg-gray-200 border-l-4 ${cardStyle(categorie)}`}
        >
            <div className='w-full flex justify-center'>
                <Image
                    src={bookIcon}
                    alt='ar-academy'
                    width={50}
                    height={50}
                    className='w-16 h-16'
                />
            </div>
            <div className='w-full text-center'>
                <h4 className={`font-bold my-2 text-blue-600 text-xs md:text-base`}>{categorie}</h4>
                <p className='text-sm'>{description}</p>
            </div>
        </Link>
    )
}