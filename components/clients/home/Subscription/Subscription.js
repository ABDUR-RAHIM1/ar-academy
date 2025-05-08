import React from 'react'
import SubScribeButton from './SubScribeButton';
import { plans } from '@/LocalDatabase/Subcriptions';

export default function Subscription() {
  return (
    <div className='my-10 px-3 md:px-5 py-10 rounded-md bg2'>
      <div className=' py-10 rounded-md'>
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
              <div className="flex justify-center mb-4">
                 <h3 className="text-2xl font-semibold">{plan.icon} {plan.plan}</h3>

              </div>
              <p className="text-lg my-4 text-gray-600">{plan.description}</p>
              <p className="text-3xl font-bold text-[#0891b2]">{plan.price}</p>
              <p className="text-sm text-gray-500 mb-4">{plan.features}</p> {/* Display additional features if any */}
              <SubScribeButton planInfoData={plan} />
              {plan.isPopular && (
                <span className="mt-4 inline-block text-sm font-semibold text-yellow-500 py-1 px-3 bg-yellow-100 rounded-full">Best Value</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
