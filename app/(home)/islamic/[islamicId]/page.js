import React from 'react';
import Link from 'next/link';
import surahList from '@/public/al-quran/allSurah.json';

export const metadata = {
    title: "Islamic",
};
export default async function IslamicDynamicPage({ params }) {
    const { islamicId } = await params;

    const plainText = islamicId ? decodeURIComponent(islamicId) : ""

    return (
        <div className='py-10 px-5'>
            <h2 className='text-2xl font-bold mb-5 text-center'>আল কুরআনের সূরা তালিকা</h2>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {surahList.map((surah) => (
                    <Link href={`/islamic/${plainText}/surah/${surah.id}`} key={surah.id} className='border rounded p-4 cursor-pointer hover:bg-gray-100 shadow-md'>
                        <div>
                            <h3 className='text-xl font-semibold'>
                                <span className='text-green-600'>{surah.id}. </span>
                                {surah.banglaName} ({surah.arabicName})
                            </h3>
                            <p className='text-sm text-gray-600'>আয়াত সংখ্যা: {surah.totalAyah}</p>
                            <p className='text-xs text-gray-500'>
                                অবস্থান: {surah.arLocation === 'مكية' ? 'মক্কী' : 'মাদানী'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
