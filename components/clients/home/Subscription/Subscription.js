import React from 'react'
import SubScribeButton from './SubScribeButton';
import { plans } from '@/LocalDatabase/Subcriptions';

export default function Subscription() {


    return (
        <div className='my-10 px-3 md:px-5 py-10 rounded-md bg2'>
            <div className=' md:bg-white py-10 rounded-md'>
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">সাবস্ক্রিপশন প্ল্যান বেছে নিন</h2>
                    <p className="mb-8 text-lg">আপনার প্রয়োজন অনুযায়ী আমাদের সাবস্ক্রিপশন প্ল্যান বেছে নিন</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {plans.map((plan, index) => (
                        <div key={index} className={`w-full sm:w-[48%] md:w-[22%] bg-white color1 rounded-2xl p-6 shadow-lg text-center border border2 hover:bg-gray-200 hover:border1 transition-all`}>
                            <h3 className="text-2xl font-semibold">{plan.plan}</h3>
                            <p className="text-lg my-4">{plan.description}</p>
                            <p className="text-3xl font-bold">{plan.price}</p>
                            <SubScribeButton
                                planInfoData={plan}
                            /> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
