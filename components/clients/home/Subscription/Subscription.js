import React from 'react'
import SubScribeButton from './SubScribeButton';
import { plans } from '@/LocalDatabase/Subcriptions';

export default function Subscription() {
  return (
    <div className='my-10 px-3 md:px-5 py-10 rounded-md bg2'>
      <div className='py-10 rounded-md'>
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6 ">সাবস্ক্রিপশন প্ল্যান বেছে নিন</h2>
          <p className="mb-8 text-lg">আপনার প্রয়োজন অনুযায়ী আমাদের সাবস্ক্রিপশন প্ল্যান বেছে নিন</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`w-full sm:w-[48%] md:w-[22%] bg-white color1 rounded-2xl p-6 shadow-lg text-center border border2 hover:bg-[#f0f4f8] hover:shadow-xl transform transition-all ease-in-out duration-300 ${plan.isPopular ? 'border-4 border-yellow-500' : ''}`}
            >
              <div className="flex justify-center mb-4 text-4xl">
                <span>{plan.emoji}</span>
              </div>

              <h3 className="text-2xl font-semibold mb-2">{plan.label}</h3>

              <p className="text-lg my-4 text-gray-600">{plan.description}</p>

              <p className="text-3xl font-bold text-[#0891b2] mb-2">
                {plan.price === 0 ? "ফ্রি" : `${plan.price} টাকা`}
              </p>

              <ul className="text-sm text-gray-700 mb-6 list-disc list-inside space-y-1">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <SubScribeButton planInfoData={plan} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
