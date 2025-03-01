import { getCategories } from '@/app/apiActions/client/clientApi';
import Heading from '@/components/clients/globals/Heading';
import { CategoriesCard } from '@/components/clients/home/Categories/CategorieCard';
import NoData from '@/utils/NoData';
import React from 'react'

export default async function AllCategories() {
    const { status, data } = await getCategories();

    if (!status || !data) {
        return <Error />
    }

    return (
        <div className='py-10 px-3 md:px-5'>
            <Heading text={"সমস্ত ক্যাটাগরি"} />
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
