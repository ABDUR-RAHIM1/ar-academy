import { getCategories } from '@/app/apiActions/client/clientApi'
import { bookIcon } from '@/Images/Images';
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react' 
import Heading from '../globals/Heading';

export default async function Categories() {
    const { status, data } = await getCategories();

    if (!status || !data) {
        return <Error />
    }

    // const cardStyle = (categorie) => {
    //     // Default color as blue
    //     let color = "blue-500";

    //     // Dynamic color based on categorie length
    //     if (categorie.length > 10) {
    //         color = "red-500";  // Red for large categories
    //     } else if (categorie.length > 8) {
    //         color = "yellow-500"; // Yellow for mid-size categories
    //     } else if (categorie.length > 6) {
    //         color = "green-500";  // Green for medium categories
    //     } else if (categorie.length > 4) {
    //         color = "blue-500";  // Blue for small categories
    //     } else if (categorie.length > 2) {
    //         color = "purple-500"; // Purple for very small categories
    //     } else {
    //         color = "pink-500";   // Pink for extremely small categories
    //     }

    //     return color;  // Returning only the color
    // };

    return (
        <div className='my-10 md:my-20 px-4 md:px-5'>
            <Heading text={"ক্যাটাগরি"} />
            <div className='flex items-center flex-wrap gap-2 md:gap-5'>
                {
                    status === 200 && data && data.length <= 0 ?
                        <NoData />
                        :
                        data.map(categorie => (

                            <Link
                                href={`/categories/${categorie.identifier}`}
                                key={categorie._id}
                                className={`w-[48%] md:w-[22%] hover:shadow-xl transition-all flex flex-col items-center justify-between py-3 my-4 rounded-md shadow-md border-l-4 border-l-blue-500`}
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
                                    <h4 className={`font-bold my-2 text-blue-600 text-xs md:text-base`}>{categorie.categorie}</h4>
                                    <p className='text-sm'>{categorie?.description}</p>
                                </div>
                            </Link>
                        ))
                }
            </div>
        </div>
    )
}
