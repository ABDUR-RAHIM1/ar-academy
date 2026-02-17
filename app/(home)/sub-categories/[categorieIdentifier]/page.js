import { getSubCategoieById } from '@/app/apiActions/client/clientApi';
import Heading from '@/components/clients/globals/Heading';
import { BASE_URL, COMMON_ALT_TEXT } from '@/constans';
import { logo } from '@/Images/Images';
import Error from '@/utils/Error';
import NoData from '@/utils/NoData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

/**
 *  subject er header a dynamicaly image dekhale valo hobe
 * @param {*} param0 
 * @returns 
 */


export async function generateMetadata({ params }) {
    const paramsName = await params
    const plainCategoriIdentifier = paramsName.categorieIdentifier ? decodeURIComponent(paramsName.categorieIdentifier) : "";


    return {
        title: `${plainCategoriIdentifier || "বিষয়াবলি"}`,
        description: `${plainCategoriIdentifier} সম্পর্কিত অধ্যায়সমূহ এবং সাব ক্যাটাগরির তালিকা দেখুন।`,
        alternates: {
            canonical: `${BASE_URL}/${plainCategoriIdentifier}`,
        },
        openGraph: {
            title: `${plainCategoriIdentifier} | অনুশীলন একাডেমি`,
            description: `${plainCategoriIdentifier} এর বিস্তারিত সাবজেক্ট লিস্ট।`,
            url: `${BASE_URL}/${plainCategoriIdentifier}`,
            siteName: "অনুশীলন একাডেমি",
            images: [
                {
                    url: `${BASE_URL}/og-image.png`,
                    width: 800,
                    height: 600,
                },
            ],
            locale: "bn_BD",
            type: "website",
        },
    };
}


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
        <div className="py-10 md:py-16 px-4 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <Heading text={`📚 ${plainCategoriIdentifier || "বিষয়াবলি"}`} />
                    <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">আপনার পছন্দের কোর্সটি বেছে নিন এবং শেখা শুরু করুন</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {data.map((item) => {
                        const randomRating = (Math.random() * (5 - 4.5) + 4.5).toFixed(1);
                        const randomChapters = Math.floor(Math.random() * 10) + 5;
                        const randomStudents = Math.floor(Math.random() * 1000) + 500;

                        const pathLink = item.identifier === "আল-কোরআন"
                            ? { pathname: `/islamic/${item.identifier}` }
                            : { pathname: `/chapters/${item.identifier}` };

                        return (
                            <Link
                                key={item._id}
                                href={pathLink}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col hover:-translate-y-2"
                            >
                                {/* Top Section: Banner Style */}
                                <div className="relative w-full h-44 flex items-center justify-center overflow-hidden bg-slate-200">
                                    {/* Background Pattern/Overlay */}
                                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:bg-blue-600"></div>

                                    {/* Logo with Glassmorphism Effect */}
                                    <div className="relative z-10 w-20 h-20 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                        <Image
                                            src={logo}
                                            alt="logo"
                                            width={60}
                                            height={60}
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Access Badge */}
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg z-20 ${item.type === "paid" ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-green-500 to-emerald-600"
                                        }`}>
                                        {item.type === "paid" ? "Premium" : "Free"}
                                    </div>
                                </div>

                                {/* Middle Section: Title & Description */}
                                <div className="p-5 flex-grow">
                                    <h2 className="text-lg font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {item.sub_name}
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 font-medium leading-relaxed">
                                        {item.description || "এই কোর্সের মাধ্যমে আপনি বিস্তারিত জ্ঞান অর্জন করতে পারবেন।"}
                                    </p>

                                    {/* Quick Stats Row */}
                                    <div className="flex items-center gap-4 mt-4 py-3 border-y border-slate-50">
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500 text-sm">⭐</span>
                                            <span className="text-xs font-bold text-slate-700">{randomRating}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-400">
                                            <span className="text-xs font-bold text-slate-700">{randomChapters}</span>
                                            <span className="text-[10px] uppercase tracking-tighter">অধ্যায়</span>
                                        </div>
                                        <div className="ml-auto bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">
                                            {randomStudents}+ ছাত্র
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Section: Footer with Button Look */}
                                <div className="px-5 pb-5">
                                    <div className="w-full py-3 rounded-xl bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300">
                                        শুরু করুন
                                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
