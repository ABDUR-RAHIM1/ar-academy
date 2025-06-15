import { getCategories } from '@/app/apiActions/client/clientApi';
import { CategoriesCard } from '@/components/clients/home/Categories/CategorieCard';
import NoData from '@/utils/NoData';
import PageBanner from '@/utils/PageBanner';
import React from 'react'

export default async function AllCategories() {
    const { status, data } = await getCategories();

    if (!status || !data) {
        return <Error />
    }

    return (
        <div>
            <PageBanner text={"সমস্ত ক্যাটাগরি"} />
            <div className='flex justify-center flex-wrap gap-3 md:gap-5 py-10 px-3 md:px-5' >
                {
                    status === 200 && data && data.length <= 0 ?
                        <NoData />
                        :
                        data.map((categorie, index) => (
                            <CategoriesCard key={categorie._id}
                                categoriesData={categorie}
                                index={index}
                            />

                        ))
                }
            </div>

        </div>
    )
}
