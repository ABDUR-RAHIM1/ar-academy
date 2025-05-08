import { getSubCategoieById } from '@/app/apiActions/client/clientApi';
import Heading from '@/components/clients/globals/Heading';
import { coverPhoto } from '@/Images/Images';
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function SubCategories({ params }) {
    const { categorieIdentifier } = await params;
    const plainCategoriIdentifier = categorieIdentifier ? decodeURIComponent(categorieIdentifier) : ""
    const { status, data } = await getSubCategoieById(plainCategoriIdentifier);
 

    if (!status || !data) {
        return <Error />;
    }
    if (status === 200 && data && data.length <= 0) {
        return <NoData />;
    }

    return (
        <div className="py-10 md:py-16 px-4">
            <div className="my-5 text-center">
                <Heading text="📚 বিষয়াবলি" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    data.map((item) => {
                        const randomReaders = Math.floor(Math.random() * 500) + 200;
                        const randomRating = (Math.random() * (5 - 4.5) + 4.5).toFixed(1);
                        const randomChapters = Math.floor(Math.random() * 10) + 5;
                        const randomStudents = Math.floor(Math.random() * 1000) + 500;
                        const updateDates = ["জানুয়ারি ২০২৫", "ফেব্রুয়ারি ২০২৫", "ডিসেম্বর ২০২৪"];
                        const randomUpdate = updateDates[Math.floor(Math.random() * updateDates.length)];

                        const pathLink = item.identifier === "আল-কোরআন" ?
                            { pathname: `/islamic/${item.identifier}` }
                            :
                            {
                                pathname: `/chapters/${item.identifier}`,
                                query: { coverPhoto: item.coverPhoto || coverPhoto.src },
                            }

                        return (
                            <Link
                                key={item._id}
                                href={pathLink}
                                className="group bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border"
                            >
                                {/* উপরে ইমেজ */}
                                <div className="relative w-full h-48 md:h-40 bg-gray-200 flex items-center justify-center">
                                    <Image
                                        src={item.coverPhoto || coverPhoto}
                                        alt="Book Cover"
                                        width={150}
                                        height={200}
                                        className="w-full h-full"
                                    />
                                    {/* অ্যাক্সেস ব্যাজ */}
                                    <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white rounded ${item.type === "paid" ? 'bg-red-500' : 'bg-green-500'}`}>
                                        {item.type === "paid" ? "প্রিমিয়াম সদস্যদের জন্য" : "বিনামূল্যে"}
                                    </span>
                                </div>

                                {/* নিচের কনটেন্ট */}
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 group-hover:color1 transition-all">
                                        {item.sub_name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {item.description || "কোনো বিবরণ নেই"}
                                    </p>

                                    {/* অতিরিক্ত ইনফো */}
                                    <div className="mt-2 text-sm text-gray-500 space-y-2">
                                        <p>📖 {randomReaders}+ জন পড়েছে</p>
                                        <p>⭐ {randomRating}/5 (100+ রিভিউ)</p>
                                        <p>📂 {randomChapters}+ অধ্যায়</p>
                                        <p>🎓 {randomStudents}+ শিক্ষার্থী এনরোল করেছে</p>
                                        <p>📅 সর্বশেষ আপডেট: {randomUpdate}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}
