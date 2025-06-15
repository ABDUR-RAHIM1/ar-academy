import { getCategories } from '@/app/apiActions/client/clientApi'
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import React from 'react'
import Heading from '../../globals/Heading';
import { CategoriesCard } from './CategorieCard';
import MoreButton from '../../globals/MoreButton';

export default async function Categories() {
    const { status, data } = await getCategories();

    if (!status || !data) {
        return <Error />
    }


    return (
        <div className='my-10 md:my-20 px-4 md:px-5 bg-white '>
            <Heading text={"ক্যাটাগরি"} />
            <div className='flex justify-center flex-wrap gap-3 md:gap-5'>
                {
                    status === 200 && data && data.length <= 0 ?
                        <NoData />
                        :
                        data.slice(0, 8).map((categorie, index) => (
                            <CategoriesCard key={categorie._id}
                                categoriesData={categorie}
                                index={index}
                            />

                        ))
                }
            </div>

            <div className=' text-right my-5'>
                <MoreButton
                    text={"সমস্ত ক্যাটাগরি দেখুন "}
                    path={"/categories"}
                />
            </div>
        </div>
    )
}

