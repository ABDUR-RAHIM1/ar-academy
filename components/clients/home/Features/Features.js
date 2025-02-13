import React from 'react';
import Heading from '../../globals/Heading';
import { FeaturesData } from '@/LocalDatabase/FeaturesData';
import Image from 'next/image';
import { bookIcon, followArrowl, followArrowr } from '@/Images/Images';

export default function Features() {
    return (
        <div className=' w-full md:w-[80%] m-auto my-10 md:my-20 px-5 md:px-10 bg-white'>
            <Heading text={"ফিচারস সমূহ"} />
            <div className='w-full md:w-[60%] m-auto font-[400] text-center'>
                <p>
                    তোমার ভর্তির যাত্রা কে সহজ করতে ও প্রস্তুতিকে আরও একধাপ এগিয়ে নিতে আমাদের পক্ষ থেকে তুমি পেয়ে যাচ্ছো অসাধারণ সব ফিচারস
                </p>
            </div>
            <div className='my-10'>
                {FeaturesData.map((f, i) => (
                    <div key={i} className={`my-10 flex items-center justify-between flex-wrap ${i % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}>
                        <div className=' w-full md:w-[40%] '>
                            <Image
                                src={f.image}
                                alt={`ar academy bd ${f.description}`}
                                width={1000}
                                height={1000}
                                className='w-full h-auto '
                            />
                        </div>
                        <div className='text w-full md:w-[55%]'>
                            <h1 className="my-5 ">{f.title}</h1>
                            <p className='leading-loose textShadow'>
                                {f.description}
                            </p>
                        </div>
                        {/* Render follow arrow only if it's not the last item */}
                        {i !== FeaturesData.length - 1 && (
                            <div className='w-[60%] m-auto'>
                                <Image
                                    src={i % 2 === 0 ? followArrowr : followArrowl}
                                    width={1000}
                                    height={500}
                                    alt='ar academy bd'
                                    className='w-full h-auto'
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
