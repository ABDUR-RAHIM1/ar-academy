import React from 'react';
import Heading from '../../globals/Heading';
import { FeaturesData } from '@/LocalDatabase/FeaturesData';
import Image from 'next/image';
import { followArrowl, followArrowr } from '@/Images/Images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Features() {
    return (
        <section id='features' className='py-16 md:py-24 bg-white overflow-hidden'>
            <div className='max-w-7xl mx-auto px-6 md:px-12'>

                {/* Section Header */}
                <Heading text={"ফিচারস সমূহ"} />
                <div className='max-w-2xl mx-auto text-center mb-16'>
                    <p className='text-slate-600 text-base md:text-lg leading-relaxed font-medium'>
                        শুধু পড়ালেখা নয়, পুরো প্রস্তুতি এখন আরও গুছানো, ইন্টারেক্টিভ এবং কার্যকর।
                        এক্সপার্টদের পরিকল্পনায় সাজানো আমাদের আধুনিক ফিচারসসমূহ তোমার একাডেমিক ও ক্যারিয়ার লক্ষ্যপূরণে হবে নিঃসন্দেহে সেরা সহায়ক।
                    </p>
                </div>

                {/* Features List */}
                <div className='space-y-20 md:space-y-32'>
                    {FeaturesData.map((f, i) => (
                        <div key={i} className="relative">
                            <div className={`flex items-center justify-between gap-10 md:gap-20 flex-wrap ${i % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}>

                                {/* Image Column */}
                                <div className='w-full md:w-[45%] group'>
                                    <div className="relative p-2 bg-indigo-50 rounded-[2rem] transition-transform duration-500 group-hover:scale-105 shadow-xl shadow-indigo-100/50">
                                        <Image
                                            src={f.image}
                                            alt={`ar academy bd ${f.title}`}
                                            width={800}
                                            height={800}
                                            className='w-full h-auto rounded-[1.8rem] object-cover'
                                        />
                                        {/* Floating Badge (Decorative) */}
                                        <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg hidden md:block">
                                            <div className="bg-indigo-600 w-8 h-1 rounded-full mb-2"></div>
                                            <div className="bg-slate-200 w-12 h-1 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Column */}
                                <div className='w-full md:w-[45%]'>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg shadow-lg shadow-indigo-200">
                                            {i + 1}
                                        </span>
                                        <div className="h-px w-12 bg-indigo-200"></div>
                                    </div>

                                    <h3 className="text-2xl md:text-4xl font-black text-slate-800 mb-6 leading-tight">
                                        {f.title}
                                    </h3>

                                    <p className='text-slate-600 text-base md:text-lg leading-loose text-justify md:text-left'>
                                        {f.description}
                                    </p>

                                    <Button asChild className="mt-8 px-6 py-2.5 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300">
                                        <Link href={"/courses"}>
                                            আরও জানুন
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Arrow Indicator - Desktop Only */}
                            {i !== FeaturesData.length - 1 && (
                                <div className='hidden md:block absolute -bottom-24 left-1/2 -translate-x-1/2 w-1/2 opacity-30'>
                                    <Image
                                        src={i % 2 === 0 ? followArrowr : followArrowl}
                                        width={600}
                                        height={300}
                                        alt='connector'
                                        className='w-full h-auto transform scale-x-75'
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}