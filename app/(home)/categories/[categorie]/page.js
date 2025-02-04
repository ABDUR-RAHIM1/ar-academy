import { getSubCategoieById } from '@/app/apiActions/client/clientApi';
import Heading from '@/components/clients/globals/Heading';
import { bookIcon } from '@/Images/Images';
import { cardStyle } from '@/utils/CardStyle';
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Categories({ params }) {
    const { categorie } = await params;
    const { status, data } = await getSubCategoieById(categorie);

    if (!status || !data) {
        return <Error />
    }
    if (status === 200 && data && data.length <= 0) {
        return <NoData />
    }


    return (
        <div className=' py-10 md:py-16  p-4'>
            <div className=' my-5'>
                <Heading text={"বিষয়াবলি"} />
            </div>
            <div className=" flex flex-wrap gap-4 justify-center">
                {data.map((item) => (
                    <Link href={`/sub-categories/${item.identifier}`}
                        key={item._id}
                        className={`flex w-full md:w-[48%] lg:w-[30%] bg-white shadow-lg rounded-lg border-l-4 ${cardStyle(item.sub_name)} overflow-hidden`}
                    >
                        {/* Left Side Image */}
                        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
                            <Image
                                src={bookIcon}
                                alt="Default"
                                width={500}
                                height={500}
                                className="w-16 h-16 object-cover"
                            />
                        </div>

                        {/* Right Side Content */}
                        <div className="flex flex-col justify-center p-4">
                            <h3 className="text-lg font-semibold">{item.sub_name}</h3>
                            <p className="text-sm text-gray-600">
                                {item.description || "কোন টেক্সট নাই "}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}